import { useVisualizer } from "../hooks/useVisualizer";

export default function Visualizer({ analyserRef }) {
  const canvasRef = useVisualizer(analyserRef);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={200}
      className="mx-auto bg-neutral-900 rounded-lg"
    />
  );
}
