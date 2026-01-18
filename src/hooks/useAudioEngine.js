import { useEffect, useRef, useCallback } from "react";

export function useAudioEngine(waveType, volume) {
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const analyserRef = useRef(null);
  const oscMapRef = useRef({});

  //  Initialize audio graph ONCE
  useEffect(() => {
    const audioCtx = new AudioContext();
    const gain = audioCtx.createGain();
    const analyser = audioCtx.createAnalyser();

    gain.connect(analyser);
    analyser.connect(audioCtx.destination);

    audioCtxRef.current = audioCtx;
    gainRef.current = gain;
    analyserRef.current = analyser;

    return () => {
      audioCtx.close();
    };
  }, []);

  //  Update volume safely
  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);

  //  Play tone (event-driven, safe)
  const play = useCallback((frequency, key) => {
    if (!audioCtxRef.current || oscMapRef.current[key]) return;

    const osc = audioCtxRef.current.createOscillator();
    osc.type = waveType;
    osc.frequency.value = frequency;
    osc.connect(gainRef.current);
    osc.start();

    oscMapRef.current[key] = osc;
  }, [waveType]);

  //  Stop tone
  const stop = useCallback((key) => {
    const osc = oscMapRef.current[key];
    if (!osc) return;

    osc.stop();
    osc.disconnect();
    delete oscMapRef.current[key];
  }, []);

  return {
    play,
    stop,
    analyser: analyserRef
  };
}
