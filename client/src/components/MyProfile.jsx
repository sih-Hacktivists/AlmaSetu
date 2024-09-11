import React from "react";
import EnvelopeIcon from "../assets/Envelope.jsx"; // Import the React component
import TickIcon from "../assets/Tick.jsx"; // Import the React component
import GithubIcon from "../assets/Github.jsx";

// Main Profile Component
export const MyProfile = ({ user }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-72 px-5 py-2">
      <div className="relative bg-[#BBDCF1] w-full h-full rounded-2xl flex flex-col border-[1px] border-slate-800">
        <div className="flex flex-col items-center pt-5">
          {/* {user.profilePic} */}
          <div className="w-32 h-32 overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={
                (user && user.profilePic) ||
                "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              }
              alt="Profile Picture"
            />
          </div>
          {/* <img className="rounded-full w-32 h-32 " src={user.profilePic || "https://flowbite.com/docs/images/people/profile-picture-2.jpg"} alt="" /> */}
          <div className="text-2xl py-2 flex items-center">
            {(user && user.name) || "Rahul Das"}
            <TickIcon color="white" />
          </div>
          <div className="text-sm">
            {(user && user.role[0].toUpperCase() + user.role.slice(1)) ||
              "Student"}
          </div>
          <div className="grid items-center p-10 w-full">
            <SocialAndLink
              iconColor="black"
              url={(user && user.email) || "das206053@gmail.com"}
              gitHuburl={
                (user && user.githubUrl) || "https://github.com/RAHULDAS6009"
              }
            />
          </div>
          <div className="h-full justify-end gap-28 flex flex-col">
            <div className="font-light flex flex-col items-center w-full">
              <div className="text-sm font-semibold text-center">
                Profile Performance
              </div>
              <ul className="list-disc list-inside text-xs mt-4">
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
    </div>
  );
};

// Reusable SocialAndLink Component
function SocialAndLink({ iconColor, url, gitHuburl }) {
  return (
    <div className="space-y-2">
      {url && (
        <div className="flex items-center text-[12px] py-1 gap-2">
          <EnvelopeIcon color={iconColor} width={15} height={15} />
          <div>{url}</div>
        </div>
      )}
      {gitHuburl && (
        <div className="flex items-center text-[12px] py-1 gap-2">
          <GithubIcon width={15} height={15} />
          <div>
            {gitHuburl.slice(0, 22)}
            {"..."}
          </div>
        </div>
      )}
    </div>
  );
}
