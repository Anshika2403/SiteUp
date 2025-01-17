import React from "react";
import CardCarousel from "./CardCarousel";

function HeroH() {
  return (
    // <div>
    //   <div className="p-12 w-[55%] rounded-tr-[160px] bg-light ">
    //     <h1 className="font-poppins font-medium text-[50px]">Website <span className="text-prime">Uptime </span>Monitoring Service<span className="text-prime">.</span></h1>
    //     <p className="w-5/6 text-lg mt-5">Get notified when your website goes down and prevent extra strain on your services and support teams.Create beautiful status pages & incident management reports and keep your visitors updated.</p>
    //     <button className="mt-5 w-44 h-12 font-medium text-white bg-prime rounded-lg">Start Monitoring</button>
    //   </div>
    //   <div className="w-1/2 absolute top-44 right-0 h-[420px] rounded-bl-[180px] border-2 "><img src="assets/Hero.png" className="w-full h-full object-cover object-center rounded-bl-[180px]"></img></div>
    // </div>

    <div className="mt-12">
      <h1 className="font-poppins font-medium text-[70px] text-center leading-tight"><span className=" bg-clip-text text-transparent bg-gradient-to-r from-contrast to-prime">Monitor </span>your website's 
      <br/> <span className="bg-gradient-to-r from-black to-gray-200 text-transparent bg-clip-text" >uptime</span></h1>
      <p className="text-lg mt-5 mx-[320px] text-center text-gray-500">Get notified when your website goes down and prevent extra strain on your services and support teams.Create beautiful status pages & incident management reports and keep your visitors updated.</p>
      <CardCarousel />
    </div>
  );
}

export default HeroH;
