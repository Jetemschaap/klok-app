"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          width: "100%",
          height: "100vh",
          aspectRatio: "1290 / 2796",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
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

        <img
          src="/uur-wijzer.png"
          alt="Uurwijzer"
          style={{
            position: "absolute",
            left: "645px",
            top: "1470px",
            width: "85px",
            transform: `translate(-50%, -100%) rotate(${hours}deg)`,
            transformOrigin: "50% 89%",
          }}
        />

        <img
          src="/min-wijzer.png"
          alt="Minutenwijzer"
          style={{
            position: "absolute",
            left: "675px",
            top: "1445px",
            width: "79px",
            transform: `translate(-50%, -100%) rotate(${minutes}deg)`,
            transformOrigin: "50% 95%",
          }}
        />

        <img
          src="/sec-wijzer.png"
          alt="Secondewijzer"
          style={{
            position: "absolute",
            left: "645px",
            top: "1430px",
            width: "50px",
            transform: `translate(-50%, -100%) rotate(${seconds}deg)`,
            transformOrigin: "50% 95%",
          }}
        />
      </div>
    </main>
  );
}