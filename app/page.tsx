"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const tikGeluid = useRef<HTMLAudioElement | null>(null);
const videoRef = useRef<HTMLVideoElement | null>(null);
const koekoekGeluid = useRef<HTMLAudioElement | null>(null);
const laatsteUur = useRef<number | null>(null);

  // Tik-geluid laden
  useEffect(() => {
  tikGeluid.current = new Audio("/kloktik.mp3");
  koekoekGeluid.current = new Audio("/koekoek.mp3");
}, []);

  // Klok laten lopen (perfect op seconde)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);

      const delay = 1000 - now.getMilliseconds();
      setTimeout(updateTime, delay);
    };

    updateTime();
  }, []);

  // Tik-geluid elke seconde
  useEffect(() => {
    if (!time) return;

    if (tikGeluid.current) {
      const nieuw = tikGeluid.current.cloneNode() as HTMLAudioElement;
      nieuw.currentTime = 0;
      nieuw.play().catch(() => {});
    }
  }, [time]);

  useEffect(() => {
  if (!time) return;

  const uur = time.getHours();

  if (
    time.getMinutes() === 0 &&
    time.getSeconds() === 0 &&
    laatsteUur.current !== uur
  ) {
    laatsteUur.current = uur;
    startVideo();
  }
}, [time]);

  if (!time) return null;

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = (time.getHours() % 12) * 30 + minutes / 12;

  // Video starten via knop
  const startVideo = () => {
  setShowVideo(true);

  // 🔊 koekoek geluid starten
  if (koekoekGeluid.current) {
    koekoekGeluid.current.currentTime = 0;
    koekoekGeluid.current.play().catch(() => {});
  }

  setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, 150);
};

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
        position: "relative",
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
        {/* Wijzerplaat */}
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

        {/* Uurwijzer */}
        <img
          src="/uur-wijzer.png"
          alt="Uur"
          style={{
            position: "absolute",
            left: "50%",
            top: "54.7%",
            width: "7%",
            transform: `translate(-50%, -100%) rotate(${hours}deg)`,
            transformOrigin: "50% 87%",
          }}
        />

        {/* Minutenwijzer */}
        <img
          src="/min-wijzer.png"
          alt="Minuut"
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            width: "8%",
            transform: `translate(-50%, -100%) rotate(${minutes}deg)`,
            transformOrigin: "50% 87%",
          }}
        />

        {/* Secondewijzer */}
        <img
          src="/sec-wijzer.png"
          alt="Seconde"
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            width: "7.5%",
            transform: `translate(-50%, -100%) rotate(${seconds}deg)`,
            transformOrigin: "50% 87%",
          }}
        />

        {/* VIDEO */}
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setShowVideo(false)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              zIndex: 100,
              background: "black",
            }}
          >
            <source src="/koekoek.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      
    </main>
  );
}