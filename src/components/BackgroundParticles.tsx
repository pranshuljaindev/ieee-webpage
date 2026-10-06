import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 650 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate randomized positions, colors, and velocities
  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#38bdf8'); // Sky 400
    const color2 = new THREE.Color('#00629b'); // IEEE Blue
    const color3 = new THREE.Color('#00d2ff'); // Electric Cyan
    const color4 = new THREE.Color('#ffffff'); // Starlight

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 12 - 2;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      orig[idx] = x;
      orig[idx + 1] = y;
      orig[idx + 2] = z;

      const rand = Math.random();
      const chosenColor =
        rand > 0.65 ? color1 : rand > 0.35 ? color3 : rand > 0.15 ? color2 : color4;

      col[idx] = chosenColor.r;
      col[idx + 1] = chosenColor.g;
      col[idx + 2] = chosenColor.b;
    }

    return [pos, col, orig];
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(56,189,248,0.8)');
      gradient.addColorStop(0.7, 'rgba(0,98,155,0.25)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Stable, self-driven organic cosmos drift - Zero cursor disturbance!
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Smooth, gentle planetary drift - rock-solid, no jerky cursor reaction
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.04;

    for (let i = 0; i < count; i += 4) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];

      posArray[idx + 1] = oy + Math.sin(time * 0.7 + ox * 0.3) * 0.15;
      posArray[idx] = ox + Math.cos(time * 0.5 + oy * 0.3) * 0.1;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.65}
        map={particleTexture || undefined}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const BackgroundParticles: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        <ParticleField count={650} />
      </Canvas>
      {/* Subtle radial depth overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
    </div>
  );
};
