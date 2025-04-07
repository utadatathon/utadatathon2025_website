"use client";

export default function Map() {
  return (
    <>
      <style jsx global>{`
        .map-container {
          background: rgba(0, 0, 0, 0.7);
          padding: 2rem;
          border-radius: 10px;
          border: 2px solid #00f7ff;
          box-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
          margin: 2rem 0;
          width: 100%;
          max-width: 800px;
          margin: 2rem auto;
        }

        .map-iframe {
          width: 100%;
          height: 480px;
          border: none;
          border-radius: 5px;
        }

        .map-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .map-button {
          font-family: 'Press Start 2P', monospace;
          background: #000;
          color: #a3e4ff;
          border: 2px solid #00f7ff;
          padding: 0.8rem 1.5rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          box-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .map-button:hover {
          background: #00f7ff;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
        }

        @media (max-width: 768px) {
          .map-container {
            padding: 1rem;
          }

          .map-buttons {
            flex-direction: column;
            align-items: center;
          }

          .map-button {
            width: 100%;
            max-width: 300px;
            margin: 0.5rem 0;
          }
        }
      `}</style>

      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/d/u/2/embed?mid=1gyKnwb1W00EcgCNZZKVabQxklyusl5Q&ehbc=2E312F&noprof=1" 
          className="map-iframe"
          title="UTA Datathon Location"
        ></iframe>
        <div className="map-buttons">
          <a 
            href="https://maps.app.goo.gl/gJ9ZqKw5krJsoXqc8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="map-button"
          >
            Google Maps
          </a>
          <a 
            href="https://maps.apple.com/?address=501%20W%20Mitchell%20St%0AArlington,%20TX%20%2076019%0AUnited%20States&auid=15965471530354566328&ll=32.727529,-97.111612&lsp=9902&q=School%20of%20Social%20Work&t=m" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="map-button"
          >
            Apple Maps
          </a>
          <a 
            href="https://www.uta.edu/maps" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="map-button"
          >
            Campus Map
          </a>
        </div>
      </div>
    </>
  );
} 