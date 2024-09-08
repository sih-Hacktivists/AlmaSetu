import React from "react";
import Bar from "../assets/bar.svg";
import EnvelopeIcon from "../assets/Envelope.jsx"; // Import the React component
import TickIcon from "../assets/Tick.jsx"; // Import the React component

export const MyProfile = ({ user }) => {
  return (
    <div className="relative bg-[#BBDCF1] w-full h-full rounded-2xl py-2 flex flex-col px-5 border-[1px] border-slate-800">
      <img className="w-[36px] h-[36px]" src={Bar} alt="" />
      <div className=" flex flex-col items-center flex-grow">
        <img className="rounded-full w-36 h-36" src={user.profilePic} alt="" />
        <div className="text-2xl py-2 flex items-center">
          {user.name}
          <TickIcon color="white" />
        </div>
        <div className="text-sm">
          {user.role && user.role[0].toUpperCase() + user.role.slice(1)}
        </div>
        <div className="grid items-center p-10 w-full ">
          <SocialAndLink iconColor="black" url={"das"} />
          <SocialAndLink iconColor="black" url={"das2060"} />
          <SocialAndLink iconColor="black" url={"das2060"} />
          {/* <SocialAndLink iconColor="black" url={"das2060"} /> */}
          {/* <SocialAndLink iconColor="black" url={"das2060"} /> */}
        </div>
        <div className="h-full justify-end gap-28 flex flex-col ">
          <div className=" font-light   flex flex-col items-center w-full     ">
            <div className=" text-sm font-semibold text-center">
              Profile Performance
            </div>
            <ul className="list-disc list-inside text-xs     mt-4">
              <li>47 connections</li>
              <li>2 Events attended</li>
            </ul>
          </div>
          <div className="mb-5 px-2 text-2xl rounded-lg bg-[#111E4B] text-white flex items-center justify-evenly w-full h-12">
            <EnvelopeIcon width={25} height={25} color="#ffffff" />
            <span className="ml-2">messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function SocialAndLink({ iconColor, url }) {
  return (
    <div className="flex items-center text-[12px] py-1 gap-2">
      <EnvelopeIcon color={iconColor} width={15} height={15} />
      <div>{url}</div>
    </div>
  );
}
