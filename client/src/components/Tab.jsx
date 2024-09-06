import React from "react";

const Tab = ({ label }) => {
  return (
    <div className="rounded-2xl bg-[#BBDCF1] px-4 py-2 h-12 w-64 hover:bg-[#111E4B] hover:text-white cursor-pointer">
      <div className="flex justify-center items-center text-2xl">{label}</div>
    </div>
  );
};

export default Tab;
