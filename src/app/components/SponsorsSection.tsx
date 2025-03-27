import React from "react";
import Image from "next/image";

export default function SponsorsSection() {
  const sponsors = [
    { name: "MLH", logo: "/images/sponsors/mlh.png" },
    { name: "Standout Stickers", logo: "/images/sponsors/stand.png" },
    { name: "CSE Dept", logo: "/images/sponsors/cse.jpg" },
    { name: "SCAI", logo: "/images/sponsors/scai.png" }
  ];

  return (
    <div className="sponsors-section">
      <style jsx>{`
        .sponsors-section {
          padding: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          margin: 2rem 0;
        }

        .sponsors {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 4rem;
          max-width: 1200px;
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
          }

          .sponsors img {
            height: 60px;
          }
        }
      `}</style>

      <div className="sponsors">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor-image">
            <Image 
              src={sponsor.logo} 
              alt={sponsor.name}
              width={200}
              height={100}
              style={{ height: '100px', width: 'auto' }}
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
