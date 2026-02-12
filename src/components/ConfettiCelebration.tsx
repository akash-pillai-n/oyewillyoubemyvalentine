import { useEffect, useRef } from "react";
import anime from "animejs";
import { TEXTS, ANIM, CELEBRATION_AUDIO_SRC } from "@/lib/valentineConfig";

const EMOJIS = ["💖", "❤️", "😊", "🥰", "✨", "💕", "🌹", "⭐", "💗", "😍"];

const ConfettiCelebration = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play audio (user-interaction gated)
    audioRef.current?.play().catch(() => {
      // Browser blocked autoplay - that's okay
    });

    // Confetti particles
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < ANIM.confettiParticleCount; i++) {
      const p = document.createElement("div");
      p.textContent = EMOJIS[i % EMOJIS.length];
      p.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        font-size: ${Math.random() * 20 + 14}px;
        opacity: 0;
        pointer-events: none;
        z-index: 60;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-500, 500),
      translateY: () => anime.random(-600, 400),
      rotate: () => anime.random(-360, 360),
      scale: [0, () => anime.random(1, 2)],
      opacity: [1, 0],
      duration: () => anime.random(2000, ANIM.confettiDuration),
      delay: anime.stagger(50, { from: "center" }),
      easing: "easeOutExpo",
    });

    // Second wave
    setTimeout(() => {
      const wave2: HTMLDivElement[] = [];
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.textContent = EMOJIS[i % EMOJIS.length];
        p.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: -20px;
          font-size: ${Math.random() * 18 + 12}px;
          opacity: 0;
          pointer-events: none;
          z-index: 60;
        `;
        container.appendChild(p);
        wave2.push(p);
      }

      anime({
        targets: wave2,
        translateY: () => window.innerHeight + 50,
        rotate: () => anime.random(-180, 180),
        opacity: [1, 0.8, 0],
        duration: () => anime.random(2000, 3500),
        delay: anime.stagger(80),
        easing: "easeInQuad",
      });
    }, 1500);

    // Message animation
    anime({
      targets: messageRef.current,
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 800,
      delay: 300,
      easing: "easeOutElastic(1, .6)",
    });

    // Background pulse
    anime({
      targets: container,
      backgroundColor: [
        "hsl(330, 100%, 94%)",
        "hsl(340, 90%, 90%)",
        "hsl(330, 100%, 94%)",
      ],
      duration: 2000,
      loop: true,
      easing: "easeInOutSine",
    });

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center z-50 bg-valentine-pink">
      {/* Replace this audio src with your own mp3 */}
      <audio ref={audioRef} src={CELEBRATION_AUDIO_SRC} preload="auto" />

      <div ref={messageRef} className="text-center z-[70] px-6">
        <h1 className="font-script text-5xl md:text-7xl text-valentine-heart mb-4 drop-shadow-lg">
          {TEXTS.celebrationTitle}
        </h1>
        <p className="font-body text-xl md:text-2xl text-foreground">
          {TEXTS.celebrationSubtitle}
        </p>
      </div>
    </div>
  );
};

export default ConfettiCelebration;
