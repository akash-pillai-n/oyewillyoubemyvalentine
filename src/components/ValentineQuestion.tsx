import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { TEXTS } from "@/lib/valentineConfig";
import RunawayButton from "./RunawayButton";

interface Props {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnAnchorRef = useRef<HTMLDivElement>(null);
  const [noEscaped, setNoEscaped] = useState(false);

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

  // Get the initial position for the No button from its placeholder in the card
  const getNoInitialPos = () => {
    if (noBtnAnchorRef.current) {
      const rect = noBtnAnchorRef.current.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    }
    return { x: window.innerWidth * 0.55, y: window.innerHeight * 0.5 };
  };

  return (
    <>
      <div ref={containerRef} className="w-full max-w-md mx-auto">
        <div className="rounded-2xl shadow-valentine p-8 bg-card text-center">
          <h2 className="font-script text-3xl md:text-4xl text-valentine-rose mb-8">
            {TEXTS.questionTitle}
          </h2>

          <div className="flex justify-center gap-4">
            <button
              ref={yesBtnRef}
              onClick={handleYes}
              className="flex-1 max-w-[180px] py-4 rounded-xl font-body font-bold text-lg bg-primary text-primary-foreground glow-valentine hover:scale-105 transition-transform"
            >
              {TEXTS.yesButton}
            </button>

            {/* Placeholder for No button — invisible once it escapes */}
            <div
              ref={noBtnAnchorRef}
              className="flex-1 max-w-[180px]"
              style={{ visibility: noEscaped ? "hidden" : "hidden" }}
            >
              {/* Just a spacer to measure position */}
              <div className="py-4 rounded-xl text-lg">​</div>
            </div>
          </div>
        </div>
      </div>

      <RunawayButton
        label={TEXTS.noButton}
        onCaught={onYes}
        getInitialPos={getNoInitialPos}
        onFirstDodge={() => setNoEscaped(true)}
      />
    </>
  );
};

export default ValentineQuestion;
