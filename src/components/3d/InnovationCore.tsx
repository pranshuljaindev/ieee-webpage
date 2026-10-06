import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';

export const InnovationCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Camera distance at 8.2 ensures all rings fit fully with generous margins, never clipping or hiding behind text
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    // 2. Vibrant Multi-Color Point & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1030, 2.2);
    scene.add(ambientLight);

    const magentaLight = new THREE.PointLight(0xec4899, 4.5, 30);
    magentaLight.position.set(-5, 4, 5);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 4.0, 30);
    cyanLight.position.set(5, 3, 5);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3.5, 25);
    amberLight.position.set(0, -4, 4);
    scene.add(amberLight);

    const coreLight = new THREE.PointLight(0xa855f7, 4.0, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 3. Central Pivot Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // -------------------------------------------------------------
    // CLASSIC 3D PLANET / CORE GEOMETRY (The beloved original design)
    // -------------------------------------------------------------
    
    // Inner Solid Core Sphere (Deep Violet with vibrant emissive glow)
    const coreSphereGeo = new THREE.SphereGeometry(0.78, 32, 32);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0x581c87,
      emissive: 0xc084fc,
      emissiveIntensity: 1.3,
      roughness: 0.15,
      metalness: 0.9,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    masterGroup.add(coreSphere);

    // Middle Geometric Icosahedron Lattice (Electric Cyan wireframe)
    const icosaGeo = new THREE.IcosahedronGeometry(1.30, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const icosaMesh = new THREE.Mesh(icosaGeo, icosaMat);
    masterGroup.add(icosaMesh);

    // Outer Geometric Cage Lattice (Neon Hot Pink wireframe)
    const icosaOuterGeo = new THREE.IcosahedronGeometry(1.72, 0);
    const icosaOuterMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const icosaOuterMesh = new THREE.Mesh(icosaOuterGeo, icosaOuterMat);
    masterGroup.add(icosaOuterMesh);

    // Bright Amber Vertex Beacons
    const nodePointsMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.12,
      transparent: true,
      opacity: 0.95,
    });
    const nodePoints = new THREE.Points(icosaGeo, nodePointsMat);
    masterGroup.add(nodePoints);

    // -------------------------------------------------------------
    // MULTI-AXIS GIMBAL RINGS (Scaled comfortably within bounds)
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    const createGimbalRing = (radius: number, tube: number, colorHex: number, tiltX: number, tiltY: number) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, isMobile ? 48 : 80);
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tiltX;
      mesh.rotation.y = tiltY;
      return mesh;
    };

    // Beautifully proportioned so they never reach outside the canvas or behind text
    const ring1 = createGimbalRing(1.80, 0.030, 0xec4899, Math.PI / 4, Math.PI / 6);   // Hot Pink
    const ring2 = createGimbalRing(2.18, 0.024, 0x8b5cf6, -Math.PI / 3, Math.PI / 4);  // Violet
    const ring3 = createGimbalRing(2.52, 0.018, 0x06b6d4, Math.PI / 2.5, -Math.PI / 5); // Cyan

    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    ringsGroup.add(ring3);

    // Glowing Orbital Satellites on Ring Rails
    const satGeo = new THREE.SphereGeometry(0.10, 16, 16);

    // Satellite 1 (Solar Gold)
    const sat1Mat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.0,
    });
    const sat1 = new THREE.Mesh(satGeo, sat1Mat);

    // Satellite 2 (Cyber Emerald)
    const sat2Mat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 2.0,
    });
    const sat2 = new THREE.Mesh(satGeo, sat2Mat);

    // Satellite 3 (Hot Pink)
    const sat3Mat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      emissive: 0xec4899,
      emissiveIntensity: 2.0,
    });
    const sat3 = new THREE.Mesh(satGeo, sat3Mat);

    ringsGroup.add(sat1);
    ringsGroup.add(sat2);
    ringsGroup.add(sat3);

    // -------------------------------------------------------------
    // MULTI-COLOR STARDUST GALAXY PARTICLE CLOUD
    // -------------------------------------------------------------
    const particleCount = isMobile ? 180 : 380;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cMagenta = new THREE.Color(0xf43f5e);
    const cViolet = new THREE.Color(0xa855f7);
    const cCyan = new THREE.Color(0x06b6d4);
    const cEmerald = new THREE.Color(0x10b981);
    const cAmber = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const rand = Math.random();
      const mixed =
        rand > 0.8
          ? cMagenta
          : rand > 0.6
          ? cViolet
          : rand > 0.4
          ? cCyan
          : rand > 0.2
          ? cEmerald
          : cAmber;

      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particleGeo, particlesMat);
    scene.add(particleSystem);

    // Cursor tracking with gentle lerp
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseTargetX = Math.max(-1, Math.min(1, relX)) * 0.35;
      mouseTargetY = Math.max(-1, Math.min(1, relY)) * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Interactive click pulse on planet
    const handleContainerClick = () => {
      audioEngine.playModeSwitch();
      coreSphereMat.emissiveIntensity = 3.5;
      setTimeout(() => {
        coreSphereMat.emissiveIntensity = 1.3;
      }, 350);
    };

    container.addEventListener('click', handleContainerClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // EXACT ORIGINAL ANIMATION LOOP (Preserved 100%)
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Cursor smooth tilt interpolation
        mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.05;
        mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.05;

        // Hypnotic planet core rotation + gentle cursor response
        masterGroup.rotation.y = elapsedTime * 0.28 + mouseCurrentX;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.16) * 0.18 - mouseCurrentY;

        // Real-time audio reactive pulse
        const audioLevel = audioEngine.getAverageAudioLevel();
        const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.05 + audioLevel * 0.15;
        coreSphere.scale.set(pulse, pulse, pulse);

        // Counter-rotating gimbal rings (The exact animation user loved)
        ring1.rotation.z = elapsedTime * 0.5;
        ring2.rotation.z = -elapsedTime * 0.38;
        ring3.rotation.z = elapsedTime * 0.28;

        // Orbital satellites
        sat1.position.set(
          Math.cos(elapsedTime * 1.4) * 1.80,
          Math.sin(elapsedTime * 1.4) * 1.80 * Math.sin(Math.PI / 4),
          Math.sin(elapsedTime * 1.4) * 1.80 * Math.cos(Math.PI / 4)
        );

        sat2.position.set(
          Math.cos(elapsedTime * 1.0 + 2) * 2.18 * Math.cos(-Math.PI / 3),
          Math.sin(elapsedTime * 1.0 + 2) * 2.18,
          Math.cos(elapsedTime * 1.0 + 2) * 2.18 * Math.sin(-Math.PI / 3)
        );

        sat3.position.set(
          Math.cos(elapsedTime * 0.8 + 4) * 2.52,
          Math.sin(elapsedTime * 0.8 + 4) * 2.52 * Math.sin(Math.PI / 2.5),
          Math.sin(elapsedTime * 0.8 + 4) * 2.52 * Math.cos(Math.PI / 2.5)
        );

        // Subtle particle cloud drift
        particleSystem.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      if (container) {
        container.removeEventListener('click', handleContainerClick);
      }
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreSphereGeo.dispose();
      icosaGeo.dispose();
      icosaOuterGeo.dispose();
      satGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative pointer-events-none">
        <div className="w-64 h-64 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-pink-400/40 animate-spin [animation-duration:12s]" />
          <div className="absolute inset-4 rounded-full border border-purple-500/50 animate-spin [animation-duration:8s] [animation-direction:reverse]" />
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-400 shadow-xl shadow-pink-500/50 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-white tracking-widest">CORE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] lg:min-h-[500px] flex items-center justify-center cursor-pointer select-none"
      title="Interactive 3D Innovation Core · Click to trigger energy pulse"
    />
  );
};
