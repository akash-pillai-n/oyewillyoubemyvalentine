import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { TEXTS, CAROUSEL_SLIDES, ANIM } from "@/lib/valentineConfig";

interface Props {
  onComplete: () => void;
}

const PhotoCarousel = ({ onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedCycle = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const goToSlide = useCallback((nextIndex: number, direction: number = 1) => {
    if (!slideRef.current) return;

    anime.timeline({ easing: "easeInOutCubic" })
      .add({
        targets: slideRef.current,
        translateX: [0, -100 * direction],
        opacity: [1, 0],
        duration: ANIM.carouselTransition / 2,
      })
      .add({
        targets: slideRef.current,
        translateX: [100 * direction, 0],
        opacity: [0, 1],
        duration: ANIM.carouselTransition / 2,
        begin: () => setCurrentIndex(nextIndex),
      });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (cycleComplete) return;

    timerRef.current = setTimeout(() => {
      const next = currentIndex + 1;
      if (next >= CAROUSEL_SLIDES.length) {
        if (!hasCompletedCycle.current) {
          hasCompletedCycle.current = true;
          setCycleComplete(true);
          // Transition out after a beat
          setTimeout(() => {
            anime({
              targets: containerRef.current,
              opacity: 0,
              translateY: -20,
              duration: 500,
              easing: "easeInCubic",
              complete: onComplete,
            });
          }, 800);
        }
      } else {
        goToSlide(next, 1);
      }
    }, ANIM.carouselSlideInterval);

    return () => clearTimeout(timerRef.current);
  }, [currentIndex, cycleComplete, goToSlide, onComplete]);

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

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button key={i}
              onClick={() => goToSlide(i, i > currentIndex ? 1 : -1)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-valentine-rose scale-125" : "bg-secondary"
              }`} />
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex justify-between mt-3">
          <button
            onClick={() => goToSlide((currentIndex - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length, -1)}
            className="text-valentine-rose font-body text-sm hover:opacity-70 transition-opacity">
            ← Prev
          </button>
          <button
            onClick={() => goToSlide((currentIndex + 1) % CAROUSEL_SLIDES.length, 1)}
            className="text-valentine-rose font-body text-sm hover:opacity-70 transition-opacity">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
