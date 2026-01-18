import { useEffect, useRef } from "react";

export function useVisualizer(analyserRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const buffer = new Uint8Array(analyser.fftSize);

    const draw = () => {
      analyser.getByteTimeDomainData(buffer);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      buffer.forEach((v, i) => {
        const x = (i / buffer.length) * canvas.width;
        const y = (v / 255) * canvas.height;
        ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "#38bdf8";
      ctx.stroke();
      requestAnimationFrame(draw);
    };

    draw();
  }, [analyserRef]);

  return canvasRef;
}
