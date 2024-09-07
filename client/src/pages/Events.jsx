import React from 'react';
import { SearchBar } from '../components/SearchBar';
import Bar from "../assets/bar.svg";
import { YourEvents } from '../components/YourEvents';
import { TopEvents } from '../components/TopEvents';

export default function Events() {
    return (
        <div className='w-full h-screen bg-[#ECF7FE] flex flex-col items-center'>
            {/* Top Portion */}
            <div className='flex w-full h-20 items-center m-3'>
                <img className="w-20 h-10 basis-1/12" src={Bar} />
                <div className="flex items-center justify-center basis-11/12">
                    <div className="w-3/5"><SearchBar showProfile={false} /></div>
                </div>
            </div>

            {/* Your Events */}
            <div className="flex w-[90vw] flex-col items-start justify-center mb-5">
                <button className='bg-[#0F1035] mb-6 text-white w-48 h-12 hover:bg-[#497fa1] hover:text-black text-2xl rounded-md flex items-center justify-center gap-2'>Create Event <b className='text-2xl'>+</b></button>
                <div className="">
                    <YourEvents />
                </div>
            </div>

            {/* Events Hosted by Alumnus */}
            <div className="flex flex-col gap-12 justify-start border-2 border-black rounded-xl bg-[#ECF7FE] w-[90vw] h-full mb-5">
                <div className="bg-[#0F1035] rounded-t-md text-white flex items-center justify-center text-xl h-14">
                    Recommended Events For You
                </div>
                <div className="row-span-3 p-2 scrollbar-custom overflow-x-auto m-5">
                    <TopEvents />
                </div>
            </div>

        </div>
    )
}
