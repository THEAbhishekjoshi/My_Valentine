// Sound effect hook wrapper
// This provides a centralized place to manage sound effects
// To use real sounds, replace the URLs with actual sound file paths

'use client';

import { useEffect, useRef } from 'react';

// Simple sound player hook (placeholder for use-sound)
// Since we don't have actual sound files, this provides a mock implementation
export function useSoundEffect(soundType: 'pop' | 'click' | 'success' | 'hover' | 'background') {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // In a real implementation, you would load actual audio files here
        // For now, we'll use the Web Audio API to create simple beep sounds

        // Placeholder - you can replace these with actual sound URLs:
        // const soundUrls = {
        //     pop: '/sounds/pop.mp3',
        //     click: '/sounds/click.mp3',
        //     success: '/sounds/success.mp3',
        //     hover: '/sounds/hover.mp3',
        //     background: '/sounds/background-music.mp3',
        // };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [soundType]);

    const play = () => {
        // Create a simple beep using Web Audio API as placeholder
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Different frequencies for different sound types
            const frequencies: Record<string, number> = {
                pop: 800,
                click: 600,
                success: 1000,
                hover: 400,
                background: 0, // Silent for background placeholder
            };

            oscillator.frequency.value = frequencies[soundType] || 500;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Sound playback not available:', error);
        }
    };

    return { play };
}

// Hook for background music
export function useBackgroundMusic(autoPlay = false) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (autoPlay && typeof window !== 'undefined') {
            // Placeholder for background music
            // Replace with actual music file: audioRef.current = new Audio('/sounds/background.mp3');
            // audioRef.current.loop = true;
            // audioRef.current.volume = 0.3;
            // audioRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [autoPlay]);

    const toggle = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    return { toggle };
}
