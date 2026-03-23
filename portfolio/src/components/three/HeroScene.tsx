'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useRef, useMemo, useEffect, Suspense } from 'react';

/* ─── Morphing Energy Sphere ───────────────────────────── */
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.8, 128, 128]} />
      <MeshDistortMaterial
        color="#3730a3"
        distort={0.55}
        speed={2.2}
        roughness={0.08}
        metalness={0.9}
        envMapIntensity={1.2}
        emissive="#1e1b4b"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ─── Particle shader — supports per-particle dimming via aDim ── */
const VERT = `
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aDim;
  varying   vec3  vColor;
  varying   float vDim;

  void main() {
    vColor = aColor;
    vDim   = aDim;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (80.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const FRAG = `
  varying vec3  vColor;
  varying float vDim;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.1, 0.5, d);
    gl_FragColor = vec4(vColor, a * 0.75 * vDim);
  }
`;

const PALETTE = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#e0e7ff'),
  new THREE.Color('#c7d2fe'),
  new THREE.Color('#a5b4fc'),
  new THREE.Color('#818cf8'),
  new THREE.Color('#67e8f9'),
  new THREE.Color('#a5f3fc'),
];

const STAR_PALETTE = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#e0e7ff'),
  new THREE.Color('#c7d2fe'),
];

/* ─── Physics constants — slow, smooth, gentle ────────── */
const REPEL_STRENGTH   = 0.06;   // gentle push
const SPRING           = 0.022;  // slow spring-back
const DAMPING          = 0.92;   // high damping → smooth, no bounce
const SCREEN_RADIUS    = 0.35;   // interaction zone in NDC units (35% of half-screen)
const BG_STRENGTH_MULT = 0.35;   // background stars get 35% force — subtle ripple

const FOREGROUND = 1200;
const BACKGROUND = 800;

function TinyParticles({ count = FOREGROUND + BACKGROUND }: { count?: number }) {
  const ref        = useRef<THREE.Points>(null);
  const mouseNDC   = useRef(new THREE.Vector2(9999, 9999)); // screen-space (NDC) mouse
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 9999)); // world-space mouse (for force direction)
  const { camera, gl } = useThree();

  /* Build geometry: foreground (close, bright) + background (distant, dim) tiers */
  const { geo, mat, basePos, vel } = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const sizes  = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const dims   = new Float32Array(count);
    const base   = new Float32Array(count * 3);
    const v      = new Float32Array(count * 3); // velocities, zero-init

    for (let i = 0; i < count; i++) {
      const isFg = i < FOREGROUND;

      const r     = isFg
        ? 4.5 + Math.random() * 8     // foreground: r ∈ [4.5, 12.5]
        : 15  + Math.random() * 65;   // background: r ∈ [15, 80]
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i*3]   = base[i*3]   = x;
      pos[i*3+1] = base[i*3+1] = y;
      pos[i*3+2] = base[i*3+2] = z;

      sizes[i] = isFg
        ? 0.3 + Math.random() * 0.5
        : 0.08 + Math.random() * 0.17;

      const palette = isFg ? PALETTE : STAR_PALETTE;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i*3]   = c.r;
      colors[i*3+1] = c.g;
      colors[i*3+2] = c.b;

      dims[i] = isFg ? 1.0 : 0.35 + Math.random() * 0.25;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos,    3));
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes,  1));
    g.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aDim',     new THREE.BufferAttribute(dims,   1));

    const m = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
    });

    return { geo: g, mat: m, basePos: base, vel: v };
  }, [count]);

  /* Track mouse in both NDC (for distance check) and world (for force direction) */
  useEffect(() => {
    const canvas = gl.domElement;
    const ray    = new THREE.Raycaster();
    const plane  = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ndcX =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const ndcY = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

      // NDC stored for screen-space distance check
      mouseNDC.current.set(ndcX, ndcY);

      // World position (z=0 plane) stored for force direction
      ray.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const hit = new THREE.Vector3();
      if (ray.ray.intersectPlane(plane, hit)) mouseWorld.current.copy(hit);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [camera, gl]);

  /* Spring physics — screen-space interaction check, local-space force */
  useFrame(({ clock }) => {
    if (!ref.current) return;

    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const cur = posAttr.array as Float32Array;

    /*
     * Screen-space (NDC) approach:
     * ─────────────────────────────
     * Instead of checking 3D or 2D world-space distance (which fails for background
     * particles and breaks as the cloud rotates), we project each particle to NDC
     * and compare against the mouse NDC. This guarantees every VISIBLE particle
     * responds uniformly regardless of depth or rotation angle.
     *
     * MVP is computed ONCE per frame, then applied manually per particle (column-major).
     * For force direction we still use local-space mouse position (correct in any frame).
     */
    camera.updateMatrixWorld();
    ref.current.updateMatrixWorld();
    const mvp = new THREE.Matrix4()
      .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      .multiply(ref.current.matrixWorld);
    const e = mvp.elements; // column-major flat array

    // Local-space mouse — for force direction only (not for distance check)
    const localMouse = ref.current.worldToLocal(mouseWorld.current.clone());
    const mx = localMouse.x, my = localMouse.y, mz = localMouse.z;

    const mnx = mouseNDC.current.x;
    const mny = mouseNDC.current.y;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const lx = cur[i3], ly = cur[i3+1], lz = cur[i3+2];

      // Project particle local position to clip space via MVP
      const cx = e[0]*lx + e[4]*ly + e[8]*lz  + e[12];
      const cy = e[1]*lx + e[5]*ly + e[9]*lz  + e[13];
      const cw = e[3]*lx + e[7]*ly + e[11]*lz + e[15];

      if (cw > 0) { // particle is in front of camera
        const sx = cx / cw; // NDC x
        const sy = cy / cw; // NDC y
        const sdx = sx - mnx;
        const sdy = sy - mny;
        const sdist = Math.sqrt(sdx*sdx + sdy*sdy) || 0.001;

        if (sdist < SCREEN_RADIUS) {
          // Background particles get a gentler nudge (subtle ripple effect)
          const isBg = i >= FOREGROUND;
          const str  = REPEL_STRENGTH * (isBg ? BG_STRENGTH_MULT : 1.0);
          const force = (1 - sdist / SCREEN_RADIUS) * str;

          // Force direction: push particle away from local mouse position
          const dx = lx - mx, dy = ly - my, dz = lz - mz;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz) || 0.001;
          vel[i3]   += (dx / dist) * force;
          vel[i3+1] += (dy / dist) * force;
          vel[i3+2] += (dz / dist) * force * 0.3;
        }
      }

      // Spring back toward base position (slow)
      vel[i3]   += (basePos[i3]   - lx) * SPRING;
      vel[i3+1] += (basePos[i3+1] - ly) * SPRING;
      vel[i3+2] += (basePos[i3+2] - lz) * SPRING;

      // Damping (high → smooth, barely any oscillation)
      vel[i3]   *= DAMPING;
      vel[i3+1] *= DAMPING;
      vel[i3+2] *= DAMPING;

      cur[i3]   += vel[i3];
      cur[i3+1] += vel[i3+1];
      cur[i3+2] += vel[i3+2];
    }

    posAttr.needsUpdate = true;

    ref.current.rotation.y = clock.elapsedTime * 0.014;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.006) * 0.04;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* ─── Fullscreen Particle Canvas (fixed, behind everything) */
export function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      performance={{ min: 0.5 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <TinyParticles count={FOREGROUND + BACKGROUND} />
    </Canvas>
  );
}

/* ─── Sphere Scene — transparent background ────────────── */
function Scene() {
  const isMobile = typeof window !== 'undefined' && window.navigator.maxTouchPoints > 0;

  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[-3, 3, 2]} intensity={3}   color="#6366f1" distance={14} decay={2} />
      <pointLight position={[4, -2, -3]} intensity={1.5} color="#4f46e5" distance={10} decay={2} />
      <pointLight position={[0, 4, 2]}   intensity={1}   color="#818cf8" distance={8}  decay={2} />

      <Suspense fallback={null}>
        <MorphingSphere />
        <Environment preset="studio" background={false} />
      </Suspense>

      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={1.15} />
        </EffectComposer>
      )}
    </>
  );
}

/* ─── Export ───────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      performance={{ min: 0.5 }}
    >
      <Scene />
    </Canvas>
  );
}
