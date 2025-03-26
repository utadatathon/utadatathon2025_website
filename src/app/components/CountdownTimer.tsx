import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="retro-countdown">
      <style jsx>{`
        .retro-countdown {
          font-family: 'Press Start 2P', monospace;
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          margin: 2rem auto;
          max-width: 800px;
        }

        .countdown-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          text-align: center;
        }

        .time-segment {
          background: rgba(0, 0, 0, 0.7);
          padding: 1rem;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .time-segment::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.2), transparent);
          animation: scan 2s linear infinite;
        }

        .time-value {
          font-size: 2.5rem;
          color: #a3e4ff;
          text-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
          margin-bottom: 0.5rem;
        }

        .time-label {
          font-size: 0.8rem;
          color: #a3e4ff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @media (max-width: 768px) {
          .retro-countdown {
            padding: 1rem;
          }
          
          .time-value {
            font-size: 1.5rem;
          }
          
          .time-label {
            font-size: 0.6rem;
          }
        }
      `}</style>
      <div className="countdown-grid">
        <div className="time-segment">
          <div className="time-value">{padNumber(timeLeft.days)}</div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-segment">
          <div className="time-value">{padNumber(timeLeft.hours)}</div>
          <div className="time-label">Hours</div>
        </div>
        <div className="time-segment">
          <div className="time-value">{padNumber(timeLeft.minutes)}</div>
          <div className="time-label">Minutes</div>
        </div>
        <div className="time-segment">
          <div className="time-value">{padNumber(timeLeft.seconds)}</div>
          <div className="time-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer; 