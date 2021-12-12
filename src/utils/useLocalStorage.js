import { useState } from "react";

const getItem = key =>{
    const array = localStorage.getItem(key);
    const parsedArray = array ? JSON.parse(array) : [];
    return parsedArray;
};

const setItem = (key, value) => {
    const parsedArray = getItem(key);
    let found = false;
    parsedArray.forEach(element => {
      if(element.ifsc === value.ifsc)
        found = true;
    });
    const newArray = found ? parsedArray.filter(item => item.ifsc !== value.ifsc) : [...parsedArray, value];
    localStorage.setItem(key, JSON.stringify(newArray));
};

const useLocalStorage = (key, defaultValue = []) => {
    const getFavorites = () => getItem(key) || defaultValue;
    const [favorites, setFavorites] = useState(getFavorites());
    const updateFavorites = (value) => {
      setItem(key, value);
      setFavorites(getItem(key));
    };
    return [favorites, updateFavorites];
};

export default useLocalStorage;