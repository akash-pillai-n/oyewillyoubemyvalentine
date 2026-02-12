import { useRef, useCallback, useEffect, useState } from "react";
import anime from "animejs";

interface Props {
  label: string;
  onCaught: () => void;
  getInitialPos?: () => { x: number; y: number };
  onFirstDodge?: () => void;
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

const RunawayButton = ({ label, onCaught, getInitialPos, onFirstDodge }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isMorphed = useRef(false);
  const dodgeCount = useRef(0);
  const [text, setText] = useState(label);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const isReady = useRef(false);

  // Place button at initial position (side by side with Yes)
  useEffect(() => {
    // Small delay to let the anchor render
    const timer = setTimeout(() => {
      if (getInitialPos) {
        const p = getInitialPos();
        setPos(p);
      } else {
        setPos({ x: window.innerWidth * 0.55, y: window.innerHeight * 0.5 });
      }
      isReady.current = true;
    }, 100);
    return () => clearTimeout(timer);
  }, [getInitialPos]);

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
    if (isMorphed.current || !btnRef.current || !isReady.current || !pos) return;

    dodgeCount.current++;

    // Notify parent on first dodge
    if (dodgeCount.current === 1 && onFirstDodge) {
      onFirstDodge();
    }

    const newPos = getRandomPos();
    const easing = EASINGS[dodgeCount.current % EASINGS.length];
    setText(TAUNTS[dodgeCount.current % TAUNTS.length]);
    const rotation = (Math.random() - 0.5) * 30;

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
        setPos(newPos);
        if (btnRef.current) {
          btnRef.current.style.transform = "none";
        }
      },
    });
  }, [pos, getRandomPos, onFirstDodge]);

  // Proximity detection
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

  if (!pos) return null;

  return (
    <button
      ref={btnRef}
      onMouseEnter={dodge}
      onTouchStart={dodge}
      onClick={handleClick}
      className="fixed py-4 rounded-xl font-body font-bold text-lg bg-secondary text-secondary-foreground shadow-lg cursor-pointer z-50"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: "180px",
        maxWidth: "180px",
        willChange: "transform",
      }}
    >
      {text}
    </button>
  );
};

export default RunawayButton;
