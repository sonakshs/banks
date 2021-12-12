import React from "react";

const Paginator = ({ setRowsPerPage, setPageNo, pageNo, totalPages }) => (
    <div className="flex justify-end items-center mt-8 mb-4">
        <label className="mr-8">Rows per page:&nbsp;
        <select className="border" 
            onChange={(e)=> { 
                setRowsPerPage(e.target.value);
                setPageNo(1);
            }
        }>
            {[10, 20, 50, 100].map(v => <option value={v} key={v}>{v}</option> )}
        </select>
        </label>
        <button disabled={pageNo <= 1} onClick={() => setPageNo(pageNo - 1)}>←</button>
        <span>&nbsp;{pageNo} of {totalPages} Pages&nbsp;</span>
        <button className="" disabled={pageNo >= totalPages} onClick={() => setPageNo(pageNo + 1)}>→&nbsp;&nbsp;</button>
    </div>
);

export default Paginator;