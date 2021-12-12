import React from "react";
import useLocalStorage from "../utils/useLocalStorage";
import BanksTable from "./BanksTable";

const Favorites = () => {
    const [favorites, updateFavorites] = useLocalStorage("favorites");
    const favoriteIFSCs = favorites && favorites.map(fav => fav.ifsc);

    return favorites && favorites.length ? 
        <div className="m-8">
            <h2 className="my-4 text-4xl">Your Favorite Banks:</h2>
            <div className="my-4 mx-2 text-blue-400 hover:text-blue-600 text-left"><a href="/all-banks">← Back to Search Page</a></div>
            <BanksTable data={favorites} updateFavorites={updateFavorites} favoriteIFSCs={favoriteIFSCs}/>
        </div>
        :
        <div className="m-16">No Favorites Found.</div>;
}

export default Favorites;
