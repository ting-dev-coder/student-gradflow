import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  // To stop and reset audio when the component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playAudio = (src) => {
    if (audioRef.current.src !== src) {
      // Set the new audio source
      audioRef.current.src = src;
      audioRef.current.load(); // Reload the audio to apply the new source
    }

    audioRef.current.loop = true; // Enable looping
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.loop = false; // Disable looping when stopping
    setIsPlaying(false);
  };

  const toggleAudio = (src: string) => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(src);
    }
  };

  return { isPlaying, playAudio, stopAudio, toggleAudio };
}
