import { useRef, useCallback, useEffect, useState } from "react";
import anime from "animejs";

interface Props {
  label: string;
  onCaught: () => void;
}

const TAUNTS = [
  "No 😢",
  "Nope! 😜",
  "Try again!",
  "Too slow! 🐢",
  "Can't catch me!",
  "Hehe! 😏",
  "Nice try! 💨",
  "Not today!",
  "Almost! 😂",
];

const EASINGS = [
  "easeOutBack",
  "easeOutElastic(1, .5)",
  "easeOutBounce",
  "easeOutExpo",
  "spring(1, 80, 10, 0)",
];

const RunawayButton = ({ label, onCaught }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isMorphed = useRef(false);
  const dodgeCount = useRef(0);
  const [text, setText] = useState(label);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isReady = useRef(false);

  // Place button initially near center-right
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const x = window.innerWidth * 0.55;
    const y = window.innerHeight * 0.6;
    setPos({ x, y });
    isReady.current = true;
  }, []);

  const getRandomPos = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return { x: 200, y: 200 };
    const margin = 60;
    const w = btn.offsetWidth || 120;
    const h = btn.offsetHeight || 50;
    const maxX = window.innerWidth - w - margin;
    const maxY = window.innerHeight - h - margin;
    return {
      x: Math.max(margin, Math.random() * maxX),
      y: Math.max(margin, Math.random() * maxY),
    };
  }, []);

  const dodge = useCallback(() => {
    if (isMorphed.current || !btnRef.current || !isReady.current) return;

    dodgeCount.current++;
    const newPos = getRandomPos();

    // Pick a random easing for variety
    const easing = EASINGS[dodgeCount.current % EASINGS.length];

    // Pick a random taunt
    setText(TAUNTS[dodgeCount.current % TAUNTS.length]);

    // Random rotation for playfulness
    const rotation = (Math.random() - 0.5) * 30;

    // Animate with visible movement
    anime.remove(btnRef.current);
    anime({
      targets: btnRef.current,
      translateX: newPos.x - pos.x,
      translateY: newPos.y - pos.y,
      rotate: [0, rotation, 0],
      scale: [1, 1.2, 1],
      duration: 400 + Math.random() * 200,
      easing: easing,
      complete: () => {
        // Update actual position and reset transform
        setPos(newPos);
        if (btnRef.current) {
          btnRef.current.style.transform = "none";
        }
      },
    });
  }, [pos, getRandomPos]);

  // Also dodge when mouse gets close (proximity detection)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn || isMorphed.current) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 120) {
        dodge();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dodge]);

  const handleClick = () => {
    if (isMorphed.current) {
      onCaught();
      return;
    }
    // If somehow clicked, morph into Yes
    isMorphed.current = true;
    setText("Yes! 💖");
    anime({
      targets: btnRef.current,
      backgroundColor: "hsl(340, 80%, 60%)",
      scale: [1, 1.3, 1.1],
      duration: 500,
      easing: "easeOutElastic(1, .6)",
    });
    setTimeout(onCaught, 700);
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={dodge}
      onTouchStart={dodge}
      onClick={handleClick}
      className="fixed px-6 py-3 rounded-xl font-body font-semibold text-base bg-secondary text-secondary-foreground shadow-lg cursor-pointer z-50"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        willChange: "transform",
      }}
    >
      {text}
    </button>
  );
};

export default RunawayButton;
