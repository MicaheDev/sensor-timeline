import { useRef, useEffect, Ref } from "react";

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef: Ref<HTMLAudioElement> = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );
}
