// import Image from "next/image";
"use client";
import React from "react";

export default function Home() {
  const handleClick = () => {};
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="space-y-5 mt-10 font-press-start text-center">
          <h1 className="animate-glitch text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-200">
            UTA DATATHON 2025
          </h1>
          <p className="animate-pulse text-green-500 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            APR 12 - 13
          </p>
          <button
            onClick={handleClick}
            className="border-2 text-green-500 border-green-500 px-4 py-3 font-bold text-sm sm:text-xl md:text-xl lg:text-2xl hover:text-green-300 hover:border-green-300 hover:border-4 transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            CLICK HERE TO REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}
