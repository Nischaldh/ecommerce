import { assets } from "@/assets/assests";
import React from "react";

const Hero = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[50vh]  md:gap-10">
    
        {/* Text */}
        <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Welcome to my{" "}
            <span className="text-orange-500">Ecommerce Website</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto md:mx-0">
            Whether you're a seller looking to sell your products online or
            a customer looking to buy something, we’ve got you covered.
          </p>
        </div>
           <div className="flex justify-center items-center">
          <img
            src={assets.about}
            alt="Hero"
            className="w-[320px] sm:w-[420px] md:w-[550px] lg:w-[650px] xl:w-[750px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;