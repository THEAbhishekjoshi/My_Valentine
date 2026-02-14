export type CharacterType = 'girl' | 'boy';

export interface StageOption {
  label: string;
  value: string;
}

export interface Stage {
  id: number;
  question: string;
  options: StageOption[];
  backgroundNear: string; // CSS color or SVG path
  backgroundFar: string;
  dialogue?: string;
}

export const STAGES: Stage[] = [
  {
    id: 1,
    question: "Welcome to the Valentine Quest! Ready to find your way to my heart?",
    options: [
      { label: "Yes, let's go! ❤️", value: "yes" },
      { label: "I'm always ready! ✨", value: "always" },
    ],
    backgroundNear: "#fb7185", // rose-400
    backgroundFar: "#fda4af", // rose-300
    dialogue: "I have some questions for you along the way...",
  },
  {
    id: 2,
    question: "What's our ideal date night?",
    options: [
      { label: "Cozy movie night 🍿", value: "movie" },
      { label: "Starlit walk 🌙", value: "walk" },
      { label: "Nice dinner with me 🍷", value: "dinner" },
    ],
    backgroundNear: "#f472b6", // pink-400
    backgroundFar: "#f9a8d4", // pink-300
  },
  {
    id: 3,
    question: "Choose the bonus item we unlock together 🎁",
    options: [
      { label: "Unlimited ice-cream dates 🍦", value: "icecream" },
      { label: "A lifetime of teasing 😌", value: "tease" },
      { label: "One cute hug coupon 🤗", value: "hug" },
    ],
    backgroundNear: "#e879f9", // fuchsia-400
    backgroundFar: "#f0abfc", // fuchsia-300
  },
  {
    id: 4,
    question: "Okay be honest… are you smiling right now? 😉",
    options: [
      { label: "Maybeee �", value: "maybe" },
      { label: "Yes 😭", value: "yes_smile" },
    ],
    backgroundNear: "#c084fc", // purple-400
    backgroundFar: "#d8b4fe", // purple-300
  },
  {
    id: 5,
    question: "Alright… last step. Promise you won’t laugh at me? 😳",
    options: [
      { label: "I promise 🙈", value: "promise" },
      { label: "I might… a little �", value: "little" },
    ],
    backgroundNear: "#fb7185", // rose-400
    backgroundFar: "#fda4af", // rose-300
  },
];
