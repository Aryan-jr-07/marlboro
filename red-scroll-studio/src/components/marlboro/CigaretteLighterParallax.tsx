import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import * as THREE from "three";

export const CigaretteLighterParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const labelMainRef = useRef<HTMLDivElement>(null);
  const labelSubRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x060403, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060403, 0.038);
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 300);
    camera.position.set(0, 0, 10);

    // --- CIGARETTE ---
    const cigGroup = new THREE.Group();
    scene.add(cigGroup);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf0ebe0, roughness: 0.9, metalness: 0 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 3.4, 48), bodyMat);
    cigGroup.add(body);

    const seamMat = new THREE.MeshStandardMaterial({ color: 0xddd8ce, roughness: 1 });
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.002, 3.4, 0.235), seamMat);
    seam.position.x = 0.115;
    cigGroup.add(seam);

    const wrinkleMat = new THREE.MeshStandardMaterial({ color: 0xe8e3d8, roughness: 1, metalness: 0 });
    for (let i = 0; i < 10; i++) {
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.1155, 0.1155, 0.007, 36), wrinkleMat);
      r.position.y = -1.5 + i * 0.35;
      cigGroup.add(r);
    }

    const filterMat = new THREE.MeshStandardMaterial({ color: 0xc2956a, roughness: 0.85, metalness: 0 });
    const filt = new THREE.Mesh(new THREE.CylinderGeometry(0.117, 0.117, 0.72, 48), filterMat);
    filt.position.y = -2.06;
    cigGroup.add(filt);

    const fcapMat = new THREE.MeshStandardMaterial({ color: 0xb88860, roughness: 0.9 });
    const fcap = new THREE.Mesh(new THREE.CircleGeometry(0.117, 36), fcapMat);
    fcap.rotation.x = -Math.PI / 2;
    fcap.position.y = -2.42;
    cigGroup.add(fcap);

    const corkMat = new THREE.MeshStandardMaterial({ color: 0xb88050, roughness: 0.9 });
    for (let i = 0; i < 5; i++) {
      const cr = new THREE.Mesh(new THREE.CylinderGeometry(0.118, 0.118, 0.009, 36), corkMat);
      cr.position.y = -1.74 + i * 0.13;
      cigGroup.add(cr);
    }

    const bandMat = new THREE.MeshStandardMaterial({ color: 0xbb2508, roughness: 0.45, metalness: 0.12 });
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.121, 0.121, 0.065, 48), bandMat);
    band.position.y = -1.71;
    cigGroup.add(band);

    const goldMat = new THREE.MeshStandardMaterial({ color: 0xbf9840, roughness: 0.18, metalness: 0.95 });
    [-1.688, -1.745].forEach((y) => {
      const g = new THREE.Mesh(new THREE.CylinderGeometry(0.1215, 0.1215, 0.022, 48), goldMat);
      g.position.y = y;
      cigGroup.add(g);
    });

    const tipMat = new THREE.MeshStandardMaterial({
      color: 0x3d3a34,
      roughness: 0.98,
      emissive: new THREE.Color(0, 0, 0),
      emissiveIntensity: 0,
      metalness: 0,
    });
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.115, 0.12, 36), tipMat);
    tip.position.y = 1.76;
    cigGroup.add(tip);

    const tobMat = new THREE.MeshStandardMaterial({ color: 0x4a4030, roughness: 0.98 });
    const tob = new THREE.Mesh(new THREE.CircleGeometry(0.112, 36), tobMat);
    tob.rotation.x = Math.PI / 2;
    tob.position.y = 1.705;
    cigGroup.add(tob);

    const ashMat = new THREE.MeshStandardMaterial({ color: 0x9a9890, roughness: 1, metalness: 0 });
    const ashCap = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.115, 0.22, 36), ashMat);
    ashCap.position.y = 1.82;
    ashCap.scale.y = 0;
    cigGroup.add(ashCap);

    const ashTopMat = new THREE.MeshStandardMaterial({ color: 0xb0aeaa, roughness: 1 });
    const ashTop = new THREE.Mesh(new THREE.CircleGeometry(0.07, 36), ashTopMat);
    ashTop.rotation.x = Math.PI / 2;
    ashTop.position.y = 1.935;
    ashTop.scale.set(0, 0, 0);
    cigGroup.add(ashTop);

    // --- ZIPPO LIGHTER ---
    const zippoGroup = new THREE.Group();
    scene.add(zippoGroup);
    zippoGroup.position.set(6, -3, 0);

    const bodyCase = new THREE.Group();
    zippoGroup.add(bodyCase);

    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 0.12, metalness: 0.96, envMapIntensity: 1.2 });
    const silverAccMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.08, metalness: 0.98 });
    const darkChromeMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.9 });

    const caseBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.0, 0.36), chromeMat);
    bodyCase.add(caseBody);

    const cRad = 0.055;
    [[-0.31, 0.0], [0.31, 0.0]].forEach(([x]) => {
      [-0.46, 0.46].forEach((y) => {
        const c = new THREE.Mesh(new THREE.CylinderGeometry(cRad, cRad, 1.0, 18), chromeMat);
        c.position.set(x, y < 0 ? -0.46 : 0.46, 0.0);
        bodyCase.add(c);
      });
    });

    const botCap = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.36), darkChromeMat);
    botCap.position.y = -0.53;
    bodyCase.add(botCap);

    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 16), darkChromeMat);
    hinge.rotation.x = Math.PI / 2;
    hinge.position.set(0, 0.46, 0.185);
    bodyCase.add(hinge);

    [-0.09, 0, 0.09].forEach((z) => {
      const rv = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.015, 12), silverAccMat);
      rv.rotation.x = Math.PI / 2;
      rv.position.set(0, 0.46, 0.185 + z);
      bodyCase.add(rv);
    });

    const lidCase = new THREE.Group();
    zippoGroup.add(lidCase);
    lidCase.position.y = 0.52;

    const lidBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.58, 0.36), chromeMat);
    lidBody.position.y = 0.29;
    lidCase.add(lidBody);

    [[-0.31, 0], [0.31, 0]].forEach(([x]) => {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(cRad, cRad, 0.58, 18), chromeMat);
      c.position.set(x, 0.29, 0);
      lidCase.add(c);
    });

    const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.36), darkChromeMat);
    topCap.position.y = 0.61;
    lidCase.add(topCap);

    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x555550, roughness: 0.5, metalness: 0.6 });
    const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.22, 16, 1, true), chimneyMat);
    chimney.position.set(0, 0.12, 0);
    lidCase.add(chimney);

    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(0.26, 0.52, 0.14);
    bodyCase.add(wheelGroup);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x666655, roughness: 0.7, metalness: 0.5 });
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.07, 20), wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheelGroup.add(wheel);

    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.07, 0.015), darkChromeMat);
      tooth.rotation.z = Math.PI / 2;
      tooth.position.set(0, Math.sin(ang) * 0.065, Math.cos(ang) * 0.065);
      wheelGroup.add(tooth);
    }

    const wickMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.98 });
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 8), wickMat);
    wick.position.set(0, 0.58, 0);
    lidCase.add(wick);

    // --- FLAME ---
    const flameGroup = new THREE.Group();
    flameGroup.position.set(0, 0.7, 0);
    flameGroup.visible = false;
    lidCase.add(flameGroup);

    const innerFlameMat = new THREE.MeshStandardMaterial({
      color: 0xddeeff,
      emissive: new THREE.Color(0.5, 0.8, 1),
      emissiveIntensity: 3,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.25, 12), innerFlameMat);
    innerFlame.position.y = 0.12;
    flameGroup.add(innerFlame);

    const midFlameMat = new THREE.MeshStandardMaterial({
      color: 0xffaa22,
      emissive: new THREE.Color(1, 0.45, 0.05),
      emissiveIntensity: 2.5,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const midFlame = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.38, 12), midFlameMat);
    midFlame.position.y = 0.18;
    flameGroup.add(midFlame);

    const outerFlameMat = new THREE.MeshStandardMaterial({
      color: 0xff4400,
      emissive: new THREE.Color(0.9, 0.18, 0),
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.52, 10), outerFlameMat);
    outerFlame.position.y = 0.24;
    flameGroup.add(outerFlame);

    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: new THREE.Color(0.6, 0.1, 0),
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), haloMat);
    halo.position.y = 0.22;
    flameGroup.add(halo);

    // --- LIGHTS ---
    const ambient = new THREE.AmbientLight(0x110804, 3.5);
    scene.add(ambient);

    const emberLight = new THREE.PointLight(0xff3300, 0, 6);
    scene.add(emberLight);

    const flameLight = new THREE.PointLight(0xff8822, 0, 12);
    scene.add(flameLight);

    const flameLightWide = new THREE.PointLight(0xff5500, 0, 18);
    scene.add(flameLightWide);

    const rimL = new THREE.DirectionalLight(0x4466aa, 0.8); rimL.position.set(-8, 3, 3); scene.add(rimL);
    const rimR = new THREE.DirectionalLight(0xff9944, 0.9); rimR.position.set(8, -1, 2); scene.add(rimR);
    const topLight = new THREE.DirectionalLight(0xffffff, 0.4); topLight.position.set(0, 10, 5); scene.add(topLight);

    // --- SMOKE ---
    const SMOKE_COUNT = 280;
    const sPos = new Float32Array(SMOKE_COUNT * 3);
    const sLife: number[] = [];
    const sSpd: number[] = [];
    const sDx: number[] = [];
    const sDz: number[] = [];

    const resetSmoke = (i: number, y = 1.9) => {
      sPos[i * 3] = (Math.random() - 0.5) * 0.12;
      sPos[i * 3 + 1] = y + Math.random() * 0.2;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
      sLife[i] = Math.random();
      sSpd[i] = 0.006 + Math.random() * 0.014;
      sDx[i] = (Math.random() - 0.5) * 0.003;
      sDz[i] = (Math.random() - 0.5) * 0.003;
    };

    for (let i = 0; i < SMOKE_COUNT; i++) resetSmoke(i, 1.9 + Math.random() * 3);
    const smokeGeo = new THREE.BufferGeometry();
    smokeGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const smokeMat = new THREE.PointsMaterial({
      color: 0xbbbbaa,
      size: 0.2,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const smokePS = new THREE.Points(smokeGeo, smokeMat);
    scene.add(smokePS);

    // --- SPARKS ---
    const SPARK_COUNT = 50;
    const spPos = new Float32Array(SPARK_COUNT * 3);
    const spV: { x: number; y: number; z: number; life: number }[] = [];

    const resetSpark = (i: number) => {
      spPos[i * 3] = 0; spPos[i * 3 + 1] = 1.78; spPos[i * 3 + 2] = 0;
      spV[i] = {
        x: (Math.random() - 0.5) * 0.022,
        y: 0.02 + Math.random() * 0.015,
        z: (Math.random() - 0.5) * 0.022,
        life: Math.random(),
      };
    };

    for (let i = 0; i < SPARK_COUNT; i++) resetSpark(i);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(spPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffaa44,
      size: 0.06,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const sparkPS = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPS);

    // --- HELPERS ---
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const phases = [
      { label: "The Cigarette", sub: "Scroll to begin" },
      { label: "The Lighter", sub: "A Zippo — classic, reliable" },
      { label: "Flick & Flame", sub: "Watch the thumb strike" },
      { label: "The Ignition", sub: "Flame meets tobacco" },
      { label: "First Burn", sub: "Marlboro. Since 1924" },
    ];

    let t = 0;
    let lidOpenAngle = 0;
    let wheelSpin = 0;
    let burnProgress = 0;
    let flameIntensity = 0;
    let ignitionFlash = 0;
    let currentPhase = -1;

    const setPhase = (p: number) => {
      if (p === currentPhase) return;
      currentPhase = p;
      if (dotsRef.current) {
        dotsRef.current.forEach((d, i) => d?.classList.toggle("bg-primary", i === p));
        dotsRef.current.forEach((d, i) => d?.classList.toggle("border-primary", i === p));
      }
      if (labelMainRef.current) labelMainRef.current.textContent = phases[p].label;
      if (labelSubRef.current) labelSubRef.current.textContent = phases[p].sub;
    };

    const animate = () => {
      t += 0.016;
      const sp = smoothProgress.get();

      if (progressBarRef.current) progressBarRef.current.style.width = `${sp * 100}%`;
      const phase = sp < 0.14 ? 0 : sp < 0.32 ? 1 : sp < 0.52 ? 2 : sp < 0.72 ? 3 : 4;
      setPhase(phase);
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = sp > 0.04 ? "0" : "1";

      // CIGARETTE TRANSFORM
      let cTX = 0, cTY = 0, cTRZ = 0.18, cTRY = 0;
      if (phase === 0) { cTX = 0; cTY = 0; cTRZ = 0.18; }
      else if (phase === 1) { cTX = -1.4; cTY = 0.2; cTRZ = 0.18; }
      else if (phase === 2) { cTX = -1.6; cTY = 0.5; cTRZ = Math.PI * 0.5 + 0.08; }
      else if (phase === 3) { cTX = -0.8; cTY = 0.4; cTRZ = Math.PI * 0.5; }
      else { cTX = 0; cTY = 0; cTRZ = 0.18; cTRY = t * 0.06; }

      cigGroup.position.x += (cTX - cigGroup.position.x) * 0.055;
      cigGroup.position.y += (cTY - cigGroup.position.y) * 0.055;
      cigGroup.rotation.z += (cTRZ - cigGroup.rotation.z) * 0.05;
      cigGroup.rotation.y += (cTRY - cigGroup.rotation.y) * 0.07;
      if (phase < 3) cigGroup.rotation.z += Math.sin(t * 0.4) * 0.007;

      // ZIPPO TRANSFORM
      let zTX, zTY, zRY = -0.4, zRX = 0.2;
      if (phase === 0) { zTX = 6; zTY = -3; }
      else if (phase === 1) {
        const t1 = smoothstep(0.14, 0.32, sp);
        zTX = lerp(6, 1.8, t1); zTY = lerp(-3, -0.6, t1);
      }
      else if (phase === 2) { zTX = 1.8; zTY = -0.6; }
      else if (phase === 3) {
        const t3 = smoothstep(0.52, 0.68, sp);
        zTX = lerp(1.8, -2.2, t3); zTY = lerp(-0.6, 0.4, t3);
        zRY = lerp(-0.4, -1.8, t3); zRX = lerp(0.2, 0.5, t3);
      }
      else {
        zTX = lerp(-2.2, 6, smoothstep(0.72, 0.95, sp));
        zTY = lerp(0.4, -3, smoothstep(0.72, 0.95, sp));
      }

      zippoGroup.position.x += (zTX - zippoGroup.position.x) * 0.06;
      zippoGroup.position.y += (zTY - zippoGroup.position.y) * 0.06;
      zippoGroup.rotation.x += (zRX - zippoGroup.rotation.x) * 0.06;
      zippoGroup.rotation.y += (zRY - zippoGroup.rotation.y) * 0.06;
      if (phase === 1) zippoGroup.rotation.x += Math.sin(t * 0.5) * 0.015;

      // LID OPEN
      let targetLidAngle = 0;
      if (phase >= 2 && phase <= 3) {
        const openT = smoothstep(0.32, 0.42, sp);
        targetLidAngle = lerp(0, -Math.PI * 0.85, openT);
        if (sp > 0.36 && sp < 0.44) wheelSpin += 0.4;
      } else if (phase === 4) {
        targetLidAngle = lerp(-Math.PI * 0.85, 0, smoothstep(0.76, 0.9, sp));
      }
      lidOpenAngle += (targetLidAngle - lidOpenAngle) * 0.08;
      lidCase.rotation.x = lidOpenAngle;
      wheel.rotation.y = wheelSpin;

      // FLAME
      const flameOn = sp > 0.38 && sp < 0.88;
      let targetFlameIntensity = 0;
      if (flameOn) {
        const ft = smoothstep(0.38, 0.44, sp);
        targetFlameIntensity = ft * (1 - smoothstep(0.82, 0.88, sp));
      }
      flameIntensity += (targetFlameIntensity - flameIntensity) * 0.1;
      flameGroup.visible = flameIntensity > 0.05;

      if (flameGroup.visible) {
        const ft = t;
        innerFlame.scale.set(0.85 + Math.sin(ft * 11) * 0.18, 0.8 + Math.sin(ft * 9) * 0.25, 0.85);
        midFlame.scale.set(0.82 + Math.sin(ft * 8) * 0.2, 0.75 + Math.sin(ft * 7) * 0.28, 0.82);
        outerFlame.scale.set(0.78 + Math.sin(ft * 6) * 0.22, 0.7 + Math.sin(ft * 5) * 0.3, 0.78);
        flameGroup.rotation.z = Math.sin(ft * 0.8) * 0.06;
        const flPos = new THREE.Vector3();
        flameGroup.getWorldPosition(flPos);
        flameLight.position.copy(flPos);
        flameLight.intensity = (3.5 + Math.sin(ft * 9) * 0.8) * flameIntensity;
        flameLightWide.position.copy(flPos);
        flameLightWide.intensity = (1.5 + Math.sin(ft * 7) * 0.3) * flameIntensity;
      } else {
        flameLight.intensity = 0; flameLightWide.intensity = 0;
      }

      // IGNITION & BURN
      const ignT = smoothstep(0.6, 0.72, sp);
      burnProgress += (ignT - burnProgress) * 0.035;
      if (sp > 0.61 && sp < 0.65) ignitionFlash = clamp(1 - (sp - 0.61) / 0.04, 0, 1);
      else ignitionFlash *= 0.92;

      tipMat.color.setHex(burnProgress > 0.3 ? 0xff4400 : 0x3d3a34);
      tipMat.emissive.setRGB(burnProgress * 0.9, burnProgress * 0.15, 0);
      tipMat.emissiveIntensity = burnProgress * (1 + Math.sin(t * 9) * 0.3) + ignitionFlash * 2;
      const tipWorldPos = new THREE.Vector3();
      tip.getWorldPosition(tipWorldPos);
      emberLight.position.copy(tipWorldPos);
      emberLight.intensity = burnProgress * (4 + Math.sin(t * 8) * 0.9) + ignitionFlash * 3;

      ashCap.scale.y = burnProgress;
      ashCap.position.y = 1.82 + (burnProgress - 1) * 0.11;
      ashTop.scale.set(burnProgress, burnProgress, burnProgress);

      // Smoke Update
      smokeMat.opacity = burnProgress * (0.22 + Math.sin(t * 0.6) * 0.05);
      const smokeArr = smokeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < SMOKE_COUNT; i++) {
        smokeArr[i * 3 + 1] += sSpd[i];
        smokeArr[i * 3] += sDx[i] + Math.sin(t * 1.2 + i * 0.3) * 0.0007;
        smokeArr[i * 3 + 2] += sDz[i] + Math.cos(t + i * 0.5) * 0.0005;
        sLife[i] += sSpd[i] * 0.18;
        if (sLife[i] > 1) {
          resetSmoke(i, tipWorldPos.y + 0.1);
          smokeArr[i * 3] = tipWorldPos.x + (Math.random() - 0.5) * 0.1;
          smokeArr[i * 3 + 2] = tipWorldPos.z + (Math.random() - 0.5) * 0.1;
        }
      }
      smokeGeo.attributes.position.needsUpdate = true;

      // Sparks Update
      sparkMat.opacity = burnProgress * 0.85;
      const spArr = sparkGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < SPARK_COUNT; i++) {
        spArr[i * 3] += spV[i].x; spArr[i * 3 + 1] += spV[i].y; spArr[i * 3 + 2] += spV[i].z;
        spV[i].y -= 0.0007; spV[i].life += 0.022;
        if (spV[i].life > 1) {
          resetSpark(i);
          spArr[i * 3] = tipWorldPos.x; spArr[i * 3 + 1] = tipWorldPos.y; spArr[i * 3 + 2] = tipWorldPos.z;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;

      camera.position.y = Math.sin(t * 0.18) * 0.15;
      camera.position.x = Math.sin(t * 0.13) * 0.07;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };

    window.addEventListener("resize", handleResize);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#060403]">
      <div id="sticky-scene" className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block w-full h-full" />
        
        {/* Accents */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-[140px] bg-gradient-to-b from-transparent via-primary to-transparent z-10" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-[140px] bg-gradient-to-b from-transparent via-primary to-transparent z-10" />

        {/* Brand Overlay */}
        <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-10 pointer-events-none z-10">
          <div className="w-12 h-12 border border-primary/80 rounded-full flex items-center justify-center font-serif text-xl text-primary mb-2">M</div>
          <div className="font-serif text-5xl font-bold tracking-[0.18em] uppercase text-white drop-shadow-[0_0_80px_rgba(200,50,20,0.6)]">
            Marlboro
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.35em] uppercase mt-1">Come to where the flavor is</div>
        </div>

        {/* Section Label */}
        <div className="absolute bottom-[75px] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <div ref={labelMainRef} className="font-serif text-2xl tracking-[0.12em] uppercase text-white/80 drop-shadow-[0_0_40px_rgba(200,50,20,0.4)]">
            The Cigarette
          </div>
          <div ref={labelSubRef} className="text-[9px] text-white/25 tracking-[0.25em] uppercase mt-1">
            Scroll to begin
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="w-1.5 h-1.5 rounded-full border border-white/25 bg-transparent transition-all duration-500"
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div ref={scrollHintRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5 transition-opacity duration-700">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/80 to-transparent animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div ref={progressBarRef} className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-orange-500 z-[100] w-0 transition-[width] duration-100 ease-linear" />
        
        {/* Footer */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/10 tracking-[0.16em] uppercase z-10 pointer-events-none whitespace-nowrap">
          Marlboro &copy; Philip Morris · Concept Only · 21+
        </div>
      </div>
    </div>
  );
};
