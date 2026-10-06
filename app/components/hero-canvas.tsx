'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float softNoise(vec2 p) {
    return sin(p.x * 2.6 + sin(p.y * 3.1 + uTime * 0.08)) * 0.05
      + sin(p.y * 5.0 - uTime * 0.12) * 0.035;
  }

  void main() {
    vec2 uv = vUv;
    vec3 burgundy = vec3(0.25, 0.035, 0.12);
    vec3 peach = vec3(0.78, 0.38, 0.40);
    vec3 blush = vec3(0.95, 0.68, 0.64);
    vec3 sky = vec3(0.42, 0.62, 0.72);
    float drift = sin(uTime * 0.12) * 0.035;
    float peachMix = smoothstep(0.03, 0.62, uv.y + uv.x * 0.14 + drift);
    vec3 color = mix(burgundy, peach, peachMix);
    color = mix(color, blush, smoothstep(0.36, 0.85, uv.y) * 0.32);
    color = mix(color, sky, smoothstep(0.66, 1.0, uv.x) * 0.13);
    color += softNoise(uv * 4.0);
    float vignette = smoothstep(1.05, 0.16, distance(uv, vec2(0.5)));
    color *= 0.76 + vignette * 0.34;
    gl_FragColor = vec4(color, 0.88);
  }
`;

function ShaderPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh scale={[1.7, 1.15, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
      />
    </mesh>
  );
}

function PetalField() {
  const group = useRef<THREE.Group>(null);
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        x: ((index * 37) % 100) / 50 - 1,
        y: ((index * 61) % 100) / 55 - 0.9,
        z: -0.25 + (index % 4) * 0.04,
        size: 0.018 + (index % 3) * 0.01,
        rotation: (index * 0.72) % Math.PI,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.16) * 0.035;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.015;
  });

  return (
    <group ref={group}>
      {petals.map((petal, index) => (
        <mesh key={index} position={[petal.x, petal.y, petal.z]} rotation={[0, 0, petal.rotation]}>
          <circleGeometry args={[petal.size, 12]} />
          <meshBasicMaterial color={index % 4 === 0 ? '#8b2442' : '#f6c7be'} transparent opacity={0.42} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setEnabled(Boolean(context));
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 1], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ShaderPlane />
      <PetalField />
    </Canvas>
  );
}
