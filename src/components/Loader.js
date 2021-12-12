import React from "react";

const Loader = () => (
    <div className="mt-20 w-auto flex items-center text-black justify-center" disabled>
        <svg className="animate-spin h-5 w-5 mr-2 rounded-full border border-t-2" viewBox="0 0 48 48">
        </svg>
        Loading...
    </div>
);

export default Loader;