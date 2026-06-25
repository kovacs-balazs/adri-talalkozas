"use client";

import { useState, useRef, useEffect } from "react";
import HeartBackground from "./components/heart-background";
import Fireworks from "./components/firework";

const days = [
  { date: "06.25. csütörtök", times: ["Este"] },
  { date: "06.26. péntek", times: ["Délelőtt", "Kora délután"] },
  { date: "06.28. vasárnap", times: ["Délelőtt", "Délután", "Este"] },
  { date: "06.29. hétfő", times: ["Délelőtt", "Délután", "Este"] },
  { date: "06.30. kedd", times: ["Délelőtt", "Délután", "Este"] },
  { date: "07.01. szerda", times: ["Délelőtt", "Délután", "Este"] },
]

export default function Page() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string | null>(days[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(days[0].times[0]);

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
    setSelectedTime(null);
  };

  useEffect(() => {
    if (selectedDay) {
      const day = days.find((d) => d.date === selectedDay);
      if (day && day.times.length > 0) {
        setSelectedTime(day.times[0]);
      }
    } else {
      setSelectedTime(null);
    }
  }, [selectedDay]);

  const moveNoButton = () => {
    const btnWidth = 120;
    const btnHeight = 50;

    if (!hasMoved) {
      if (noButtonRef.current) {
        const rect = noButtonRef.current.getBoundingClientRect();
        setNoPos({ x: rect.left, y: rect.top });
      }
      setHasMoved(true);

      requestAnimationFrame(() => {
        const x = Math.random() * (window.innerWidth - btnWidth);
        const y = Math.random() * (window.innerHeight - btnHeight);
        setNoPos({ x, y });
      });
    } else {
      const x = Math.random() * (window.innerWidth - btnWidth);
      const y = Math.random() * (window.innerHeight - btnHeight);
      setNoPos({ x, y });
    }
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  const handleSubmit = async () => {
    if (!selectedDay) return;

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: selectedDay,
        time: selectedTime,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <HeartBackground />
      <main
        className="w-full bg-pink-400 p-8 flex"
        style={{
          height: '100dvh'
        }}
      >
        <div
          className="w-full max-w-2xl h-fit bg-rose-600/50 rounded-2xl p-6 flex flex-col justify-between gap-12 relative"
        >
          {!yesClicked ? (
            <>
              <h1 className="text-xl text-white text-center">
                Szeretném élőben megbeszélni ezt a helyzetet, mert úgy sokkal egyszerűbb lenne tisztázni mindent. Fontos lenne számomra, hogy én is tudjam, hogy hogyan tovább.
              </h1>
              <h1 className="text-2xl text-white text-center font-bold">
                Ezúton szeretnélek elhívni egy találkozásra. Remélem egyetértesz velem és elfogadod a meghívásom. 🙏🙏
              </h1>
              <div className="flex gap-6 z-10 items-center justify-center">
                <button
                  onClick={handleYesClick}
                  className="px-4 py-3 bg-pink-400 text-white font-bold rounded-full text-xl"
                  style={{
                    animation: 'float 2s ease-in-out infinite',
                  }}
                >
                  IGEN 😍
                </button>
                <button
                  onClick={moveNoButton}
                  ref={noButtonRef}
                  className={`px-4 py-3 bg-neutral-600 text-white font-bold rounded-full text-xl select-none ${hasMoved ? "opacity-0" : ""}`}
                >
                  Nem 😭
                </button>
              </div>
            </>
          ) : submitted ? (
            <div className="flex flex-col items-center justify-center gap-6 text-white py-12">
              <h1 className="text-3xl text-center font-bold">
                Köszönöm! 🎉
              </h1>
              <p className="text-xl text-center">
                Találkozunk: <span className="font-bold">{selectedDay}</span>
              </p>
              <p className="text-xl text-center">
                Időpont: <span className="font-bold">{selectedTime}</span>
              </p>
              <p className="text-2xl text-center mt-4 font-bold">
                Alig várom! 😊
              </p>
              <Fireworks />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-10 text-white">
              <h1 className="text-2xl text-center font-bold">
                Szuper, helyes válasz!<br /> Válassz egy neked megfelelő időpontot!
              </h1>
              <div className="flex flex-wrap gap-3 justify-center w-48">
                {days.map((day) => {
                  const isSelected = selectedDay === day.date;
                  return (
                    <button key={day.date}
                      onClick={() => handleDayClick(day.date)}
                      className={`
                      px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200 w-48
                      ${isSelected
                          ? "bg-white text-pink-400 scale-105 shadow-lg"
                          : "bg-pink-400 text-white"
                        }
                    `}
                    >
                      {day.date}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3 justify-center w-48">
                {days.find((day) => day.date === selectedDay)?.times.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button key={time}
                      className={`
                      px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200 w-48
                      ${isSelected
                          ? "bg-white text-pink-400 scale-105 shadow-lg"
                          : "bg-pink-400 text-white"
                        }
                    `}
                      onClick={() => setSelectedTime(time)}>
                      {time}
                    </button>
                  )
                })}
              </div>
              <button onClick={handleSubmit} className="mt-6 bg-pink-400 px-4 py-3 rounded-full font-bold text-xl">Küldés 😊</button>
            </div>
          )}
        </div>

        {hasMoved && !yesClicked && (
          <button
            onClick={moveNoButton}
            ref={noButtonRef}
            className="fixed px-4 py-3 bg-neutral-600 text-white font-bold rounded-full transition-all duration-300 z-50 text-xl select-none"
            style={{
              left: noPos.x,
              top: noPos.y,
            }}
          >
            Nem 😭
          </button>
        )}
      </main>
    </>
  );
}