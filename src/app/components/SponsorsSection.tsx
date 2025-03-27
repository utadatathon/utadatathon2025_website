import React from "react";
import Image from "next/image";

export default function SponsorsSection() {
  const sponsors = [
    { name: "MLH", logo: "/images/sponsors/mlh.png" },
    { name: "Standout Stickers", logo: "/images/sponsors/stand.png" },
    { name: "CSE Dept", logo: "/images/sponsors/cse.png" },
    { name: "SCAI", logo: "/images/sponsors/scai.png" }
  ];

  return (
    <div className="sponsors-section">
      <style jsx>{`
        .sponsors-section {
          max-width: 1100px;
          padding: 2rem;
          background: linear-gradient(135deg, #1a1a1a 0%, rgba(255, 255, 255, 0.35) 50%, #333333 100%);
          border-radius: 8px;
        }

        .sponsors {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 4rem;
          margin: 0 auto;
        }

        .sponsors img {
          height: 100px;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .sponsors img:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .sponsors {
            gap: 3rem;
          }

          .sponsors img {
            height: 80px;
          }
        }

        @media (max-width: 480px) {
          .sponsors {
            gap: 2rem;
            display: flex;
            flex-direction: column;
          }

          .sponsors img {
            height: 60px;
          }
        }
      `}</style>

      <div className="sponsors">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor-image">
            <img 
              src={sponsor.logo} 
              alt={sponsor.name}
              onError={(e) => {
                console.error(`Error loading image: ${sponsor.logo}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
