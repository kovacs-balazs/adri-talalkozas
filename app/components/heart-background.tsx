import { useEffect, useMemo, useState } from "react";

const colors = [
  "#ff4d6d",
  "#ff758f",
  "#ff8fa3",
  "#ffb3c1",
  "#ffccd5",
  "#c9184a",
];

const generateHearts = (random = false) =>
  Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: random ? Math.random() * 100 : (i * 5) % 100,
    fontSize: random ? 12 + Math.random() * 25 : 20,
    animDuration: random ? 5 + Math.random() * 6 : 8,
    animDelay: random ? Math.random() * 5 : i * 0.5,
    color: colors[i % colors.length],
  }));

export default function HeartBackground() {
  const [hearts, setHearts] = useState(() => generateHearts(false));

  useEffect(() => {
    // Kliens oldalon frissítjük random értékekre
    setHearts(generateHearts(true));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-10 pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart absolute z-15 opacity-50"
          style={{
            left: `${heart.left}%`,
            top: `-10%`,
            zIndex: 15,
            fontSize: `${heart.fontSize}px`,
            animationDuration: `${heart.animDuration}s`,
            animationDelay: `${heart.animDelay}s`,
            color: heart.color,
          }}
        >
          <label className="z-15 opacity-40">❤️</label>

        </div>
      ))}
    </div>
  );
}