import React from "react";
import { heroImg } from "../assets";
import Dep1 from "../assets/companylogo1.jpg";
import Dep2 from "../assets/comapnylogo2.jpg";

const Hero = () => {
  return (
    <div className="w-full bg-white py-24 px-28">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0">
        <div className="flex flex-col justify-between gap-4">
          <p className="py-2 text-1xl text-[#20B486] font-medium">
            Your FIRST Step Towards SUCCESS !
          </p>
          <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
            The Next Generation
            <span className="text-[#20B486]"> Networking Method</span>{" "}
            <span className="font-bold">With Almaसेतु.</span>
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Unleash the power of networking upgrade your career with Almaसेतु.
          </p>
          <div>
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
          </div>

          <div className="flex items-center gap-5 ">
            <p className="py-2 text-lg text-gray-600 font-semibold">Made for</p>
            <img src={Dep1} width={150} height={10} alt="" srcset="" />
            <img className="h-[70px]" src={Dep2} width={80}  alt="" srcset="" />
          </div>
        </div>

        <div className=" flex flex-col  md:flex-row-reverse">
          <img
            src={heroImg}
            className="md:order-last  order-first"
            width={300}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
