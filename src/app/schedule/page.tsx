"use client";
import { useState } from "react";

interface Event {
  time: string;
  activity: string;
  location: string;
  description?: string;
  speaker?: string;
  track: "mini-event" | "workshop" | "food" | "ceremony" | "hacking" | "extras";
}

interface DaySchedule {
  day: string;
  date: string;
  events: Event[];
}

const scheduleData: DaySchedule[] = [
  {
    day: "Day 1",
    date: "Saturday, April 12, 2025",
    events: [
      {
        time: "8:00 AM - 10:00 AM",
        activity: "Registration & Check-in",
        location: "",
        track: "extras",
      },
      {
        time: "10:00 AM - 11:00 AM",
        activity: "Opening Ceremony",
        location: "",
        track: "ceremony",
      },
      {
        time: "11:00 AM",
        activity: "Hacking Begins",
        location: "",
        track: "hacking",
      },
      {
        time: "11:30 AM - 1:00 PM",
        activity: "Lunch",
        location: "",
        track: "food",
      },
      {
        time: "1:00 PM - 2:00 PM",
        activity: "Workshop #1",
        speaker: "Rubab Shahzad",
        description: "Tableau Workshop",
        location: "SWSH",
        track: "workshop",
      },
      {
        time: "2:00 PM - 3:00 PM",
        activity: "Workshop #2 (MLH)",
        speaker: "Emily Yu",
        description: "Making better hacks faster with GitHub Copilot",
        location: "SWSH",
        track: "workshop",
      },
      {
        time: "3:30 PM - 4:30 PM",
        activity: "Workshop #3",
        speaker: "Dr. Behzad Ghanbarian",
        description: "Data Diversity in Machine Learning: Data-Driven Insights",
        location: "SWSH, Room 210",
        track: "workshop",
      },
      {
        time: "4:30 PM - 5:00 PM",
        activity: "Snacks",
        location: "",
        track: "food",
      },
      {
        time: "5:00 PM - 6:00 PM",
        activity: "Workshop #4",
        speaker: "Samarth Jagtap",
        description: "AI vs. Pong: Reinforcement in Action!",
        location: "SWSH, Room 221",
        track: "workshop",
      },
      {
        time: "6:15 PM - 7:15 PM",
        activity: "Hungry Hungry Hippos",
        location: "",
        track: "mini-event",
      },
      {
        time: "7:30 PM - 8:30 PM",
        activity: "Dinner",
        location: "",
        track: "food",
      },
      {
        time: "9:00 PM - 10:00 PM",
        activity: "Scribbl.io",
        location: "",
        track: "mini-event",
      },
      {
        time: "11:00 PM - 11:45 PM",
        activity: "Late Night Coffee",
        location: "",
        track: "mini-event",
      },
    ],
  },
  {
    day: "Day 2",
    date: "Sunday, April 13, 2025",
    events: [
      {
        time: "12:30 AM - 1:30 AM",
        activity: "Late Night Among Us",
        location: "",
        track: "mini-event",
      },
      {
        time: "8:00 AM - 9:00 AM",
        activity: "Breakfast",
        location: "",
        track: "food",
      },
      {
        time: "11:00 AM",
        activity: "Hacking Ends & Judging Begins",
        location: "",
        track: "hacking",
      },
      {
        time: "11:30 AM - 12:15 PM",
        activity: "Lunch",
        location: "",
        track: "food",
      },
      {
        time: "12:30 PM - 2:00 PM",
        activity: "Bingo",
        location: "",
        track: "mini-event",
      },
      {
        time: "3:00 PM - 4:00 PM",
        activity: "Closing Ceremony",
        location: "",
        track: "ceremony",
      },
    ],
  },
];

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Day 1");

  return (
    <div className="schedule-container">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@400;600&display=swap");

        .schedule-container {
          padding: 150px 2rem 120px;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          background: #0a0a1a;
          color: #e2e8f0;
          font-family: "Quicksand", sans-serif;
        }

        .retro-title {
          text-align: center;
          font-family: "Press Start 2P", cursive;
          color: #ffa500;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-shadow: 2px 2px #000;
        }

        .day-selector {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .day-button {
          padding: 0.8rem 1.5rem;
          border: 2px solid #00ff9d;
          background: #000;
          color: #00ff9d;
          cursor: pointer;
          font-family: "Press Start 2P", cursive;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .day-button.active {
          background: #00ff9d;
          color: #000;
        }

        .schedule-day {
          margin-bottom: 3rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .day-header {
          color: #00a8ff;
          font-family: "Press Start 2P", cursive;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .event-card {
          position: relative;
          margin: 1rem 0;
          padding: 1.5rem;
          border-left: 4px solid;
          background: rgba(0, 0, 0, 0.2);
        }

        .event-track {
          position: absolute;
          top: 0;
          right: 0;
          background: #000;
          padding: 0.3rem 0.8rem;
          font-family: "Press Start 2P", cursive;
          font-size: 0.7rem;
          border-radius: 0 4px 0 4px;
        }

        .event-time {
          color: #00a8ff;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .event-activity {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }

        .event-location, .event-speaker {
          display: flex;
          align-items: center;
          color: #aaa;
        }

        .event-location svg, .event-speaker svg {
          margin-right: 0.4rem;
        }

        .event-description {
          color: #88ffcc;
          margin-top: 0.8rem;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Track Colors */
        [data-track="hacking"] {
          border-color: #ff0000;
        }
        [data-track="ceremony"] {
          border-color: #00ff9d;
        }
        [data-track="food"] {
          border-color: #ffd700;
        }
        [data-track="workshop"] {
          border-color: #00a8ff;
        }
        [data-track="mini-event"] {
          border-color: #ff6437;
        }
        [data-track="extras"] {
          border-color: #888;
        }

        @media (max-width: 768px) {
          .schedule-container {
            padding: 80px 1rem 100px;
          }

          .retro-title {
            font-size: 1.5rem;
          }

          .day-button {
            padding: 0.6rem 1rem;
            font-size: 0.7rem;
          }

          .day-header {
            font-size: 1rem;
            line-height: 1.5;
          }

          .event-track {
            border-radius: 0 2px 0 2px;
            padding: 0.3rem 0.5rem;
            font-size: 0.65rem;
          }
        }
      `}</style>

      <h1 className="retro-title">DATATHON 2025 SCHEDULE</h1>

      <div className="day-selector">
        {[...scheduleData.map((day) => day.day)].map((day) => (
          <button
            key={day}
            className={`day-button ${activeDay === day ? "active" : ""}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="schedule-content">
        {scheduleData
          .filter((d) => d.day === activeDay)
          .map((day) => (
            <div key={day.day} className="schedule-day">
              <h2 className="day-header">
                {day.day} - {day.date}
              </h2>
              {day.events.map((event, i) => (
                <div key={i} className="event-card" data-track={event.track}>
                  {event.track !== "hacking" &&
                    event.track !== "extras" &&
                    event.track !== "ceremony" && (
                      <div
                        className="event-track"
                        style={{
                          color: getTrackColor(event.track),
                          border: `2px solid ${getTrackColor(event.track)}`,
                        }}
                      >
                        {event.track.toLowerCase()}
                      </div>
                    )}
                  <div className="event-time">{event.time}</div>
                  <div className="event-activity">
                    {event.activity}
                    {event.track === "hacking" && " ⚡"}
                  </div>
                  
                  <div className="event-meta">
                    {event.location && (
                      <div className="event-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {event.location}
                      </div>
                    )}
                    
                    {event.speaker && (
                      <div className="event-speaker">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {event.speaker}
                      </div>
                    )}
                  </div>
                  
                  {event.description && (
                    <div className="event-description">{event.description}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

function getTrackColor(track: string): string {
  const colors: { [key: string]: string } = {
    hacking: "#ff0000",
    ceremony: "#00ff9d",
    food: "#ffd700",
    workshop: "#00a8ff",
    "mini-event": "#ff6437",
    extras: "#888",
  };
  return colors[track] || "#888";
}