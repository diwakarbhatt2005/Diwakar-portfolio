/**
 * Everything you're likely to tweak about the intro lives here.
 * Colours and fonts are in src/app/globals.css (the @theme block).
 */

// ✏️ BRAND TEXT — the wordmark shown on the intro.
export const BRAND = "DIWAKAR";

// ✏️ Where the word splits open for the image flipbook ("DIWA ▢ KAR").
// Number of letters on the left of the gap.
export const SPLIT_AT = 4;

// ✏️ IMAGES — files in /public/images/intro. Add or remove freely.
export const INTRO_IMAGES = [
  "/images/intro/intro-1.png",
  "/images/intro/intro-2.png",
  "/images/intro/intro-3.png",
  "/images/intro/intro-4.png",
  "/images/intro/intro-5.png",
];

// ✏️ TIMING (seconds)
export const TIMING = {
  total: 5, // whole intro, from first letter until it has slid away
  letterDuration: 0.8, // each letter's slide-up
  letterStagger: 0.06, // delay between letters
  hold: 0.4, // full wordmark on screen before it splits
  splitDuration: 0.8, // the two halves sliding apart
  imageDuration: 0.15, // each image in the loop (flipbook speed)
  exitDuration: 1, // intro layer sliding up
};

// ✏️ Image scatter. The reference has none (images sit dead-centre);
// set e.g. rotate: 4, offset: 12 for a looser, hand-placed stack.
export const SCATTER = {
  rotate: 0, // max degrees either way
  offset: 0, // max px either way
};

// ✏️ false = intro plays on every page load / refresh.
//    true  = plays once per browser session (refreshes skip it).
export const ONCE_PER_SESSION = false;

// sessionStorage key used when ONCE_PER_SESSION is on.
export const SEEN_KEY = "intro-seen";
