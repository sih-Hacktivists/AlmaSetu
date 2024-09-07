import React from 'react';
import { SearchBar } from '../components/SearchBar';
import Bar from "../assets/bar.svg";


export default function Events() {
    return (
        <div className='w-full h-full bg-[#ECF7FE]'>
            {/* Top Portion */}
            <div className='flex w-full h-20 items-center mb-2'>
                <img className="w-20 h-10 basis-1/12" src={Bar} />
                <div className="flex items-center justify-center basis-11/12">
                    <div className="w-3/5"><SearchBar showProfile={false} /></div>
                </div>
            </div>

            {/* Your Events */}
            <div className="">
                <button className='bg-[#0F1035] text-white w-48 h-10 text-2xl'>Create Event <span className='text-3xl'>+</span></button>
                <div className=""></div>               
            </div>

            {/* Events Hosted by Alumnus */}
            <div className="">
            </div>

        </div>
    )
}
