import { useEffect } from "react";
import { KEY_MAP } from "../utils/keyMap";

export function useKeyboard(audio) {
  useEffect(() => {
    const down = (e) => {
      const freq = KEY_MAP[e.key];
      if (freq) audio.play(freq, e.key);
    };

    const up = (e) => {
      if (KEY_MAP[e.key]) audio.stop(e.key);
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [audio]);
}
