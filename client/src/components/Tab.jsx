import React, { useState } from "react";

const Tab = ({ label }) => {
  const [background,setBackground]=useState(false)
  function onClick(){
setBackground(true)
  }
  return (
    <div
    onClick={onClick}
      className={`rounded-2xl px-4 py-2 h-12 w-64 cursor-pointer ${
        background ? 'bg-[#111E4B] text-white' : 'bg-[#BBDCF1] text-black'
      } hover:bg-[#111E4B] hover:text-white`}
    >
      <div className="flex justify-center items-center text-2xl">{label}</div>
    </div>
  );
};

export default Tab;
