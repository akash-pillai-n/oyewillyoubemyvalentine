import { useEffect, useRef } from "react";
import anime from "animejs";

const SparkleBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const sparkles: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
      const s = document.createElement("div");
      s.textContent = "✨";
      s.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 12 + 8}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        pointer-events: none;
      `;
      container.appendChild(s);
      sparkles.push(s);
    }

    anime({
      targets: sparkles,
      opacity: [0, 0.6, 0],
      scale: [0.5, 1.2, 0.5],
      duration: 3000,
      delay: anime.stagger(200),
      loop: true,
      easing: "easeInOutSine",
    });

    return () => sparkles.forEach((s) => s.remove());
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default SparkleBackground;
