'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * The 3D aluminium cross — the WebGL payoff after the line-draw and red
 * fill in V3EditorialStack. Brushed-aluminium PBR material tinted red so
 * it reads as "the drawn mark made real".
 *
 * Lazy-imported on `/v3` only; the rest of the site ships zero `three`
 * bytes.
 */
export function V3AluminiumCross({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
      >
        {/* Studio-style three-point setup. No HDRI — pure light rig so the
            metallic reflections come from the directional + rim lights. */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#7488a5" />
        <pointLight position={[0, 0, 3]} intensity={1.0} color="#ffdcdc" />
        <CrossMesh />
      </Canvas>
    </div>
  );
}

/** Build the cross shape in THREE.Shape (THREE uses Y+ up, we trace the
 *  SVG path with Y flipped: 100 - svgY). */
function buildCrossShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(32, 100);
  s.lineTo(68, 100);
  s.lineTo(68, 76);
  s.quadraticCurveTo(68, 68, 76, 68);
  s.lineTo(100, 68);
  s.lineTo(100, 32);
  s.lineTo(76, 32);
  s.quadraticCurveTo(68, 32, 68, 24);
  s.lineTo(68, 0);
  s.lineTo(32, 0);
  s.lineTo(32, 24);
  s.quadraticCurveTo(32, 32, 24, 32);
  s.lineTo(0, 32);
  s.lineTo(0, 68);
  s.lineTo(24, 68);
  s.quadraticCurveTo(32, 68, 32, 76);
  s.closePath();
  return s;
}

function CrossMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();
  const reduced = useReducedMotionSafe();

  const geometry = useMemo(() => {
    const shape = buildCrossShape();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 14,
      bevelEnabled: true,
      bevelThickness: 1.2,
      bevelSize: 1.0,
      bevelSegments: 4,
      curveSegments: 18,
    });
    // Centre the geometry (shape spans 0..100 in each axis).
    geom.translate(-50, -50, -7);
    // Scale to fit our scene (camera at z=4.2, fov 38).
    geom.scale(0.022, 0.022, 0.022);
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (!reduced) {
      // Slow ambient rotation
      meshRef.current.rotation.y += delta * 0.22;
      // Damped mouse-parallax tilt
      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        -mouse.y * 0.2,
        4,
        delta,
      );
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#FE1116"
        metalness={0.85}
        roughness={0.32}
        envMapIntensity={1.0}
      />
    </mesh>
  );
}
