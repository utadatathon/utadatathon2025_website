import React from "react";
import Image from "next/image";

export default function SpeakersSection() {
  const speakers = [
    {
      name: "John Smith",
      title: "CEO, ABC Corporation",
      description: "Expert in AI and Machine Learning",
      image: "/speakers/man.png",
    },
    {
      name: "Jane Doe",
      title: "CTO, DEF Startups",
      description: "Specialist in Cloud Computing",
      image: "/speakers/man.png",
    },
    {
      name: "Bob Johnson",
      title: "Professor, XYZ University",
      description: "Renowned Data Scientist",
      image: "/speakers/man.png",
    },
    {
      name: "Alice Brown",
      title: "Founder, GHI Ventures",
      description: "Innovator in Blockchain Technology",
      image: "/speakers/man.png",
    },
    {
      name: "Mike Davis",
      title: "Director, JKL Research",
      description: "Expert in Cybersecurity",
      image: "/speakers/man.png",
    },
  ];

  return (
    <div className="speakers-section">
      <div className="speakers">
        {speakers.map((speaker, index) => (
            <div key={index} className="speaker">
            <Image src={speaker.image} alt={speaker.name} width={200} height={200} />
            <h4>{speaker.name}</h4>
            <p>{speaker.title}</p>
            <p>{speaker.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
