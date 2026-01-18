import { KEY_MAP } from "../utils/keyMap";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Keyboard({ audio }) {
  useKeyboard(audio);

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {Object.keys(KEY_MAP).map((key) => (
        <div
          key={key}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-neutral-800"
        >
          {key.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
