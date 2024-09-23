import { useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

const MentorShip = () => {
  const dateArr = [];
  const [count, setCount] = useState(0);
  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  function dates11() {
    for (let i = 1; i <= 31; i++) {
      dateArr.push(i.toString());
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {dateArr.map((date, index) => {
          return (
            <div
              key={index}
              className="bg-white text-xl hover:bg-slate-400 cursor-pointer text-center"
            >
              {date}
            </div>
          );
        })}
      </div>
    );
  }
  function renderMonth() {
    return <div>{months[count]}</div>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className=" w-3/4 h-4/5 rounded-2xl border border-slate-600">
        {/* calendar component */}
        <div className="w-full h-full border border-slate-600 flex flex-col justify-between">
          {/* <input type="date"  placeholder="Select A Date"/> */}
          <div className="flex w-full justify-between">
            <p>Select a Date</p>
            <p className="text-2xl">2024</p>
          </div>

          {/* Month Header */}
          <div className="flex gap-5 justify-center items-center w-full   text-4xl font-extrabold">
            <div
              onClick={() => {
                console.log(count);

                {
                  count < 1 ? setCount(11) : setCount(count - 1);
                }
              }}
              className="cursor-pointer rounded-full bg-white hover:bg-slate-400 w-10 h-10 flex justify-center items-center"
            >
              {"<"}
            </div>
            {renderMonth()}
            <div
              onClick={() => {
                console.log(count);
                {
                  count > 10 ? setCount(0) : setCount(count + 1);
                }
              }}
              className="cursor-pointer rounded-full bg-white hover:bg-slate-400 w-10 h-10 flex justify-center items-center"
            >
              {">"}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 w-full text-sm">
            {days.map((day, index) => {
              return (
                <div
                  key={index}
                  className="col-span-1 text-center text-base   font-semibold"
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* All Dates */}
          <div className="h-3/4">{dates11()}</div>
        </div>
        {/* calendar component */}
      </div>
    </div>
  );
};

export default MentorShip;
