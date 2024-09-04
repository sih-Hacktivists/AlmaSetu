import React from "react";
import { Link } from "react-router-dom";
export const Connections = () => {
  const suggestedConnections = [
    {
      id: 1,
      name: "Arjun Verma",
      role: "Alumni",
      img: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    },
    {
      id: 2,
      name: "Sana Khan",
      role: "Student",
      img: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Alumni",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Alumni",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Alumni",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
  ];

  return (
    <div className="bg-[#BBDCF1] rounded-2xl  w-full  ">
      {/* Header */}
      <div className="bg-[#ECF7FE] rounded-t-2xl border-slate-800 border-[1px]  text-center text-2xl font-normal ">
        Suggested Connections
      </div>

      {/* Connections List */}
      <div className="relative  px-2 border-slate-800 border-b-[1px] border-x-[1px] rounded-b-2xl">
        {suggestedConnections.slice(0,4).map((connection) => (
          <div
            key={connection.id}
            className=" flex items-center justify-between p-2"
          >
            <div className="flex items-center px-2 ">
              <img
                src={connection.img}
                alt={connection.name}
                className="rounded-full w-8 h-8 mr-3" // Increase the size and border radius
              />
              <Link to={"/"}>
              <span className="text-sm font-medium cursor-pointer">{connection.name}</span>
              </Link>
            </div>
          </div>
        ))}

        {/* See More Button */}
        <div className="flex justify-center  pb-2 "> {/* Adjusted margin for better spacing */}
          <button className="text-[#00000080] font-normal text-sm rounded-lg hover:underline">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};
