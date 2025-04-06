"use client";
import Background from "./components/Background";
import Header from "./components/Header";
import CountdownTimer from "./components/CountdownTimer";
import GhostTrail from "./components/GhostTrail";
import DetailsSection from "./components/DetailsSection";
// import FAQsSection from "./components/FAQsSection";
import MeetTheTeamSection from "./components/MeetTheTeamSection";
import SponsorsSection from "./components/SponsorsSection";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .main-title {
          font-family: 'Press Start 2P', monospace;
          text-align: center;
          font-size: 6rem;
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
                 drop-shadow(6px 6px 0px #661a00);
          transform: perspective(500px) rotateX(10deg);
          letter-spacing: 4px;
          padding: 20px 0;
          margin-top: 2rem;
        }

        .year-title {
          font-family: 'Press Start 2P', monospace;
          text-align: center;
          font-size: 4rem;
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

        h2 {
          text-align: center;
          font-size: 2rem;
          margin: 4rem 0 2rem;
          color: #a3e4ff;
          text-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
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
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 0.5rem;
        }

        .retro-button:hover {
          background: #00f7ff;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
        }

        .buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
            letter-spacing: 2px;
            padding: 10px 0;
            margin-top: 6rem;
          }

          .year-title {
            font-size: 2rem;
            letter-spacing: 2px;
            padding: 5px 0;
            margin-bottom: 4rem;
          }

          .buttons {
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            margin-bottom: 4rem;
          }
          
          .retro-button {
            width: 100%;
            max-width: 300px;
            margin: 0.75rem 0;
          }

          h2 {
            font-size: 1.5rem;
            margin: 3rem 0 1.5rem;
          }
        }

        @media (max-width: 350px) {
          .main-title {
            font-size: 2rem;
          }

          .year-title {
            font-size: 1.5rem;
          }

          .retro-button {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
            margin: 0.5rem 0;
          }
        }
      `}</style>

      <div className="home-container">
        <GhostTrail/>
        <Background />
        <Header />
        <div className="content">
          <div className="text-center">
            <h1 className="main-title">UTA DATATHON</h1>
            <h2 className="year-title">2025</h2>
            <div className="countdown">
              <CountdownTimer targetDate="2025-04-12T00:00:00Z" />
            </div>
            <div className="buttons">
              <Link href="/registration" className="retro-button">Apply Now</Link>
              <a href="https://discord.gg/YrV6CTMR2k" target="_blank" rel="noopener noreferrer" className="retro-button">Discord</a>
              <a href="https://devpost.com/your-devpost" target="_blank" rel="noopener noreferrer" className="retro-button">Dev Post</a>
            </div>
          </div>
        </div>

        <h2>Details</h2>
        <DetailsSection />
     
        {/* <h2>Frequently Asked Questions</h2>
        <FAQsSection /> */}
        <h2>Meet the Team</h2>
        <MeetTheTeamSection />
        <h2>Sponsors</h2>
        <SponsorsSection />
      </div>
    </>
  );
}
