import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { TEXTS, CAROUSEL_SLIDES, ANIM } from "@/lib/valentineConfig";

interface Props {
  onComplete: () => void;
}

const PhotoCarousel = ({ onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedCycle = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const goToNext = useCallback(() => {
    if (!slideRef.current) return;
    const next = currentIndex + 1;

    if (next >= CAROUSEL_SLIDES.length && !hasCompletedCycle.current) {
      hasCompletedCycle.current = true;
      setTimeout(() => {
        anime({
          targets: containerRef.current,
          opacity: 0,
          translateY: -20,
          duration: 500,
          easing: "easeInCubic",
          complete: onComplete,
        });
      }, 600);
      return;
    }

    const nextIndex = next % CAROUSEL_SLIDES.length;

    anime.timeline({ easing: "easeInOutCubic" })
      .add({
        targets: slideRef.current,
        translateX: [0, -120],
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 300,
      })
      .add({
        targets: slideRef.current,
        translateX: [120, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 300,
        begin: () => setCurrentIndex(nextIndex),
      });
  }, [currentIndex, onComplete]);

  // Fast auto-scroll
  useEffect(() => {
    if (hasCompletedCycle.current) return;
    timerRef.current = setTimeout(goToNext, 1800);
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, goToNext]);

  // Fade in on mount
  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      easing: "easeOutCubic",
    });
  }, []);

  const slide = CAROUSEL_SLIDES[currentIndex];

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="rounded-2xl shadow-valentine p-6 bg-card">
        <p className="font-script text-xl text-center text-valentine-rose mb-4">
          {TEXTS.carouselTitle}
        </p>

        {/* Slide area */}
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
          <div ref={slideRef}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
            style={{ backgroundColor: slide.color }}>
            <span className="text-5xl mb-2">📸</span>
            <p className="font-body text-lg font-semibold text-foreground">{slide.label}</p>
            <p className="font-body text-sm text-muted-foreground mt-1">{slide.caption}</p>
          </div>
        </div>

        {/* Progress dots only */}
        <div className="flex justify-center gap-2">
          {CAROUSEL_SLIDES.map((_, i) => (
            <div key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-valentine-rose scale-125" : "bg-secondary"
              }`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
