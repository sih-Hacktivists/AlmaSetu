import React from "react";

export const Communities = () => {
  const communityList = [
    { id: 1, name: "React Developers", img: "https://flowbite.com/docs/images/people/profile-picture-2.jpg" },
    { id: 2, name: "JavaScript Enthusiasts", img: "https://flowbite.com/docs/images/people/profile-picture-3.jpg" },
    { id: 3, name: "Frontend Masters", img: "https://flowbite.com/docs/images/people/profile-picture-4.jpg" },
    { id: 4, name: "CSS Wizards", img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg" },
    { id: 5, name: "Tech Bloggers", img: "https://flowbite.com/docs/images/people/profile-picture-6.jpg" },
    { id: 6, name: "Open Source Contributors", img: "https://flowbite.com/docs/images/people/profile-picture-7.jpg" },
    { id: 7, name: "Python Coders", img: "https://flowbite.com/docs/images/people/profile-picture-8.jpg" },
    { id: 8, name: "Data Scientists", img: "https://flowbite.com/docs/images/people/profile-picture-9.jpg" },
    { id: 9, name: "DevOps Engineers", img: "https://flowbite.com/docs/images/people/profile-picture-10.jpg" },
    { id: 10, name: "AI/ML Experts", img: "https://flowbite.com/docs/images/people/profile-picture-11.jpg" },
  ];

  return (
    <div className="bg-[#BBDCF1] rounded-2xl ">
      {/* Header */}
      <div className="bg-[#ECF7FE] rounded-t-2xl border-slate-800 border-[1px] text-center text-2xl font-normal ">
        Communities
      </div>

      {/* Community List */}
      <div className="relative overflow-y-auto   border-slate-800 border-b-[1px] border-x-[1px] rounded-b-2xl">
        {communityList.slice(0, 10).map((community) => (
          <div
            key={community.id}
            className="flex items-center justify-between "
          >
            <div className="flex items-center py-[2px] pl-[2px] w-full border-[1px] border-white ">
              <img
                src={community.img}
                alt={community.name}
                className="rounded-full w-6 h-6  mr-3"
              />
              <span className="text-sm font-medium">{community.name}</span>
            </div>
          </div>
        ))}

        {/* Explore Button */}
        <div className="rounded-2xl my-4 mx-2    flex justify-center  bg-[#111E4B] ">
          <button className="text-white rounded-2xl w-full  h-10 font-normal text-sm  hover:bg-[#233a91] hover:font-medium">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};
