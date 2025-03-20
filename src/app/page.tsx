"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/registration"); // Navigate to the registration page
  };
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* MLH Badge */}
      <a 
        id="mlh-trust-badge" 
        style={{
          display: "block",
          maxWidth: "100px",
          minWidth: "60px",
          position: "fixed",
          right: "50px",
          top: 0,
          width: "10%",
          zIndex: 10000
        }} 
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white" 
        target="_blank"
      >
        <img 
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg" 
          alt="Major League Hacking 2025 Hackathon Season" 
          style={{width: "100%"}}
        />
      </a>
      
      {/* Main Content */}
      <div className="video-container flex-grow">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <div className="content-text">
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
      </div>
      
      {/* Footer with MLH Code of Conduct */}
      <footer className="py-4 text-center bg-black bg-opacity-70 text-white">
        <Link 
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          className="text-green-500 hover:text-green-300 underline"
        >
          MLH Code of Conduct
        </Link>
      </footer>
    </div>
  );
}