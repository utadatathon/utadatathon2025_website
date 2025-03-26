import { useState, useEffect } from "react";

export default function GhostTrail() {
  const [ghosts, setGhosts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initialize = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setGhosts(
        Array.from({ length: 5 }, (_, i) => ({ id: i, x: centerX, y: centerY }))
      );
      setMousePosition({ x: centerX, y: centerY });
    };
    initialize();
    window.addEventListener("resize", initialize);
    return () => window.removeEventListener("resize", initialize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateGhosts = () => {
      setGhosts((prev) => {
        const updated = prev.map((ghost, index) => {
          if (index === 0) {
            return {
              ...ghost,
              x: ghost.x + (mousePosition.x - ghost.x) * 0.8,
              y: ghost.y + (mousePosition.y - ghost.y) * 0.8,
            };
          }
          return {
            ...ghost,
            x: ghost.x + (prev[index - 1].x - ghost.x) * 0.6,
            y: ghost.y + (prev[index - 1].y - ghost.y) * 0.6,
          };
        });
        return updated;
      });
    };
    updateGhosts();
  }, [mousePosition]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", 
      }}
    >
      {ghosts.map((ghost) => {
        const colors = ["red", "pink", "blue", "orange", "yellow"];
        return (
          <div
            key={ghost.id}
            style={{
              position: "absolute",
              left: ghost.x,
              top: ghost.y,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: colors[ghost.id % colors.length],
            }}
          />
        );
      })}
    </div>
  );
}
