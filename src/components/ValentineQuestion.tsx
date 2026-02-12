import { useEffect, useRef } from "react";
import anime from "animejs";
import { TEXTS } from "@/lib/valentineConfig";
import RunawayButton from "./RunawayButton";

interface Props {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 600,
      easing: "easeOutCubic",
    });
  }, []);

  const handleYes = () => {
    anime({
      targets: yesBtnRef.current,
      scale: [1, 1.3, 1],
      duration: 500,
      easing: "easeOutElastic(1, .5)",
      complete: onYes,
    });
  };

  return (
    <>
      <div ref={containerRef} className="w-full max-w-md mx-auto">
        <div className="rounded-2xl shadow-valentine p-8 bg-card text-center">
          <h2 className="font-script text-3xl md:text-4xl text-valentine-rose mb-8">
            {TEXTS.questionTitle}
          </h2>

          <div className="flex justify-center">
            <button
              ref={yesBtnRef}
              onClick={handleYes}
              className="px-8 py-4 rounded-xl font-body font-bold text-lg bg-primary text-primary-foreground glow-valentine hover:scale-105 transition-transform"
            >
              {TEXTS.yesButton}
            </button>
          </div>
        </div>
      </div>

      <RunawayButton label={TEXTS.noButton} onCaught={onYes} />
    </>
  );
};

export default ValentineQuestion;
