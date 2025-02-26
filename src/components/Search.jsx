import { useState, useEffect } from "react";
import * as CiIcons from "react-icons/ci";

const Search = ({ page, handleSearch }) => {
    const [search, setSearch] = useState("");

    // Reset search input when the page changes
    useEffect(() => {
        setSearch("");
    }, [page]);

    // Trigger search when the search button is clicked
    const searchHandler = () => {
        handleSearch(search, page);
    };

    return (
        <div className="flex items-center">
            <input
                type="search"
                placeholder={`Search ${page}`}
                className="bg-gray-200 text-[#011820] w-48 lg:w-[400px] rounded-l-md px-3 py-1 focus:outline-none border-teal-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                onClick={searchHandler}
                className="flex items-center bg-[#0f3350] text-white rounded-r-md px-4 py-2"
            >
                <CiIcons.CiSearch />
            </button>
        </div>
    );
};

export default Search;
