// ============================================================
// VALENTINE'S CONFIG - Edit these values to customize your card
// ============================================================

// --- TEXTS ---
export const TEXTS = {
  envelopeTitle: "You've got mail 💌",
  carouselTitle: "Some of our favorite moments 💕",
  questionTitle: "Will you be my Valentine?",
  yesButton: "Yes! 💖",
  noButton: "No 😢",
  celebrationTitle: "Yay! You're my Valentine! 💖",
  celebrationSubtitle: "I knew you'd say yes! 🥰",
};

// --- CAROUSEL SLIDES ---
// Replace placeholder colors/text with your own image URLs and captions
export const CAROUSEL_SLIDES = [
  { id: 1, color: "hsl(340, 80%, 85%)", caption: "Our first date 💕", label: "Photo 1" },
  { id: 2, color: "hsl(330, 60%, 88%)", caption: "That sunset walk 🌅", label: "Photo 2" },
  { id: 3, color: "hsl(350, 70%, 82%)", caption: "Ice cream day 🍦", label: "Photo 3" },
  { id: 4, color: "hsl(320, 50%, 86%)", caption: "Movie night 🎬", label: "Photo 4" },
  { id: 5, color: "hsl(345, 75%, 84%)", caption: "Dancing in the rain 💃", label: "Photo 5" },
];

// --- AUDIO ---
// Replace this with your own audio file path (mp3)
export const CELEBRATION_AUDIO_SRC = "/celebration-sound.mp3";

// --- ANIMATION TIMING ---
export const ANIM = {
  envelopeFadeIn: 800,
  flapOpen: 600,
  letterRise: 500,
  colorDisperse: 1200,
  sparkleStagger: 100,
  carouselSlideInterval: 3000,
  carouselTransition: 500,
  buttonDodge: 300,
  confettiDuration: 4000,
  confettiParticleCount: 60,
};
