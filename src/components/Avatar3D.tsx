/// <reference types="@react-three/fiber" />
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
    type: 'girl' | 'boy';
    isWalking: boolean;
    isHugging?: boolean;
}

// Simple 3D Female Avatar using primitives
function FemaleAvatar({ isWalking, isHugging }: { isWalking: boolean; isHugging?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);

    useFrame((state: RootState) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        if (!isWalking && !isHugging) {
            groupRef.current.position.y = Math.sin(time * 2) * 0.05;
        }

        if (isWalking && leftLegRef.current && rightLegRef.current && leftArmRef.current && rightArmRef.current) {
            const walkSpeed = 6;
            leftLegRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.6;
            rightLegRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.6;
            leftArmRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.4;
            rightArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.4;
            groupRef.current.position.y = Math.abs(Math.sin(time * walkSpeed * 2)) * 0.08;
        }

        if (isHugging && leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.x = -1.2;
            leftArmRef.current.rotation.z = 0.5;
            rightArmRef.current.rotation.x = -1.2;
            rightArmRef.current.rotation.z = -0.5;
            groupRef.current.position.y = Math.sin(time * 3) * 0.03;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            {/* Hair */}
            <mesh position={[0, 1.7, -0.1]}>
                <sphereGeometry args={[0.28, 32, 32]} />
                <meshStandardMaterial color="#5d3a1a" />
            </mesh>
            {/* Bow */}
            <mesh position={[0.15, 1.85, 0.1]} rotation={[0.4, 0, 0.4]}>
                <torusGeometry args={[0.08, 0.03, 12, 24]} />
                <meshStandardMaterial color="#ff69b4" />
            </mesh>
            {/* Body - Dress */}
            <mesh position={[0, 0.9, 0]}>
                <coneGeometry args={[0.35, 1.0, 32]} />
                <meshStandardMaterial color="#ff1493" />
            </mesh>
            {/* Arms & Legs (Simplified) */}
            <mesh ref={leftArmRef} position={[-0.3, 1.2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            <mesh ref={rightArmRef} position={[0.3, 1.2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            <mesh ref={leftLegRef} position={[-0.15, 0.35, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.7]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            <mesh ref={rightLegRef} position={[0.15, 0.35, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.7]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
        </group>
    );
}

// Simple 3D Male Avatar using primitives
function MaleAvatar({ isWalking, isHugging }: { isWalking: boolean; isHugging?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);

    useFrame((state: RootState) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        if (!isWalking && !isHugging) {
            groupRef.current.position.y = Math.sin(time * 1.8) * 0.04;
        }

        if (isWalking && leftLegRef.current && rightLegRef.current && leftArmRef.current && rightArmRef.current) {
            const walkSpeed = 6;
            leftLegRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.6;
            rightLegRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.6;
            leftArmRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.4;
            rightArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.4;
            groupRef.current.position.y = Math.abs(Math.sin(time * walkSpeed * 2)) * 0.08;
        }

        if (isHugging && leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.x = -1.2;
            leftArmRef.current.rotation.z = -0.5;
            rightArmRef.current.rotation.x = -1.2;
            rightArmRef.current.rotation.z = 0.5;
            groupRef.current.position.y = Math.sin(time * 3) * 0.03;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.26, 32, 32]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            {/* Hair - Short Spiky */}
            <mesh position={[0, 1.75, 0]}>
                <sphereGeometry args={[0.27, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#2c1810" />
            </mesh>
            {/* Body - T-shirt & Pants style */}
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[0.5, 0.7, 0.25]} />
                <meshStandardMaterial color="#4169e1" />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[0.48, 0.4, 0.24]} />
                <meshStandardMaterial color="#2c3e50" />
            </mesh>
            {/* Arms & Legs */}
            <mesh ref={leftArmRef} position={[-0.35, 1.15, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.65]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            <mesh ref={rightArmRef} position={[0.35, 1.15, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.65]} />
                <meshStandardMaterial color="#ffd4a3" />
            </mesh>
            <mesh ref={leftLegRef} position={[-0.15, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.7]} />
                <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh ref={rightLegRef} position={[0.15, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.7]} />
                <meshStandardMaterial color="#2c3e50" />
            </mesh>
        </group>
    );
}

export default function Avatar3D({ type, isWalking, isHugging }: Avatar3DProps) {
    return (
        <div className="w-full h-full min-w-[120px] min-h-[160px]">
            <Canvas shadows camera={{ position: [0, 1.2, 4], fov: 40 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {type === 'girl' ? (
                    <FemaleAvatar isWalking={isWalking} isHugging={isHugging} />
                ) : (
                    <MaleAvatar isWalking={isWalking} isHugging={isHugging} />
                )}

                {/* Visual Floor Shadow Placeholder */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                    <planeGeometry args={[2, 2]} />
                    <meshStandardMaterial transparent opacity={0.1} color="black" />
                </mesh>
            </Canvas>
        </div>
    );
}

