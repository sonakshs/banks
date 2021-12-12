import React, { useState, useEffect } from "react";
import {
  useParams
} from "react-router-dom";
import Loader from "./Loader";

export default function Child() {
    let { ifsc } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      setLoading(true);
      if(ifsc){
        console.log(ifsc)
        fetch(`https://vast-shore-74260.herokuapp.com/banks?ifsc=${ifsc}`)
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
        <h3>IFSC: {ifsc}</h3>
        {loading && <Loader />}
        {error && <div>API fails to get results.</div>}
      </div>
    );
  }