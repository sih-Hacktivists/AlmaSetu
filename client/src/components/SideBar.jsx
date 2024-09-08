import { Link } from "react-router-dom";
import cross from "../assets/Cross.svg";
import bars from "../assets/bar.svg";
import { useState } from "react";
import { sideLinks } from "../assets/Constant.js";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      {/* Overlay for sidebar */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      {/* Sidebar */}
      <div>
        {/* Toggle button for collapsed sidebar */}
        {isCollapsed ? (
          <img
            src={bars}
            alt="Expand Sidebar"
            className="w-10 h-10 absolute top-4 left-2 z-50 cursor-pointer rounded-2xl hover:bg-slate-200 transition-transform duration-300 ease-in-out"
            width={30}
            height={30}
            onClick={() => setIsCollapsed(false)}
          />
        ) : (
          // Full sidebar when expanded
          <div
            className={`bg-[#BBDCF1] fixed z-50 border-2 border-black top-0 left-0 h-screen flex-shrink-0 transition-transform duration-300 ease-in-out ${
              isCollapsed ? "-translate-x-full" : "translate-x-0"
            } w-64 overflow-hidden rounded-r-2xl`}
          >
            {/* Collapse button */}
            <img
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsCollapsed(true)}
              src={cross}
              alt="Collapse Sidebar"
              width={30}
              height={30}
            />
            <div className="flex flex-col h-full justify-center items-center">
              <div className="flex flex-col w-11/12 gap-10 items-start px-4">
                {sideLinks.map((nav, index) => (
                  <NavigateButton
                    key={index}
                    isCollapsed={isCollapsed}
                    title={nav.title[0].toUpperCase() + nav.title.slice(1)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavigateButton({ title, isCollapsed }) {
  return (
    <div className="border-2 border-black hover:border-white text-center w-full hover:bg-[#111E4B] bg-[#ECF7FE] rounded-3xl p-2 text-black hover:text-white">
      {!isCollapsed && (
        <Link
          className="flex-1 text-left text-2xl font-medium"
          to={`/admin/${title}`}
        >
          {title}
        </Link>
      )}
    </div>
  );
}

