import React, { useState } from "react";
let  dates2 = [
  { day: 1, month: "january" },
  { day: 5, month: "february" },
    { day: 12, month: "march" },
    { day: 20, month: "april" },
    { day: 25, month: "may" },
    { day: 30, month: "june" },
    { day: 15, month: "july" },
    { day: 18, month: "august" },
    { day: 22, month: "september" },
    { day: 10, month: "october" },
];

export const TopEvents = () => {
  const [dates, SetDates] = useState(dates2);
  return (
    <div className="flex  gap-10  w-full  ">
      {dates.map((date,index) => {
        return (
          <div key={index}>
            <EventCard date={date} />
          </div>
        )
      })}
    </div>
  );
};

function EventCard({ date }) {
  return (
    <div className="relative flex justify-center items-center w-52 h-40 bg-[#ECF7FE] rounded-lg  drop-shadow-xl shadow-[#ECF7FE] border border-black">
      <div className="absolute text-center text-white    top-0 right-4 rounded-b-2xl  w-[46px] h-[55px] bg-[#111E4B]">
        <div className="font-normal text-sm">
          {date.month.charAt(0).toUpperCase() +
            date.month.slice(1, 3).toLowerCase() +
            " ."}
        </div>
        <div className="text-lg font-medium">{date.day}</div>
      </div>
      Event1
    </div>
  );
}
