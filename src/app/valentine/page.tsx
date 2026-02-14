'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { STAGES } from '@/lib/data';
import World from '@/components/World';
import StageOverlay from '@/components/StageOverlay';
import StageEffects from '@/components/StageEffects';
import NameEntry from '@/components/NameEntry';

interface User {
    id: string;
    name: string;
}

export default function ValentinePage() {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [userChoices, setUserChoices] = useState<Record<number, string>>({});
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showFinale, setShowFinale] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [playfulResponse, setPlayfulResponse] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isSuccessMusicPlaying, setIsSuccessMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const successAudioRef = useRef<HTMLAudioElement | null>(null);

    // Toggle music play/pause - simple version for HTML audio element
    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMusicPlaying) {
            audio.pause();
            setIsMusicPlaying(false);
        } else {
            audio.play()
                .then(() => {
                    setIsMusicPlaying(true);
                })
                .catch(error => {
                    console.error('Playback error:', error);
                });
        }
    };

    // Trigger confetti when success - Enhanced with heart shapes
    useEffect(() => {
        if (isSuccess) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            // Create heart and rose emoji confetti
            const scalar = 3;
            const heart = confetti.shapeFromText({ text: '❤️', scalar });
            const rose = confetti.shapeFromText({ text: '🌹', scalar });
            const sparkle = confetti.shapeFromText({ text: '✨', scalar });

            const defaults = {
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0,
                shapes: [heart, rose, sparkle],
                scalar
            };

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isSuccess]);

    // Save response to database
    const saveResponse = async (question: string, answer: string, stageIndex: number) => {
        if (!user) return;
        try {
            await fetch('/api/response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    question,
                    answer,
                    stageIndex
                })
            });
        } catch (error) {
            console.error('Failed to save response:', error);
        }
    };

    // Transition handling
    const handleOptionSelect = (value: string) => {
        if (isTransitioning) return;

        // Save the response
        const currentStage = STAGES[currentStageIndex];
        saveResponse(currentStage.question, value, currentStageIndex);

        setUserChoices(prev => ({ ...prev, [currentStageIndex]: value }));
        setIsTransitioning(true);

        // Simulate "walking forward" animation duration
        setTimeout(() => {
            if (currentStageIndex < STAGES.length - 1) {
                setCurrentStageIndex(prev => prev + 1);
                setIsTransitioning(false);
            } else {
                // Move to the final boy-girl meeting area
                setCurrentStageIndex(STAGES.length);
                setIsTransitioning(false);
                setShowFinale(true);
            }
        }, 1200);
    };

    const handleFinalChoice = (choice: 'yes' | 'maybe') => {
        // Save final choice
        saveResponse("Will you be my Valentine?", choice, STAGES.length);

        if (choice === 'yes') {
            setIsSuccess(true);
            setPlayfulResponse(false);

            // Stop background music and play success music
            if (audioRef.current) {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            }
            if (successAudioRef.current) {
                // Start from 25 seconds
                successAudioRef.current.currentTime = 25;
                successAudioRef.current.play()
                    .then(() => setIsSuccessMusicPlaying(true))
                    .catch(e => console.error("Success music failed:", e));
            }

            // Immediate burst with heart shapes
            const scalar = 3;
            const heart = confetti.shapeFromText({ text: '❤️', scalar });
            const rose = confetti.shapeFromText({ text: '🌹', scalar });
            const kiss = confetti.shapeFromText({ text: '💋', scalar });

            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 },
                shapes: [heart, rose, kiss],
                scalar,
                colors: ['#ff69b4', '#ff1493', '#ff0000', '#ffc0cb']
            });

            // Secondary burst
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    shapes: [heart, rose],
                    scalar
                });
                confetti({
                    particleCount: 80,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    shapes: [heart, rose],
                    scalar
                });
            }, 250);
        } else {
            setPlayfulResponse(true);
        }
    };

    return (
        <main className="relative w-screen h-screen bg-pink-50 overflow-hidden font-sans select-none">
            {/* Name Entry Overlay */}
            {!user && (
                <NameEntry
                    onComplete={(userJson) => {
                        const userData = JSON.parse(userJson);
                        setUser(userData);
                    }}
                />
            )}

            {/* Game World */}
            <World
                currentStageIndex={currentStageIndex}
                isWalking={isTransitioning}
                isSuccess={isSuccess}
                stages={STAGES}
            />

            {/* Background Music - HTML Audio Element */}
            <audio
                ref={audioRef}
                src="https://www.bensound.com/bensound-music/bensound-romantic.mp3"
                loop
                preload="auto"
                className="hidden"
            />

            {/* Success Celebration Music - I Like Me Better by Lauv (Local File) */}
            <audio
                ref={successAudioRef}
                src="/BellsM_-_i_like_me_better_lauv_(mp3.pm).mp3"
                loop
                preload="auto"
                className="hidden"
            />

            {/* Stage-Specific Visual Effects */}
            {!showFinale && <StageEffects currentStageIndex={currentStageIndex} />}

            {/* Music Control Button */}
            <button
                onClick={toggleMusic}
                className="fixed top-6 right-6 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-pink-300 flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:bg-pink-50"
                aria-label={isMusicPlaying ? "Pause music" : "Play music"}
            >
                {isMusicPlaying ? (
                    <span className="text-2xl">🔊</span>
                ) : (
                    <span className="text-2xl">🔇</span>
                )}
            </button>

            {/* Enhanced Progress UI */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-4 rounded-full shadow-[0_8px_32px_rgba(255,105,180,0.4)] border-2 border-pink-200">
                    {STAGES.map((_, i) => (
                        <div key={i} className="relative flex items-center">
                            {/* Progress Dot */}
                            <div className="relative group">
                                <div
                                    className={`
                                        w-5 h-5 rounded-full transition-all duration-500 relative z-10
                                        ${i < currentStageIndex
                                            ? 'bg-pink-500 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.6)]'
                                            : i === currentStageIndex
                                                ? 'bg-pink-500 scale-125 animate-pulse shadow-[0_0_20px_rgba(236,72,153,0.8)]'
                                                : 'bg-pink-200 scale-90'
                                        }
                                    `}
                                >
                                    {/* Completion Checkmark */}
                                    {i < currentStageIndex && (
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                            ✓
                                        </div>
                                    )}

                                    {/* Active Pulse Ring */}
                                    {i === currentStageIndex && (
                                        <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-75"></div>
                                    )}
                                </div>

                                {/* Stage Label on Hover */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    <div className="bg-pink-600 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                                        Stage {i + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            {i < STAGES.length - 1 && (
                                <div
                                    className={`
                                        w-8 h-1 mx-1 rounded-full transition-all duration-500
                                        ${i < currentStageIndex
                                            ? 'bg-linear-to-r from-pink-500 to-pink-400'
                                            : 'bg-pink-200'
                                        }
                                    `}
                                />
                            )}
                        </div>
                    ))}

                    {/* Final Heart Indicator with extra space */}
                    <div className="ml-2"></div>
                    <div className="relative group">
                        <div
                            className={`
                                w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500
                                ${currentStageIndex === STAGES.length
                                    ? 'bg-linear-to-br from-rose-400 to-pink-500 scale-150 shadow-[0_0_30px_rgba(244,63,94,0.8)] animate-bounce'
                                    : 'bg-pink-200 scale-100'
                                }
                            `}
                        >
                            <span className="text-lg">💝</span>

                            {/* Success Sparkles */}
                            {currentStageIndex === STAGES.length && (
                                <>
                                    <div className="absolute -top-2 -right-2 text-yellow-400 animate-ping">✨</div>
                                    <div className="absolute -bottom-2 -left-2 text-yellow-400 animate-ping delay-75">✨</div>
                                </>
                            )}
                        </div>

                        {/* Final Stage Label */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            <div className="bg-rose-600 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                                Final Stage 💖
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stage Questions */}
            {!showFinale && currentStageIndex < STAGES.length && (
                <StageOverlay
                    stage={STAGES[currentStageIndex]}
                    onOptionSelect={handleOptionSelect}
                    isTransitioning={isTransitioning}
                />
            )}

            {/* Final Proposal UI */}
            {showFinale && !isSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-8 border-pink-400 max-w-lg w-full text-center animate-in fade-in zoom-in duration-500">
                        <h1 className="text-4xl font-black text-pink-600 mb-6 nursery-rhyme">
                            {playfulResponse ? "Hehe, okay! Take your time... 🤭" : "The Quest is Complete!"}
                        </h1>
                        <p className="text-xl text-pink-400 mb-8 font-medium">
                            {playfulResponse
                                ? "But I'll still be right here waiting for you. Ready to ask again?"
                                : "I've waited for this moment... will you be my Valentine?"}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handleFinalChoice('yes')}
                                className="px-10 py-5 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full text-2xl font-black hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-pink-200"
                            >
                                Yes! 💖
                            </button>
                            <button
                                onClick={() => handleFinalChoice('maybe')}
                                className="px-8 py-4 bg-pink-100 text-pink-600 rounded-full text-lg font-bold hover:bg-pink-200 transition-all"
                            >
                                Let me think... 😅
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Screen */}
            {isSuccess && (
                <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-linear-to-br from-pink-400 to-rose-400 text-white text-center animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="text-9xl mb-8 animate-bounce">💖</div>
                    <h1 className="text-7xl font-black mb-4 drop-shadow-lg">YES!</h1>
                    <p className="text-2xl font-medium max-w-md px-6 drop-shadow-md">
                        You've made me the happiest person in the digital world! Happy Valentine's Day! ✨
                    </p>
                    <div className="mt-12 flex gap-4">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-3xl animate-[float_4s_infinite]"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 4}s`,
                                    opacity: 0.8
                                }}
                            >
                                {['❤️', '💖', '✨', '🌸', '🍭', '🫂'][Math.floor(Math.random() * 6)]}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-12 px-8 py-3 bg-white text-pink-500 rounded-full hover:bg-pink-50 transition-all font-black text-xl shadow-xl"
                    >
                        Play Again
                    </button>
                </div>
            )}

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-40px) rotate(15deg); }
        }
        .nursery-rhyme {
          letter-spacing: -0.02em;
        }
      `}</style>
        </main>
    );
}
