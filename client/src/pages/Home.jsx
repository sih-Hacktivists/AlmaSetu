import React from "react";
import { SearchBar } from "../components/SearchBar";
import { TopEvents } from "../components/TopEvents";
import { Posts } from "../components/Posts";
import { MyProfile } from "../components/MyProfile";
import { Connections } from "../components/Connections";
import { Communities } from "../components/Communities";

export const Home = () => {
  return (
    <div className="grid grid-cols-10   fixed   bg-[#ECF7FE] ">
      {/* Left Sidebar */}
      <div className="col-span-2 p-5 h-screen px-5 ">
        <MyProfile />
      </div>

      {/* Main Content Area */}

      <div className="col-span-8 grid grid-cols-8 px-5 overflow-y-auto">
        <div className="  h-screen col-span-6 grid grid-rows-[repeat(12,minmax(0,1fr))]  ">
          <div className="row-span-1 p-2 xl:pt-5 ">
            <SearchBar showProfile={false} />
          </div>
          <div className="row-span-3 p-2 scrollbar-custom overflow-x-auto mb-5">
            <TopEvents />
          </div>
          <div className="row-span-7  p-2 ">
            <Posts />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className=" h-full col-span-2 grid grid-rows-[repeat(12,minmax(0,1fr))] px-5">
          <div className="row-span-4 w-full h-full p-2  ">
            <Connections />
          </div>
          <div className="row-span-8 h-full   p-2 ">
            <Communities />
          </div>
        </div>
      </div>
    </div>
  );
};
