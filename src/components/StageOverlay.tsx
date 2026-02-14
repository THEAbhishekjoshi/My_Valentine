'use client';

import React from 'react';
import { Stage } from '@/lib/data';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

interface StageOverlayProps {
    stage: Stage;
    onOptionSelect: (value: string) => void;
    isTransitioning: boolean;
    className?: string;
}

const StageOverlay: React.FC<StageOverlayProps> = ({
    stage,
    onOptionSelect,
    isTransitioning,
    className = ""
}) => {
    // We'll track if the typing is done to show hidden options
    const [isTypingComplete, setIsTypingComplete] = React.useState(false);

    // Reset when stage changes
    React.useEffect(() => {
        setIsTypingComplete(false);
    }, [stage]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={stage.question}
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`fixed top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 ${className}`}
            >
                <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    glareColor="#ff69b4"
                    glarePosition="all"
                    scale={1.02}
                    transitionSpeed={1000}
                >
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(255,105,180,0.3)] border-4 border-pink-200">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-pink-600 mb-2 text-center min-h-16 flex items-center justify-center">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .changeDelay(40)
                                        .typeString(stage.question)
                                        .callFunction(() => {
                                            setIsTypingComplete(true);
                                        })
                                        .start();
                                }}
                                key={stage.question} // Force re-render on new question
                            />
                        </h2>

                        <AnimatePresence>
                            {stage.dialogue && isTypingComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="text-rose-400 text-center mb-6 italic text-lg">
                                        "{stage.dialogue}"
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isTypingComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex flex-wrap justify-center gap-6"
                                >
                                    {stage.options.map((option, index) => (
                                        <motion.button
                                            key={option.value}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95, y: 0 }}
                                            onClick={() => onOptionSelect(option.value)}
                                            disabled={isTransitioning}
                                            className={`
                                                relative px-8 py-4 rounded-2xl font-black text-xl transition-all duration-200
                                                group overflow-hidden
                                                ${isTransitioning
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-95'
                                                    : 'bg-linear-to-br from-pink-400 to-rose-500 text-white shadow-[0_4px_0_rgb(190,24,93)] active:shadow-none active:translate-y-[4px]'
                                                }
                                            `}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {option.label}
                                            </span>
                                            {!isTransitioning && (
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-2xl" />
                                            )}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Tilt>
            </motion.div>
        </AnimatePresence>
    );
};

export default StageOverlay;
