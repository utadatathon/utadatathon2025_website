"use client";
import Background from "../components/Background";
import Header from "../components/Header";
import Link from 'next/link';

export default function Confirmation() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .confirmation-container {
          min-height: 100vh;
          position: relative;
          z-index: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .confirmation-title {
          font-family: 'Press Start 2P', monospace;
          text-align: center;
          font-size: 3rem;
          background: linear-gradient(180deg, 
            #fff4b8 0%,
            #ffd773 20%, 
            #ff9f38 40%,
            #ff7a1f 60%,
            #ff4f1f 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0px 2px 0px #000)
                 drop-shadow(0px -2px 0px #000)
                 drop-shadow(2px 0px 0px #000)
                 drop-shadow(-2px 0px 0px #000)
                 drop-shadow(4px 4px 0px #661a00);
          transform: perspective(500px) rotateX(10deg);
          letter-spacing: 3px;
          padding: 10px 0;
          margin-bottom: 3rem;
        }

        .retro-button {
          font-family: 'Press Start 2P', monospace;
          background: #000;
          color: #a3e4ff;
          border: 2px solid #00f7ff;
          padding: 1rem 2rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          box-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 1rem 0;
        }

        .retro-button:hover {
          background: #00f7ff;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
        }

        .form-container {
          background: rgba(0, 0, 0, 0.7);
          padding: 2rem;
          border-radius: 10px;
          border: 2px solid #00f7ff;
          box-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
          margin: 2rem 0;
        }

        @media (max-width: 768px) {
          .confirmation-title {
            font-size: 2rem;
            letter-spacing: 2px;
            padding: 5px 0;
            margin-bottom: 2rem;
          }

          .form-container {
            padding: 1rem;
          }

          .retro-button {
            width: 100%;
            max-width: 300px;
            margin: 0.75rem auto;
          }
        }
      `}</style>

      <div className="confirmation-container">
        <Background />
        <Header />
        <div className="content">
          <h1 className="confirmation-title">Registration Confirmation</h1>
          <div className="form-container">
            <iframe 
              data-tally-src="https://tally.so/embed/3lzgvv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height={378} 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0} 
              title="Datathon Confirmation"
            ></iframe>
            <script async src="https://tally.so/widgets/embed.js"></script>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/" className="retro-button">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
} 