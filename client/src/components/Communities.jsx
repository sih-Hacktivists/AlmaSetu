import React from "react";

export const Communities = ({ admin }) => {
  const communityList = [
    {
      id: 1,
      name: "React Developers",
      img: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    },
    {
      id: 2,
      name: "JavaScript Enthusiasts",
      img: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    },
    {
      id: 3,
      name: "Frontend Masters",
      img: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    },
    {
      id: 4,
      name: "CSS Wizards",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
  ];

  return (
    <div className={`bg-[#BBDCF1] rounded-2xl ${admin?"h-full":""}`}>
      {/* Header */}
      <div className="bg-[#ECF7FE]  2xl:text-4xl rounded-t-2xl border-slate-800 border-[1px] text-center text-2xl font-bold ">
        Communities
      </div>

      {/* Community List */}
      <div
        className={`bg-[#BBDCF1] relative overflow-y-auto ${admin?"h-full":"h-72"}  flex flex-col justify-between  border-slate-800 border-b-[1px] border-x-[1px] rounded-b-2xl`}
      >
        <div>
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
        </div>

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
