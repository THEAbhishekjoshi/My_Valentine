'use client';

import React from 'react';
import ParallaxLayer from './ParallaxLayer';
import Character from './Character';
import { Stage } from '@/lib/data';
import FloatingParticles from './FloatingParticles';

interface WorldProps {
    currentStageIndex: number;
    isWalking: boolean;
    isSuccess?: boolean;
    stages: Stage[];
}

const World: React.FC<WorldProps> = ({ currentStageIndex, isWalking, isSuccess, stages }) => {
    const worldOffset = -currentStageIndex * 100; // in vw
    const isAtFinalArea = currentStageIndex === stages.length;

    // Dramatic day-to-night sky progression
    const skyData = [
        {
            // Stage 0: Bright sunny morning
            gradient: 'from-sky-300 via-blue-200 to-cyan-100',
            celestial: 'sun',
            clouds: '☁️',
            atmosphereColor: 'rgba(255, 223, 186, 0.2)'
        },
        {
            // Stage 1: Afternoon with golden light
            gradient: 'from-orange-200 via-yellow-100 to-amber-100',
            celestial: 'sun-low',
            clouds: '☁️',
            atmosphereColor: 'rgba(255, 200, 124, 0.3)'
        },
        {
            // Stage 2: Sunset - pink and orange
            gradient: 'from-orange-300 via-pink-200 to-purple-200',
            celestial: 'sunset',
            clouds: '🌥️',
            atmosphereColor: 'rgba(255, 154, 162, 0.4)'
        },
        {
            // Stage 3: Dusk - purple twilight
            gradient: 'from-indigo-400 via-purple-300 to-pink-300',
            celestial: 'early-stars',
            clouds: '',
            atmosphereColor: 'rgba(159, 122, 234, 0.3)'
        },
        {
            // Stage 4: Evening - deep blue with moon
            gradient: 'from-indigo-600 via-blue-500 to-indigo-500',
            celestial: 'moon',
            clouds: '',
            atmosphereColor: 'rgba(99, 102, 241, 0.2)'
        },
        {
            // Final: Romantic starry night
            gradient: 'from-gray-900 via-indigo-900 to-purple-900',
            celestial: 'stars',
            clouds: '',
            atmosphereColor: 'rgba(76, 29, 149, 0.4)'
        }
    ];

    const currentSkyData = isAtFinalArea ? skyData[5] : skyData[currentStageIndex];

    return (
        <div className={`relative w-screen h-screen overflow-hidden bg-linear-to-b transition-all duration-2500 ${currentSkyData.gradient}`}>
            {/* Atmospheric glow effect */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-2500"
                style={{ backgroundColor: currentSkyData.atmosphereColor }}
            />
            <FloatingParticles />

            {/* Dynamic Celestial Bodies */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-2000">
                {/* Sun - Stages 0, 1 */}
                {currentStageIndex <= 1 && (
                    <div
                        className={`absolute transition-all duration-2500 ${currentStageIndex === 0
                            ? 'top-20 right-32'
                            : 'top-40 right-20'
                            }`}
                    >
                        <div className="relative">
                            {/* Sun glow */}
                            <div className="absolute inset-0 w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                            {/* Sun core */}
                            <div className="relative w-24 h-24 bg-linear-to-br from-yellow-200 to-orange-300 rounded-full shadow-[0_0_60px_rgba(251,191,36,0.8)]">
                                <div className="absolute inset-2 bg-linear-to-br from-yellow-100 to-yellow-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sunset - Stage 2 */}
                {currentStageIndex === 2 && (
                    <div className="absolute bottom-32 right-24 transition-all duration-2500">
                        <div className="relative">
                            <div className="absolute inset-0 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-70"></div>
                            <div className="relative w-32 h-32 bg-linear-to-b from-orange-300 to-rose-400 rounded-full shadow-[0_0_80px_rgba(251,146,60,0.9)]"></div>
                        </div>
                    </div>
                )}

                {/* Moon - Stages 3, 4, 5, final */}
                {currentStageIndex >= 3 && (
                    <div className="absolute top-24 right-28 transition-all duration-2500">
                        <div className="relative">
                            {/* Moon glow */}
                            <div className="absolute inset-0 w-20 h-20 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
                            {/* Moon */}
                            <div className="relative w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full shadow-[0_0_40px_rgba(224,242,254,0.6)]">
                                {/* Moon craters */}
                                <div className="absolute top-3 left-4 w-3 h-3 bg-gray-300 rounded-full opacity-40"></div>
                                <div className="absolute top-7 left-10 w-2 h-2 bg-gray-300 rounded-full opacity-30"></div>
                                <div className="absolute top-12 left-6 w-2.5 h-2.5 bg-gray-300 rounded-full opacity-35"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stars - Stages 3, 4, 5, final */}
                {currentStageIndex >= 3 && (
                    <>
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-white animate-pulse"
                                style={{
                                    top: `${10 + Math.random() * 70}%`,
                                    left: `${Math.random() * 100}%`,
                                    fontSize: `${8 + Math.random() * 8}px`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`,
                                    opacity: currentStageIndex >= 4 ? 0.8 : 0.4
                                }}
                            >
                                ⭐
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Sky Layer (Very slow) - Clouds */}
            <ParallaxLayer speed={-0.1} offset={currentStageIndex * -100} className="z-0">
                <div className="flex w-[600vw] h-full">
                    {stages.map((_, i) => (
                        <div key={i} className="w-screen h-full relative">
                            {/* Clouds - only during day/sunset (stages 0-2) */}
                            {i <= 2 && (
                                <>
                                    <div className={`absolute top-20 left-[20%] text-6xl transition-opacity duration-1000 ${i === currentStageIndex ? 'opacity-20' : 'opacity-5'}`}>
                                        {i <= 1 ? '☁️' : '🌥️'}
                                    </div>
                                    <div className={`absolute top-40 left-[60%] text-8xl transition-opacity duration-1000 ${i === currentStageIndex ? 'opacity-10' : 'opacity-3'}`}>
                                        {i <= 1 ? '☁️' : '🌥️'}
                                    </div>
                                    <div className={`absolute top-32 left-[80%] text-5xl transition-opacity duration-1000 ${i === currentStageIndex ? 'opacity-15' : 'opacity-3'}`}>
                                        {i === 0 ? '☁️' : i === 1 ? '☁️' : '🌥️'}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {/* Transition to final area */}
                    <div className="w-screen h-full relative bg-pink-50/30">
                        <div className="absolute top-20 left-[40%] text-6xl opacity-20">☁️</div>
                        <div className="absolute top-10 right-20 text-4xl opacity-50 animate-pulse">✨</div>
                    </div>
                </div>
            </ParallaxLayer >

            {/* Far Background (Slow) - Romantic Hills */}
            < ParallaxLayer speed={- 0.3} offset={currentStageIndex * - 100} className="z-10" >
                <div className="flex w-[600vw] h-full items-end pb-32">
                    {stages.map((stage, i) => (
                        <div key={i} className="w-screen h-full relative overflow-hidden">
                            {/* Rolling Pink Hills */}
                            <div className="absolute bottom-20 left-0 w-full h-[40%] bg-pink-100/40 rounded-t-[100%] scale-x-125 translate-y-10" />
                            <div className="absolute bottom-20 right-0 w-[80%] h-[30%] bg-rose-100/30 rounded-t-[100%] scale-x-150 translate-y-5" />

                            {/* Floating Lanterns */}
                            <div className="absolute top-[20%] left-[20%] animate-bounce delay-100 text-3xl">🏮</div>
                            <div className="absolute top-[15%] left-[70%] animate-bounce text-2xl opacity-70">🏮</div>
                        </div>
                    ))}
                    {/* Final Area Far Background - Grand Sunset Hill */}
                    <div className="w-screen h-full relative">
                        <div className="absolute bottom-20 left-0 w-full h-[60%] bg-rose-200/40 rounded-t-[100%] scale-x-150" />
                    </div>
                </div>
            </ParallaxLayer >

            {/* Near Background (Medium) - Detail Scenery */}
            < ParallaxLayer speed={- 0.6} offset={currentStageIndex * - 100} className="z-20" >
                <div className="flex w-[600vw] h-full items-end pb-20">
                    {stages.map((stage, i) => (
                        <div key={i} className="w-screen h-full relative">
                            {/* Heart Tree Left */}
                            <div className="absolute bottom-0 left-[15%] flex flex-col items-center">
                                <div className="text-6xl animate-pulse">🌳</div>
                                <div className="absolute -top-4 text-2xl">❤️</div>
                            </div>

                            {/* Romantic Street Lamp */}
                            <div className="absolute bottom-0 left-[45%] h-64 w-1 bg-gray-600">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-200 rounded-full blur-md animate-pulse shadow-[0_0_20px_rgba(253,224,71,0.8)]" />
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-gray-700 rounded-full" />
                            </div>

                            {/* Heart Tree Right */}
                            <div className="absolute bottom-0 right-[15%] flex flex-col items-center">
                                <div className="text-7xl">🌳</div>
                                <div className="absolute -top-6 text-3xl">💖</div>
                            </div>

                            {/* Flower Patches */}
                            <div className="absolute bottom-0 left-[30%] text-2xl">🌸🌷🌸</div>
                            <div className="absolute bottom-0 right-[35%] text-2xl">🌷🌸🌷</div>
                        </div>
                    ))}
                    {/* Final Area Near Background - The Royal Garden */}
                    <div className="w-screen h-full relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-20">
                            <div className="text-9xl mb-10 scale-x-[-1]">🏰</div>
                            <div className="text-9xl mb-10">🏰</div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full flex justify-around px-20">
                            <div className="text-5xl">🌹🌹🌹</div>
                            <div className="text-5xl">🌹🌹🌹</div>
                        </div>
                    </div>
                </div>
            </ParallaxLayer >

            {/* Ground/Main Layer (1:1 speed with camera) */}
            < div
                className="absolute inset-0 z-30 flex items-end transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                style={{ transform: `translate3d(${worldOffset}vw, 0, 0)` }}
            >
                {
                    stages.map((_, i) => (
                        <div key={i} className="min-w-screen h-20 bg-emerald-400 border-t-8 border-emerald-500 shadow-inner" />
                    ))
                }
                {/* Final Stage Ground */}
                <div className="min-w-screen h-20 bg-pink-300 border-t-8 border-pink-400 shadow-inner" />
            </div >

            {/* Characters container - fixed bottom, z-index above world ground */}
            < div className="absolute bottom-20 left-0 w-screen h-32 pointer-events-none z-40" >
                {/* Girl / Female Character - Moves forward with each stage */}
                < Character
                    type="girl"
                    isWalking={isWalking}
                    isHugging={isSuccess}
                    className="absolute bottom-0 transition-all duration-1000 ease-out"
                    style={{
                        left: isAtFinalArea ? (isSuccess ? '43vw' : '35vw') : `${10 + currentStageIndex * 12}vw`
                    }}
                />

                {/* Boy Character - Only appears and positions correctly in the final area */}
                <Character
                    type="boy"
                    isWalking={false}
                    isHugging={isSuccess}
                    className={`absolute bottom-0 transition-all duration-1000 ease-out ${isAtFinalArea ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        left: isAtFinalArea ? (isSuccess ? '50vw' : '55vw') : '100vw'
                    }}
                />

                {/* Kiss/Hug Effect (Hearts) */}
                {
                    isSuccess && (
                        <div className="absolute left-[50vw] bottom-40 -translate-x-1/2 flex gap-4 pointer-events-none">
                            <div className="text-4xl animate-bounce delay-100">❤️</div>
                            <div className="text-5xl animate-bounce">💖</div>
                            <div className="text-4xl animate-bounce delay-200">❤️</div>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default World;
