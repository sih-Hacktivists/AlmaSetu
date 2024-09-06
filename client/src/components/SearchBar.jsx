import React, { useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import NotificationIcon from "../assets/notification.svg";

export function SearchBar({ showProfile }) {
  const [input, setInput] = useState("");

  function onClick() {
    setInput("");
  }
  return (
    <>
      <div className="flex items-center gap-10 mx-auto px-2  max-w-screen-xl">
        <img
          src="https://cdn-icons-png.flaticon.com/128/999/999663.png"
          width={40}
          height={40}
          alt=""
        />
        <div className="relative flex items-center w-full ">
          <input    
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="block w-full p-4 text-sm text-gray-500 border border-gray-300 rounded-2xl bg-[#BBDCF1] focus:outline-none  h-10"
            placeholder="Search Events,Posts..."
          />

          <img
            className="h-full absolute right-3 "
            onClick={onClick}
            src={SearchIcon}
            alt="SearchIcon"
            width={30}
            height={30}
          />
        </div>
        <img
            src={NotificationIcon}
            
            alt=""
            className="h-[30px] w-[30px] max-xl:h-[25px] max-xl:w-[25px] outline outline-1  rounded-lg bg-[#BBDCF1]"
          />
        {showProfile ? (
          <UserProfileDropdown institution={true} email={"ume@gmail.com"} name={"UEM Kolkata  "} nameClass={"w-36"}/>
        ) : (
        ""
        )}
         
      </div>
    </>
  );
}

//have to fix
//make it component wise clean code 
const UserProfileDropdown = ({ name, nameClass, institution, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" relative flex-shrink z-100 border border-b-2 rounded-2xl">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm pe-1  font-medium  rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0"
        type="button"
      >
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
        <div className={nameClass}>{name}</div>
        {institution ? (
          <svg
            className="w-5 h-5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 10 6"
          >
            <path
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        ) : (
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="#6B7280"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">Pro User</div>
            <div className="truncate">{email}</div>
          </div>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
