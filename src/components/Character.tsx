'use client';

import React from 'react';

interface CharacterProps {
  type: 'girl' | 'boy';
  isWalking: boolean;
  isHugging?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Character: React.FC<CharacterProps> = ({ type, isWalking, isHugging, className = "", style }) => {
  const animationClass = isHugging
    ? (type === 'girl' ? 'animate-[hug-girl_2s_infinite]' : 'animate-[hug-boy_2s_infinite]')
    : (isWalking ? 'animate-bounce' : 'animate-pulse');

  return (
    <div className={`${className}`} style={style}>
      {/* Sprite Container */}
      <div className={`
        w-16 h-24 relative
        ${animationClass}
      `}>
        {/* Simple CSS-based Character */}
        <div className={`
          absolute inset-0 rounded-full 
          ${type === 'girl' ? 'bg-pink-400' : 'bg-blue-400'}
          border-4 border-white shadow-lg
        `}>
          {/* Eyes */}
          <div className="absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full" />
          <div className="absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full" />

          {/* Smile */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full" />

          {/* Accessory */}
          {type === 'girl' ? (
            <div className="absolute -top-2 -right-1 text-xl animate-spin-slow">🎀</div>
          ) : (
            <div className="absolute -top-2 left-1 text-xl">🧢</div>
          )}
        </div>

        {/* Feet */}
        <div className={`
          absolute -bottom-2 left-2 w-4 h-3 bg-gray-800 rounded-full
          ${isWalking ? 'animate-[walk-left_0.5s_infinite]' : ''}
        `} />
        <div className={`
          absolute -bottom-2 right-2 w-4 h-3 bg-gray-800 rounded-full
          ${isWalking ? 'animate-[walk-right_0.5s_infinite]' : ''}
        `} />
      </div>

      <style jsx>{`
        @keyframes walk-left {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px) translateX(-2px); }
        }
        @keyframes walk-right {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px) translateX(2px); }
        }
        @keyframes hug-girl {
          0%, 100% { transform: translateX(0) scale(1.05); }
          50% { transform: translateX(10px) scale(1.1); }
        }
        @keyframes hug-boy {
          0%, 100% { transform: translateX(0) scale(1.05); }
          50% { transform: translateX(-10px) scale(1.1); }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Character;
