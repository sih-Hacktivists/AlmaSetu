import React from "react";
import SearchIcon from "../assets/searchIcon.svg";
import SortIcon from "../assets/sortIcon.svg";
import TableRow from "./TableRow";

const Table = ({ title, users, onApprove, onReject, message }) => {
  return (
    <div className="mt-5 px-10 border-2 border-black rounded-2xl h-[480px] xl:h-[700px] overflow-hidden">
      <FilterAndSearch />
      <div className="mt-20 overflow-y-auto max-h-screen scrollbar-custom pr-2">
        {message && <p className="text-blue-500 text-center">{message}</p>}
        {users.map((user, index) => (
          <TableRow
            key={index}
            name={user.name}
            role={user.role}
            profilePic={user.profilePic}
            title={title}
            document={user.document}
            onApprove={() => onApprove(user._id)} // Pass the approve handler
            onReject={() => onReject(user._id)} // Pass the reject handler
          />
        ))}
      </div>
    </div>
  );
};

function FilterAndSearch() {
  return (
    <div className="flex items-center justify-start fixed w-full mt-5">
      <input
        type="text"
        placeholder="Search.."
        className="w-1/3 text-slate-400 text-sm py-2 px-2 border-2 border-slate-700/30 shadow-md rounded-2xl focus:outline-none"
      />
      <img
        className="w-8 h-8 max-xl:w-6 max-xl:h-6 p-1 relative right-10"
        src={SearchIcon}
        alt="searchIcon"
      />
      <div className="font-medium shadow-md border-2 bg-white border-slate-700/30 text-sm py-1 px-2 rounded-2xl flex items-center justify-between">
        Sort & Filter
        <img
          className="w-8 h-8 max-xl:w-6 max-xl:h-6 p-1 relative"
          src={SortIcon}
          alt=""
        />
      </div>
    </div>
  );
}

export default Table;
