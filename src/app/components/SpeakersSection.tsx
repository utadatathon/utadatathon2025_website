import React, { useState } from "react";

export default function SpeakersSection() {
  const speakers = [
    {
      name: "Emily Yu",
      title: "Speaker, MLH",
      description: "Making better hacks faster with GitHub Copilot",
      image: "/images/speakers/emily.jpeg",
      time: "2:00 PM - 3:00 PM",
      date: "Saturday, April 12th",
      location: "SWSH Building",
      qrCode: "/images/qr-workshops/mlh.png"
    },
    {
      name: "Dr. Franklin Rivas",
      title: "Associate Professor",
      description: "Advances in AI, Data Science and how it impacts society",
      image: "/images/speakers/franklin.jpeg",
      time: "2:30 PM - 4:00 PM",
      date: "Saturday, April 12th",
      location: "UTA Central Library, Day Family Research Lab, Room 510",
      qrCode: "/images/qr-workshops/franklin.png"
    },
    {
      name: "Dr. Remi Chou",
      title: "Associate Professor",
      description: "Introduction to Stenography",
      image: "/images/speakers/remi.jpeg",
      time: "1:30 PM - 3:00 PM",
      date: "Thursday, April 10th",
      location: "UTA Central Library, Day Family Research Lab, Room 510",
      qrCode: "/images/qr-workshops/remi.png"
    },
    {
      name: "Dr. Alex Dillhoff",
      title: "Senior Lecturer",
      description: "How to Train Your Chat Model",
      image: "/images/speakers/alex.jpeg",
      time: "4:00 PM - 5:30 PM",
      date: "Wednesday, April 9th",
      location: "UTA Central Library, Day Family Research Lab, Room 510",
      qrCode: "/images/qr-workshops/alex.png"
    },
    {
      name: "Dr. Behzad Ghanbarian",
      title: "Associate Professor",
      description: "Data Diversity in Machine Learning: Data-Driven Insights!",
      image: "/images/speakers/behzad.jpeg",
      time: "3:30 PM - 4:30 PM",
      date: "Saturday, April 12th",
      location: "SWSH Building",
      qrCode: "/images/qr-workshops/behzad.png"
    },
    {
      name: "Rubab Shahzad",
      title: "Data Visualization Librarian",
      description: "Tableau Workshop",
      image: "/images/speakers/rubab.jpg",
      time: "1:00 PM - 2:00 PM",
      date: "Saturday, April 12th",
      location: "SWSH Building",
      qrCode: "/images/qr-workshops/rubab.png"
    }
  ];

  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof speakers[0] | null>(null);

  return (
    <div className="speakers-section">
      <div className="speakers-container">
        <div className="speakers">
          {speakers.reverse().map((speaker, index) => (
            <div key={index} className="speaker" onClick={() => setSelectedSpeaker(speaker)}>
              <div className="speaker-image-container">
                <img 
                  src={speaker.image || "/images/speakers/placeholder.png"} 
                  alt={speaker.name} 
                  className="speaker-image"
                />
              </div>
              <h4>{speaker.name}</h4>
              <p>{speaker.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSpeaker && (
        <div className="speaker-modal" onClick={() => setSelectedSpeaker(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedSpeaker(null)}>×</button>
            <div className="modal-grid">
              <div className="speaker-info">
                <img
                  src={selectedSpeaker.image}
                  alt={selectedSpeaker.name}
                />
                <h3>{selectedSpeaker.name}</h3>
                <p>{selectedSpeaker.title}</p>
                <p className="description">{selectedSpeaker.description}</p>
              </div>
              <div className="session-details">
                <div className="qr-code">
                  <img src={selectedSpeaker.qrCode} alt="QR Code" />
                  <p>Scan for details</p>
                </div>
                <div className="detail">
                  <p>{`${selectedSpeaker.date}, ${selectedSpeaker.time}, ${selectedSpeaker.location}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}