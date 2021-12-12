import React, { useState, useEffect } from "react";
import {
  useParams
} from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";
import Loader from "./Loader";

export default function Child() {
    let { ifsc } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [favorites, updateFavorites] = useLocalStorage("favorites");
    const favoriteIFSCs = favorites && favorites.map(fav => fav.ifsc);
    const isFav = favoriteIFSCs.includes(ifsc);

    useEffect(() => {
      setLoading(true);
      if(ifsc){
        console.log(ifsc)
        fetch(`https://vast-shore-74260.herokuapp.com/bank?ifsc=${ifsc}`)
          .then(results => results.json())
          .then(data => {
            console.log(data);
            setData(data);
          })
          .catch(e => setError(e.toString()))
          .finally(()=>setLoading(false));
      }else{
        setError("Please search for a valid IFSC code.")
      }
    }, [ifsc]);

    return (
      <div className="m-8">
        <div className="text-blue-400 hover:text-blue-600 text-left"><a href="/all-banks">← Back to Search Page</a></div>
        {loading && <Loader />}
        {error && <div>API fails to get results.</div>}
        {data && 
          <>
            <table className="table-fixed border my-8 mx-auto">
              {Object.keys(data).map(key => 
                <tr key={key}>
                  <td className="border px-4">{key}</td>
                  <td className="border break-words px-4">{data[key]}</td>
                </tr>
              )}
            </table>
            <button className="bg-blue-500 hover:bg-blue-600 rounded text-white px-4 py-2 font-bold" onClick={() => {updateFavorites(data)}} title={!isFav ? "Add to Favorites" : "Remove Favorite" }>
              {!isFav ? "☆ Add to Favorites" : "⭐ Remove Favorite"}
            </button>
          </>
        }

      </div>
    );
  }