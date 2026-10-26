// Tiny shared state so hero animations can wait for the intro loader to finish.

export const INTRO_KEY = "bm-intro-seen";

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** True while the intro overlay is covering the page (set by the inline head script). */
export function introPlaying(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("intro-play");
}

/** Runs in <head> before first paint: decides whether this visit gets the intro. */
export const introHeadScript = `try{var d=document.documentElement;if(!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-play")}}catch(e){}`;
