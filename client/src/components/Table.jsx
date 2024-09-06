import React from "react";
import SearchIcon from "../assets/searchIcon.svg";
import SortIcon from "../assets/sortIcon.svg"

const Table = ({ title }) => {
  return (
    <div className="mt-10 px-10 border-2 border-black  ">
      <FilterAndSearch />
      <div className="fixed bottom-0">
      </div>
    </div>
  );
};

function FilterAndSearch() {
  return (
    <div className="flex items-center justify-start">
      <input
        type="text"
        placeholder="Search.."
        className=" w-1/3 text-slate-400 text-sm  xl:py-2 px-2 border-2 border-slate-700/3 shadow-md rounded-2xl focus:outline-none"
      />

      <img
        className="w-8 h-8 max-xl:w-6 max-xl:h-6 p-1 relative right-10 "
        src={SearchIcon}
        alt="searchIcon"
      />

      <div className="font-medium shadow-md border-2 border-slate-700/3  text-sm  px-2 rounded-2xl flex items-center justify-between">
        Sort & Filter
        <img
        className="w-8 h-8 max-xl:w-6 max-xl:h-6 p-1 relative "
        src={SortIcon} alt="" />
      </div>

    </div>
  );
}

export default Table;
