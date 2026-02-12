import { useState, useCallback } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import ColorTransitionLayer from "@/components/ColorTransitionLayer";
import SparkleBackground from "@/components/SparkleBackground";
import PhotoCarousel from "@/components/PhotoCarousel";
import ValentineQuestion from "@/components/ValentineQuestion";
import ConfettiCelebration from "@/components/ConfettiCelebration";

type Screen = "envelope" | "transition" | "carousel" | "question" | "celebration";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("envelope");

  const handleEnvelopeOpen = useCallback(() => setScreen("transition"), []);
  const handleTransitionDone = useCallback(() => setScreen("carousel"), []);
  const handleCarouselDone = useCallback(() => setScreen("question"), []);
  const handleYes = useCallback(() => setScreen("celebration"), []);

  return (
    <div className="min-h-screen bg-valentine-pink relative overflow-hidden">
      {screen !== "envelope" && screen !== "celebration" && <SparkleBackground />}

      {screen === "envelope" && (
        <EnvelopeIntro onOpen={handleEnvelopeOpen} />
      )}

      {screen === "transition" && (
        <ColorTransitionLayer onComplete={handleTransitionDone} />
      )}

      {screen === "carousel" && (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <PhotoCarousel onComplete={handleCarouselDone} />
        </div>
      )}

      {screen === "question" && (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <ValentineQuestion onYes={handleYes} />
        </div>
      )}

      {screen === "celebration" && <ConfettiCelebration />}
    </div>
  );
};

export default Index;
