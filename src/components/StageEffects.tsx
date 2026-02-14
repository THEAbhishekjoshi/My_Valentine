'use client';

import React from 'react';

interface StageEffectsProps {
    currentStageIndex: number;
}

const StageEffects: React.FC<StageEffectsProps> = ({ currentStageIndex }) => {
    // Different effects for each stage
    const renderEffectForStage = () => {
        switch (currentStageIndex) {
            case 0:
                // Stage 1: Rising hearts
                return (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bottom-0 text-4xl opacity-30 animate-[float-up_8s_ease-in_infinite]"
                                style={{
                                    left: `${(i + 1) * 12}%`,
                                    animationDelay: `${i * 1}s`
                                }}
                            >
                                💗
                            </div>
                        ))}
                    </div>
                );

            case 1:
                // Stage 2: Shimmering stars
                return (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-2xl opacity-40 animate-pulse"
                                style={{
                                    top: `${Math.random() * 80}%`,
                                    left: `${Math.random() * 90}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            >
                                ⭐
                            </div>
                        ))}
                    </div>
                );

            case 2:
                // Stage 3: Floating bubbles
                return (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bottom-0 animate-[bubble-float_10s_ease-in-out_infinite]"
                                style={{
                                    left: `${(i + 1) * 10}%`,
                                    animationDelay: `${i * 0.8}s`
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full bg-linear-to-br from-pink-200/30 to-purple-200/30 backdrop-blur-sm border border-white/20"
                                    style={{
                                        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );

            case 3:
                // Stage 4: Butterflies flying
                return (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-3xl opacity-50 animate-[butterfly-fly_12s_ease-in-out_infinite]"
                                style={{
                                    top: `${20 + Math.random() * 40}%`,
                                    left: `-10%`,
                                    animationDelay: `${i * 2}s`
                                }}
                            >
                                🦋
                            </div>
                        ))}
                    </div>
                );

            case 4:
                // Stage 5: Sparkles and magic
                return (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-xl animate-ping"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random()}s`,
                                    opacity: 0.3 + Math.random() * 0.3
                                }}
                            >
                                ✨
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {renderEffectForStage()}
            <style jsx>{`
                @keyframes float-up {
                    0% {
                        transform: translateY(100vh) scale(0.8);
                        opacity: 0;
                    }
                    20% {
                        opacity: 0.3;
                    }
                    80% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-20vh) scale(1.2);
                        opacity: 0;
                    }
                }
                
                @keyframes bubble-float {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-80vh) translateX(30px);
                    }
                    100% {
                        transform: translateY(-100vh) translateX(-20px);
                    }
                }
                
                @keyframes butterfly-fly {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(30vw, -20vh) rotate(10deg);
                    }
                    50% {
                        transform: translate(60vw, 10vh) rotate(-10deg);
                    }
                    75% {
                        transform: translate(90vw, -30vh) rotate(5deg);
                    }
                    100% {
                        transform: translate(120vw, 0) rotate(0deg);
                    }
                }
            `}</style>
        </>
    );
};

export default StageEffects;
