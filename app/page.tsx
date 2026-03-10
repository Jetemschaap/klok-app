"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const tikGeluid = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  tikGeluid.current = new Audio("/kloktik.mp3");
}, []);

useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    setTime(now);

    const delay = 1000 - now.getMilliseconds();

    setTimeout(updateTime, delay);
  };

  updateTime();
}, []);

 
useEffect(() => {
  if (!time) return;

  if (tikGeluid.current) {
    const nieuwGeluid = tikGeluid.current.cloneNode() as HTMLAudioElement;
    nieuwGeluid.play().catch(() => {});
  }
}, [time]);

if (!time) return null;
  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = (time.getHours() % 12) * 30 + minutes / 12;


  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100vh",
          aspectRatio: "1290 / 2796",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {/* wijzerplaat */}
        <img
          src="/wijzerplaat.png"
          alt="Wijzerplaat"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {/* uurwijzer */}
        <img
          src="/uur-wijzer.png"
          alt="Uurwijzer"
          style={{
            position: "absolute",
            left: "50%",
            top: "54.7%",
            width: "7%",
            transform: `translate(-50%, -100%) rotate(${hours}deg)`,
            transformOrigin: "50% 87%",
          }}
        />

        {/* minutenwijzer */}
        <img
          src="/min-wijzer.png"
          alt="Minutenwijzer"
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            width: "8%",
            transform: `translate(-50%, -100%) rotate(${minutes}deg)`,
            transformOrigin: "50% 87%",
          }}
        />

        {/* secondewijzer */}
        <img
          src="/sec-wijzer.png"
          alt="Secondewijzer"
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            width: "7.5%",
            transform: `translate(-50%, -100%) rotate(${seconds}deg)`,
            transformOrigin: "50% 87%",
          }}
        />
      </div>
    </main>
  );
}