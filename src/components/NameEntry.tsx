
'use client';

import React, { useState } from 'react';

interface NameEntryProps {
    onComplete: (name: string) => void;
}

export default function NameEntry({ onComplete }: NameEntryProps) {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter your lovely name! 💖');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Save user to database
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Failed to save name');
            }

            const user = await response.json();
            // Pass the user ID back if needed, but for now just the name to start the game
            // We can store the ID in page.tsx state by modifying the callback signature if needed
            // But let's stick to the interface for now and handle the ID in page.tsx
            // Actually, page.tsx will need the ID to save responses. 
            // So onComplete should probably take the user object or ID.
            // Let's adjust the interface in page.tsx integration.
            // For now, let's return the name and let users handle the ID via the API result in page.tsx 
            // Wait, page.tsx calls this. So this component should probably just return the name 
            // OR handle the API call and return the user object.
            // The prompt said "save the name... then at the end with each stage save the question".
            // So better to return the full user object here.

            onComplete(JSON.stringify(user));

        } catch (err) {
            console.error(err);
            setError('Something went wrong... please try again! 🥺');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-pink-50/90 backdrop-blur-sm">
            <div className="w-full max-w-md p-8 mx-4">
                <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,105,180,0.2)] border border-white/50 text-center">
                    <h2 className="text-3xl font-bold text-pink-600 mb-6 drop-shadow-sm">
                        Welcome, beautiful! 🌸
                    </h2>
                    <p className="text-pink-500/80 mb-8 text-lg">
                        Before we begin this magical journey,<br />what should I call you?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name..."
                                className="w-full px-6 py-4 bg-white/50 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all text-pink-600 placeholder-pink-300 text-center text-xl font-medium"
                                disabled={isSubmitting}
                            />
                            <div className="absolute inset-0 rounded-2xl bg-pink-400/20 blur-xl -z-10 group-hover:bg-pink-400/30 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        </div>

                        {error && (
                            <div className="text-rose-500 text-sm font-medium animate-bounce">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                w-full py-4 rounded-2xl font-bold text-white text-xl shadow-lg
                                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                                ${isSubmitting
                                    ? 'bg-pink-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-pink-500 to-rose-400 hover:shadow-pink-300/50'
                                }
                            `}
                        >
                            {isSubmitting ? 'Saving...' : 'Start Journey ✨'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
