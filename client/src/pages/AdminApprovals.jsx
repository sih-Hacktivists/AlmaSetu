import { useState } from "react";
import { AdminApprovalsTab } from "../assets/Constant";
import Tab from "../components/Tab";
import Table from "../components/Table";

const Approvals = () => {
  const [tab, setTab] = useState("");

  return (
    <div className="w-full">
      <div className="flex justify-center gap-20 max-xl:gap-8">
        {AdminApprovalsTab.map((tab, index) => {
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                setTab(tab);
              }}
              key={index}
            >
              <Tab label={tab} />
            </div>
          );
        })}
      </div>
      {/* Table component */}
      <div className=" ">
        <Table title={tab} />
      </div>
    </div>
  );
};

export default Approvals;
