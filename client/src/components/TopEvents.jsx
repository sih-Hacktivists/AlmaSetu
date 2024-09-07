import React, { useState } from "react";
let dates2 = [
  { day: 1, month: "january" ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 5, month: "february",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"} ,
  { day: 12, month: "march",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 20, month: "april",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 25, month: "may",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 30, month: "june",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 15, month: "july",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 18, month: "august",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 22, month: "september",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
  { day: 10, month: "october",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2VvZKHRJL5R4gPqtK9kwzxGDMMlXmX6CiA&s"},
];

export const TopEvents = () => {
  const [dates, SetDates] = useState(dates2);
  return (
    <div className="flex  gap-10  w-full  ">
      {dates.map((date, index) => {
        return (
          <div key={index}>
            <EventCard date={date} />
          </div>
        );
      })}
    </div>
  );
};

function EventCard({ date }) {
  return (
    <div className="relative flex justify-center items-center w-52 h-40 xl:h-32 bg-[#ECF7FE] rounded-lg font-bold text-white drop-shadow-xl shadow-[#ECF7FE] border border-black"
    style={{ backgroundImage: `url(${date.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute text-center text-orange-500    top-0 right-4 rounded-b-2xl  w-[46px] h-[55px] bg-[#111E4B]">
        <div className="font-bold text-sm">
          {date.month.charAt(0).toUpperCase() +
            date.month.slice(1, 3).toLowerCase() +
            " ."}
        </div>
        <div className="text-lg  font-bold">{date.day}</div>
      </div>
      Event1
    </div>
  );
}
