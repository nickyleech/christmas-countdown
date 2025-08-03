import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioControls = ({ isChristmas }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const bellSoundRef = useRef(null);

  useEffect(() => {
    // Create audio elements programmatically to avoid file dependencies
    const createAudioElement = (frequency, duration, type = 'sine') => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
      
      return { audioContext, oscillator, gainNode };
    };

    // Initialize bell sound function
    bellSoundRef.current = () => {
      if (isMuted) return;
      
      try {
        // Create a simple bell-like sound using multiple frequencies
        createAudioElement(800, 0.5, 'sine');
        setTimeout(() => createAudioElement(600, 0.4, 'sine'), 100);
        setTimeout(() => createAudioElement(900, 0.3, 'sine'), 200);
      } catch (error) {
        console.log('Audio not supported in this environment');
      }
    };

    return () => {
      // Cleanup function - no longer needed since we use programmatic audio
    };
  }, [isMuted]);

  const playChristmasChime = () => {
    if (bellSoundRef.current) {
      bellSoundRef.current();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      // Stop the background ambient sound
      setIsPlaying(false);
    } else {
      // Play Christmas chime
      playChristmasChime();
      setIsPlaying(true);
      // Auto-stop after a few seconds since we don't have actual music files
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <button
        onClick={toggleMute}
        className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-red-600" aria-hidden="true" />
        ) : (
          <Volume2 className="w-4 h-4 text-red-600" aria-hidden="true" />
        )}
        <span className="text-sm text-red-600 font-medium">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>
      </button>

      {!isMuted && (
        <button
          onClick={toggleMusic}
          disabled={isPlaying}
          className="flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:outline-none"
          aria-label={isPlaying ? "Playing Christmas chime" : "Play Christmas chime"}
        >
          <Music className={`w-4 h-4 ${isPlaying ? 'text-gray-400' : 'text-green-600'}`} aria-hidden="true" />
          <span className={`text-sm font-medium ${isPlaying ? 'text-gray-400' : 'text-green-600'}`}>
            {isPlaying ? 'Playing...' : 'Chime'}
          </span>
        </button>
      )}

      {isChristmas && !isMuted && (
        <button
          onClick={playChristmasChime}
          className="px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          aria-label="Play celebration sound"
        >
          <span className="text-sm text-yellow-600 font-medium">🔔 Celebrate!</span>
        </button>
      )}
    </div>
  );
};

export default AudioControls;