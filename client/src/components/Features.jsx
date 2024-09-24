import React from 'react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


 const FeaturesData = [
   {
     id: 1,
     title: "Personal Mentorship",
     link: "#",
     icon: <LiaChalkboardTeacherSolid />,
   },
 ];

const Features = () => {
  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-3xl text-cyan-950 font-bold text-center pb-10">
          Unique Features of Almaसेतु
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
      {FeaturesData.map((feature) => (
        <div key={feature.id} className="text-center flex flex-col items-center">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h1 className="text-lg font-semibold text-center px-3">{feature.title}</h1>
     </div>
))}
        </div>
      
    </section>
  );
};

export default Features
