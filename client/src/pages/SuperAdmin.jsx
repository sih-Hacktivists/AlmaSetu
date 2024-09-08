import React, { useState } from 'react'
import SearchIcon from "../assets/searchIcon.svg";

export default function SuperAdmin() {
  const [input, setInput] = useState("")
  const [input2, setInput2] = useState("")

  function onClick() {
    setInput("");
  }

  return (
    <div className="bg-[#ECF7FE] flex flex-col justify-center items-center">
      <div className='w-[90vw] mt-5 mb-8 flex justify-start gap-4 items-center' >
        {/* top portion */}
        <img src="https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x31571" className='w-16 h-16 rounded-full border-2 border-black' alt="" />
        <div>
          <p>Government of Rajasthan</p>
          <p>Department of Technical Education</p>
        </div>
      </div>

      {/* college list */}
      <div className="w-[90vw] h-full">
        {/* Send Email To College */}
        <div className="flex border-2 border-black rounded-t-xl justify-center items-center h-16 gap-5">
          <p className='text-lg'>Send Email to: </p>
          <input type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter College Email ...'
            className='w-96 bg-white text-black border-black border-2 rounded-2xl text-center outline-none' />
          <button className='hover:bg-[#BBDCF1] hover:text-black hover:border-black bg-[#0F1035] w-36 h-9 rounded-xl text-white'>Send</button>
        </div>

        {/* Search Bar */}
        <div className='flex flex-col items-center justify-center border-t-0 border-2 border-black rounded-b-xl'>
          <div className='p-3'>
            <div className="relative flex items-center w-full ">
              <input
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="block w-96 text-sm text-black text-center font-2xl border-black border-2 outline-none rounded-2xl bg-white h-7"
                placeholder="Search Institutes..."
              />

              <img
                className="absolute right-3 hover:cursor-pointer "
                src={SearchIcon}
                onClick={onClick}
                alt="SearchIcon"
                width={25}
                height={25}
              />
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}
