import React from "react";
import Link from "next/link";

// Define an interface for sponsor objects
interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

export default function SponsorsSection(): JSX.Element {
  const sponsors: Sponsor[] = [
    { 
      name: "MLH", 
      logo: "/images/sponsors/mlh.png",
      url: "https://mlh.io"
    },
    { 
      name: "Standout Stickers", 
      logo: "/images/sponsors/stand.png",
      url: "https://standoutstickers.com"
    },
    { 
      name: "CSE Dept", 
      logo: "/images/sponsors/cse.png",
      url: "https://www.uta.edu/academics/schools-colleges/engineering/academics/departments/cse"
    },
    { 
      name: "SCAI", 
      logo: "/images/sponsors/scai.png",
      url: "https://www.instagram.com/scai_uta/"
    }
  ];

  return (
    <div className="sponsors-section">
      <style jsx>{`
        .sponsors-section {
          max-width: 1100px;
          padding: 2rem;
          background: linear-gradient(135deg, #1a1a1a 0%, rgba(255, 255, 255, 0.35) 50%, #333333 100%);
          border-radius: 8px;
          // margin: 2rem 0;
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

        .sponsors a:hover img {
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
          <Link 
            key={index} 
            href={sponsor.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="sponsor-image">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  console.error(`Error loading image: ${sponsor.logo}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}