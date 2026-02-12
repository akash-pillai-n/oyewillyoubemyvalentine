import { useEffect, useRef } from "react";
import anime from "animejs";
import { TEXTS, ANIM } from "@/lib/valentineConfig";

interface Props {
  onOpen: () => void;
}

const EnvelopeIntro = ({ onOpen }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Fade in envelope
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: ANIM.envelopeFadeIn,
      easing: "easeOutCubic",
    });

    // Bounce arrow loop
    anime({
      targets: arrowRef.current,
      translateY: [-8, 8],
      duration: 800,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  }, []);

  const handleOpen = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = anime.timeline({ easing: "easeOutCubic" });

    // Hide arrow
    tl.add({
      targets: arrowRef.current,
      opacity: 0,
      duration: 200,
    });

    // Open flap
    tl.add({
      targets: flapRef.current,
      rotateX: [0, 180],
      duration: ANIM.flapOpen,
      easing: "easeInOutBack",
    }, 100);

    // Rise letter
    tl.add({
      targets: letterRef.current,
      translateY: [0, -60],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: ANIM.letterRise,
    }, 400);

    // Fade out everything
    tl.add({
      targets: containerRef.current,
      opacity: 0,
      scale: 1.1,
      duration: 500,
      complete: onOpen,
    }, 900);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-valentine-blue z-50">
      <div ref={containerRef} className="flex flex-col items-center gap-6 cursor-pointer" onClick={handleOpen}>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-script text-valentine-rose select-none">
          {TEXTS.envelopeTitle}
        </h1>

        {/* Envelope */}
        <div ref={envelopeRef} className="relative w-56 h-40 md:w-72 md:h-48" style={{ perspective: "800px" }}>
          {/* Envelope body */}
          <div className="absolute inset-0 rounded-lg shadow-valentine overflow-hidden"
            style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
            {/* Inner V shape */}
            <div className="absolute inset-0 flex items-start justify-center pt-2">
              <div className="w-0 h-0"
                style={{
                  borderLeft: "110px solid transparent",
                  borderRight: "110px solid transparent",
                  borderTop: "60px solid hsl(330, 40%, 95%)",
                }} />
            </div>
          </div>

          {/* Letter inside */}
          <div ref={letterRef}
            className="absolute left-1/2 bottom-4 w-36 md:w-44 h-28 md:h-36 rounded-md flex items-center justify-center opacity-0"
            style={{
              transform: "translateX(-50%)",
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "2px solid hsl(330, 50%, 90%)",
            }}>
            <span className="text-4xl">💌</span>
          </div>

          {/* Flap */}
          <div ref={flapRef}
            className="absolute top-0 left-0 w-full h-1/2 origin-top"
            style={{ transformStyle: "preserve-3d" }}>
            <div className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, hsl(330, 50%, 92%) 0%, hsl(0, 0%, 100%) 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderRadius: "8px 8px 0 0",
              }} />
          </div>
        </div>

        {/* Bounce arrow */}
        <div ref={arrowRef} className="text-valentine-rose text-3xl select-none mt-2">
          ↑ tap to open ↑
        </div>
      </div>
    </div>
  );
};

export default EnvelopeIntro;
