import { useState } from "react";
import Header from "./components/Header.jsx";
import Keyboard from "./components/keyboard.jsx";
import Controls from "./components/Controls.jsx";
import Visualizer from "./components/Visulaizer.jsx";
import { useAudioEngine } from "./hooks/useAudioEngine.js";

export default function App() {
  const [wave, setWave] = useState("sine");
  const [volume, setVolume] = useState(0.2);

  const audio = useAudioEngine(wave, volume);

  return (
    <div className="min-h-screen px-6 py-8 flex flex-col gap-8">
      <Header />
      <Keyboard audio={audio} />
      <Visualizer analyser={audio.analyser} />
      <Controls
        wave={wave}
        setWave={setWave}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
}
