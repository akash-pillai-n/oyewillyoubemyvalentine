import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { TEXTS } from "@/lib/valentineConfig";

// All images from the img folder (served from public/img)
const CAROUSEL_IMAGES = [
  "/img/IMG_1624.jpeg",
  "/img/IMG_4076.jpeg",
  "/img/IMG_4265.jpeg",
  "/img/IMG_4321.jpeg",
  "/img/IMG_5957.JPG",
  "/img/IMG_7555.JPG",
  "/img/IMG_7990.JPG",
  "/img/Snapchat-1321052925.jpg",
  "/img/Snapchat-1616417266.jpg",
  "/img/Snapchat-319009705.jpg",
];

const SLIDE_DURATION_MS = 800; // < 1 sec per picture
const CROSSFADE_DURATION_MS = 350;

interface Props {
  onComplete: () => void;
}

const PhotoCarousel = ({ onComplete }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedCycle = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const goToNext = useCallback(() => {
    if (hasCompletedCycle.current) return;

    const nextIndex = (currentIndex + 1) % CAROUSEL_IMAGES.length;
    const isLastSlide = currentIndex === CAROUSEL_IMAGES.length - 1;

    if (isLastSlide) {
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
      }, CROSSFADE_DURATION_MS + 50);
      return;
    }

    setCurrentIndex(nextIndex);
  }, [currentIndex, onComplete]);

  // Auto-advance: less than 1 sec per picture
  useEffect(() => {
    if (hasCompletedCycle.current) return;
    timerRef.current = setTimeout(goToNext, SLIDE_DURATION_MS);
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

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="rounded-2xl shadow-valentine p-6 bg-card">
        <p className="font-script text-xl text-center text-valentine-rose mb-4">
          {TEXTS.carouselTitle}
        </p>

        {/* Slide area – smooth crossfade, no dots or count */}
        <div
          className="relative overflow-hidden rounded-xl aspect-[4/3] bg-muted"
          style={{ isolation: "isolate" }}
        >
          {CAROUSEL_IMAGES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat ease-in-out"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === currentIndex ? 1 : 0,
                zIndex: i === currentIndex ? 1 : 0,
                transition: `opacity ${CROSSFADE_DURATION_MS}ms ease-in-out`,
              }}
              aria-hidden={i !== currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
