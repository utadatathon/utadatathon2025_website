// import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Datathon</h1>
        
      </div>
    </div>
  );
}

