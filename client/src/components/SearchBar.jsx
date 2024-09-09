import React, { useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import NotificationIcon from "../assets/notification.svg";

export function SearchBar({ showProfile, superAdmin, showSearch, dropDown }) {
  const [input, setInput] = useState("");

  function onClick() {
    setInput("");
  }

  return (
    <div className="flex items-center gap-10 mx-auto px-2 max-w-screen-xl 2xl:max-w-screen-2xl pt-1">
      {!superAdmin && (
        <img
          src="https://cdn-icons-png.flaticon.com/128/999/999663.png"
          width={45}
          height={45}
          className="pt-2 ml-10 2xl:ml-20"
          alt="Admin Icon"
        />
      )}
      <div
        className={
          !superAdmin
            ? "relative flex items-center w-full"
            : "relative h-7 flex items-center w-[520px]"
        }
      >
        {showSearch && (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={
                !superAdmin
                  ? "block w-full p-4 text-sm text-gray-500 border-black border-2 outline-none rounded-2xl bg-white h-10"
                  : "text-center w-full p-1 text-sm text-black border-black border-2 outline-none rounded-2xl bg-white h-7"
              }
              placeholder={
                !superAdmin ? "Search Events, Posts..." : "Search Institutes..."
              }
            />
            <img
              className={
                !superAdmin ? "h-full absolute right-3" : "h-6 absolute right-3"
              }
              onClick={onClick}
              src={SearchIcon}
              alt="Search Icon"
              width={20}
              height={20}
            />
          </>
        )}
      </div>
      {!superAdmin && (
        <img
          src={NotificationIcon}
          alt="Notification Icon"
          className="h-[30px] w-[30px] max-xl:h-[25px] max-xl:w-[25px] outline outline-1 rounded-lg bg-white"
        />
      )}
      {showProfile && (
        <UserProfileDropdown
          institution={true}
          dropDown={dropDown}
          email={"ume@gmail.com"}
          name={"Govt. Polytechnic College"}
          nameClass={"w-36"}
        />
      )}
    </div>
  );
}

const UserProfileDropdown = ({
  name,
  nameClass,
  institution,
  email,
  dropDown,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex-shrink z-100 border border-b-2 rounded-2xl">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm pe-1 font-medium rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0"
        type="button"
      >
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="User Avatar"
        />
        <div className={nameClass}>
          {name
            .split(" ")
            .filter((word) => !["of", "and", "&"].includes(word.toLowerCase()))
            .map((word) => word[0])
            .join("")}
        </div>
      </button>
      {dropDown && isOpen && (
        <div
          id="dropdownAvatarName"
          className="absolute z-10 bg-[#ECF7FE] divide-y divide-gray-100 rounded-lg shadow w-44"
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
