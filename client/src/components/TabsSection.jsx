import { useState } from "react";
import { connectionsNavPage } from "../assets/Constant";

const TabsSection = () => {
  const [tab, setTab] = useState("Connections");

  function renderTable() {
    switch (tab) {
      case "Connections":
        <div>connections</div>;
        break;
      case "Pending":
        <div>Pending</div>;
        break;

      default:
        <div>Pending Request</div>;
    }
  }
  return (
    <div className="flex flex-col gap-5 h-full justify-between">
      <div key={tab} className="flex h-[10%] max-w-screen-sm gap-5 items-center ">
        {connectionsNavPage.map((nav, index) => {
          return (
            <>
              <div
                key={index}
                className="cursor-pointer px-4 py-2 text-xl rounded-full bg-[#FFFFFF] border border-slate-600 hover:bg-[#111E4B] hover:text-white  "
              >
                {nav.number > 0 && nav.number} {nav.title}
              </div>
            </>
          );
        })}
      </div>
      <div className="border h-[90%] border-slate-700 rounded-lg ">
        {renderTable()}
      </div>
    </div>
  );
};

export default TabsSection;
