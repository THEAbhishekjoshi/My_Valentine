'use client';

import React, { useEffect, useState } from 'react';

const FloatingParticles = () => {
    const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; type: string }>>([]);

    useEffect(() => {
        // creating a fixed set of particles to avoid hydration mismatches, but animating them with random values
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // vw
            delay: Math.random() * 5, // s
            duration: 5 + Math.random() * 5, // s
            type: Math.random() > 0.5 ? '🌸' : '❤️', // mix of petals and hearts
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute top-[-5%] text-xl opacity-60 animate-fall"
                    style={{
                        left: `${p.left}vw`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                >
                    {p.type}
                </div>
            ))}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(20px);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
};

export default FloatingParticles;
