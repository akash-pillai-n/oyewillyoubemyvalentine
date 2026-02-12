import { useRef, useCallback } from "react";
import anime from "animejs";
import { ANIM } from "@/lib/valentineConfig";

interface Props {
  label: string;
  onCaught: () => void;
}

const RunawayButton = ({ label, onCaught }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isMorphed = useRef(false);

  const dodge = useCallback(() => {
    if (isMorphed.current || !btnRef.current) return;

    const margin = 80;
    const maxX = window.innerWidth - btnRef.current.offsetWidth - margin;
    const maxY = window.innerHeight - btnRef.current.offsetHeight - margin;
    const newX = Math.random() * maxX + margin / 2;
    const newY = Math.random() * maxY + margin / 2;

    anime({
      targets: btnRef.current,
      left: newX,
      top: newY,
      duration: ANIM.buttonDodge,
      easing: "easeOutBack",
    });
  }, []);

  const handleMouseEnter = () => dodge();

  const handleClick = () => {
    if (isMorphed.current) {
      onCaught();
      return;
    }
    // Morph into Yes
    isMorphed.current = true;
    anime({
      targets: btnRef.current,
      backgroundColor: "hsl(340, 80%, 60%)",
      scale: [1, 1.15, 1.05],
      duration: 400,
      easing: "easeOutElastic(1, .6)",
    });
    if (btnRef.current) {
      btnRef.current.textContent = "Yes! 💖";
    }
    setTimeout(onCaught, 600);
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onTouchStart={dodge}
      onClick={handleClick}
      className="fixed px-6 py-3 rounded-xl font-body font-semibold text-base bg-secondary text-secondary-foreground shadow-md cursor-pointer z-50 transition-none"
      style={{ left: "55%", top: "60%" }}
    >
      {label}
    </button>
  );
};

export default RunawayButton;
