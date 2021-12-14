import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import BanksTable from "./BanksTable";
import Paginator from "./Paginator";
import useLocalStorage from "../utils/useLocalStorage";

export default function BankList() {

  const cities = ["MUMBAI", "DELHI", "BANGALORE", "CHENNAI", "HYDERABAD"];
  const categories = ["IFSC", "BANK", "BANK ID", "BRANCH"];
  const [selectedCity, selectCity] = useState("MUMBAI");
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, selectCategory] = useState("IFSC");
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [favorites, updateFavorites] = useLocalStorage("favorites");
  const favoriteIFSCs = favorites && favorites.map(fav => fav.ifsc);

  useEffect(() => {
    setLoading(true);
    fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`)
      .then(results => results.json())
      .then(data => {
        setAllData(data);
        setFilteredData(data);
        setPageNo(1);
        setRowsPerPage(10);
      });
  }, [selectedCity]);

  useEffect(() => {
    if(filteredData.length){
      setLoading(true);
      setTotalPages(Math.ceil(filteredData.length/rowsPerPage));
      setData(filteredData.slice((pageNo - 1) * rowsPerPage, (pageNo - 1) * rowsPerPage + rowsPerPage));
    }
  }, [rowsPerPage, pageNo]);

  const getCategoryField = (d, category) =>{
    switch(category){
      case "IFSC": return d.ifsc;
      case "BANK": return d.bank_name;
      case "BANK ID": return d.bank_id.toString();
      case "BRANCH":
      default: return d.branch;
    }
  }
  
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      if(allData.length && query && query.length){
        setPageNo(1);
        setRowsPerPage(10);
        setFilteredData(allData.filter(d => getCategoryField(d, category).includes(query.toUpperCase())))
      }
    }, 3000)
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    setData(filteredData.slice((pageNo - 1) * rowsPerPage, (pageNo - 1) * rowsPerPage + rowsPerPage));
    setTotalPages(Math.ceil(filteredData.length/rowsPerPage));
    setLoading(false);
  }, [filteredData]);

  return (
    <div className="my-8 mx-4">
      <h1 className="text-4xl">Find Your Bank</h1>
        <div className="flex-col my-4">
          <div className="w-auto flex items-center justify-between mx-2">
            <div className="text-blue-400 hover:text-blue-600 text-left"><a href="/favorites">View Favorites</a></div>
            <label>Select City:&nbsp;
              <select className="border" onChange={(e)=>selectCity(e.target.value)}>
                {cities.map(city => <option value={city} key={city}>{city}</option> )}
              </select>
            </label>
            <label>Search Category:&nbsp;
              <select className="border" onChange={(e)=>selectCategory(e.target.value)}>
                {categories.map(cat => <option value={cat} key={cat}>{cat}</option> )}
              </select>
            </label>
            <div title="Press Enter to search">
              <input placeholder="Enter Query" value={" 🔍 "+query} onChange={(e)=>setQuery(e.target.value.substring(4))} className="border"/>
            </div>
          </div>
          <div className="my-4">
            {loading && <Loader />}
            {!loading && data && 
              <>
                <Paginator 
                  setRowsPerPage={setRowsPerPage} 
                  setPageNo={setPageNo} 
                  pageNo={pageNo} 
                  totalPages={totalPages}
                />
                <BanksTable data={data} updateFavorites={updateFavorites} favoriteIFSCs={favoriteIFSCs}/>
              </> 
            }
          </div>
        </div>
    </div>
  );
};