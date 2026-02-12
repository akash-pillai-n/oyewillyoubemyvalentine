import { useEffect, useRef } from "react";
import anime from "animejs";
import { ANIM } from "@/lib/valentineConfig";

interface Props {
  onComplete: () => void;
}

const ColorTransitionLayer = ({ onComplete }: Props) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background color transition
    anime({
      targets: layerRef.current,
      backgroundColor: ["hsl(210, 100%, 95%)", "hsl(330, 100%, 94%)"],
      duration: ANIM.colorDisperse,
      easing: "easeInOutQuad",
    });

    // Create burst particles
    const particleContainer = particlesRef.current;
    if (!particleContainer) return;

    const particles: HTMLDivElement[] = [];
    const colors = [
      "hsl(340, 80%, 70%)",
      "hsl(330, 90%, 80%)",
      "hsl(350, 70%, 75%)",
      "hsl(320, 60%, 85%)",
      "hsl(345, 100%, 85%)",
      "hsl(45, 100%, 70%)",
    ];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 20 + 8;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${colors[i % colors.length]};
        left: 50%;
        top: 50%;
        opacity: 0;
      `;
      particleContainer.appendChild(p);
      particles.push(p);
    }

    // Animate particles outward
    anime({
      targets: particles,
      translateX: () => anime.random(-400, 400),
      translateY: () => anime.random(-400, 400),
      scale: [0, () => anime.random(1, 3)],
      opacity: [1, 0],
      duration: ANIM.colorDisperse,
      delay: anime.stagger(ANIM.sparkleStagger, { from: "center" }),
      easing: "easeOutExpo",
    });

    // Sparkles
    const sparkles: HTMLDivElement[] = [];
    for (let i = 0; i < 20; i++) {
      const s = document.createElement("div");
      s.textContent = "✨";
      s.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 16 + 10}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
      `;
      particleContainer.appendChild(s);
      sparkles.push(s);
    }

    anime({
      targets: sparkles,
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      duration: 1500,
      delay: anime.stagger(100),
      easing: "easeInOutSine",
      complete: () => {
        onComplete();
      },
    });

    return () => {
      particles.forEach((p) => p.remove());
      sparkles.forEach((s) => s.remove());
    };
  }, [onComplete]);

  return (
    <div ref={layerRef} className="fixed inset-0 z-40 bg-valentine-blue">
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
    </div>
  );
};

export default ColorTransitionLayer;
