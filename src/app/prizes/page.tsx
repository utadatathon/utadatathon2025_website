import React from 'react'

export default function PrizesSection() {
  return (
    <section className="prizes-section">
      <h2>🏆 Datathon Prizes</h2>
      <div className="prizes-category">
        <h3>Model-Based Challenges</h3>
        <div className="prize-list">
          <div className="prize-card">
            <h4>KSAT Quest</h4>
            <p>Monitor</p>
          </div>
          <div className="prize-card">
            <h4>Deepfake Duel: Truth vs Trickery</h4>
            <p>Google Audio Bluetooth Speaker</p>
          </div>
          <div className="prize-card">
            <h4>Model Mash: LLM Arena</h4>
            <p>Logitech Wireless Keyboard</p>
          </div>
        </div>
      </div>

      <div className="prizes-category">
        <h3>Timed Challenges</h3>
        <div className="prize-list">
          <div className="prize-card">
            <h4>Dungeons and Dragons</h4>
            <p>JBL Tune Buds</p>
          </div>
          <div className="prize-card">
            <h4>Safe Haven</h4>
            <p>Coffee Maker</p>
          </div>
          <div className="prize-card">
            <h4>Data Doomsday</h4>
            <p>JBL Bluetooth</p>
          </div>
          <div className="prize-card">
            <h4>GeoQuest: The Hazard Chronicles</h4>
            <p>Echo Dot</p>
          </div>
          <div className="prize-card">
            <h4>EDA Patrol </h4>
            <p>Amazon Fire TV Stick</p>
          </div>
        </div>
      </div>
    </section>
  )
}


