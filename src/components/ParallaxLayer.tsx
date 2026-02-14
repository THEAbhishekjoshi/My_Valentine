'use client';

import React from 'react';

interface ParallaxLayerProps {
    speed: number; // Factor to multiply distance by
    offset: number; // Current scroll offset
    children: React.ReactNode;
    className?: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ speed, offset, children, className = "" }) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none will-change-transform ${className}`}
            style={{
                transform: `translate3d(${offset * speed}px, 0, 0)`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            {children}
        </div>
    );
};

export default ParallaxLayer;
