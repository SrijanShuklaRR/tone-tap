export default function Controls({ wave, setWave, volume, setVolume }) {
  return (
    <div className="flex gap-6 justify-center items-center">
      <select
        value={wave}
        onChange={(e) => setWave(e.target.value)}
        className="bg-neutral-800 px-4 py-2 rounded"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
        <option value="sawtooth">Sawtooth</option>
      </select>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
  );
}
