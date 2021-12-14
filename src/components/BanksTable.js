import React from "react";

const BanksTable = ({ data, updateFavorites, favoriteIFSCs }) => data.length === 0 ? <>No Data Found</> : (
    <table className="shadow-lg bg-white table-auto mx-2">
      <thead>
        <tr>
          <th className="bg-blue-100 border px-8 py-4">Bank</th>
          <th className="bg-blue-100 border px-8 py-4">IFSC</th>
          <th className="bg-blue-100 border px-8 py-4">Branch</th>
          <th className="bg-blue-100 border px-8 py-4">Bank ID</th>
          <th className="bg-blue-100 border px-8 py-4">Address</th>
          <th className="bg-blue-100 border px-8 py-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(bank => 
          <tr key={bank.ifsc}>
            <td className="border px-4">{bank.bank_name}</td>
            <td className="border px-4">{bank.ifsc}</td>
            <td className="border px-4">{bank.branch}</td>
            <td className="border px-4">{bank.bank_id}</td>
            <td className="border px-4 break-all">{bank.address}</td>
            <td className="border px-4 break-all" title="See Bank Details">
              <a className="mr-4" href={`/bank-details/${bank.ifsc}`}>🔗</a>
              <button onClick={() => {updateFavorites(bank)}} title={!favoriteIFSCs.includes(bank.ifsc) ? "Add to Favorites" : "Remove Favorite" }>
                {!favoriteIFSCs.includes(bank.ifsc) ? "☆" : "⭐"}
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
);

export default BanksTable;