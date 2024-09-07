import React, { useEffect, useState } from "react";
let events2 = [
    { day: 1, month: "january", title: "Web Dev", desc: "Description" },
    { day: 2, month: "february", title: "App Dev", desc: "Description" },
    { day: 3, month: "march", title: "AR", desc: "Description" },
    { day: 4, month: "march", title: "Machine Learning", desc: "Description" }
];

export const YourEvents = () => {
    const [events, Setevents] = useState(events2);
    const [length, Setlengths] = useState(events2.length);
    const [ind, Setind] = useState(0);
    const [active,Setactive] = useState(0)

    const handleClick = (index) => {
        Setind(index)
        Setactive(index)
    }

    useEffect(() => {
        Setlengths((prev) => events.length);
    }, [events])

    return (
        <div className="  w-full  ">
            <div className="flex items-center justify-center gap-24 mb-5">
                {length >= 1 ? <EventCard event={events[ind % length]} /> : ""}
                {length >= 2 ? <EventCard event={events[(ind + 1) % length]} /> : ""}
                {length >= 3 ? <EventCard event={events[(ind + 2) % length]} /> : ""}
            </div>
            <div className="flex justify-center items-center gap-5">
                {Array.from({ length }).map((_, index) => (
                    <div key={index} className={index == active ? "w-3 h-3 border-2 border-black bg-[#0F1035] rounded-full"
                        : "w-3 h-3 border-2 border-black bg-[#ECF7FE] rounded-full"} onClick={() => handleClick(index)}>
                    </div>
                ))}
            </div>
        </div>
    );
};

function EventCard({ event }) {
    return (
        <div className="relative w-96 h-28 xl:h-40 bg-white rounded-2xl  drop-shadow-xl  shadow-slate-400 shadow-md border-black border-2">
            <div className="absolute text-center text-orange-500    top-0 right-6 rounded-b-2xl  w-[60px] h-[60px] bg-[#111E4B]">
                <div className="font-normal text-xl">
                    {event.month.charAt(0).toUpperCase() +
                        event.month.slice(1, 3).toLowerCase() +
                        " ."}
                </div>
                <div className="text-lg font-medium">{event.day}</div>
            </div>
            <p className="px-2 py-2 text-start text-2xl">{event.title}</p>
            <p className="px-2 text-start">{event.desc}</p>
        </div>
    );
}
