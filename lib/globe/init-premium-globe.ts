import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLOBE_CITIES, GLOBE_CONNECTION_PAIRS } from "./cities";

export type GlobeCardElements = {
  card: HTMLElement;
  cardCity: HTMLElement;
  cardTitle: HTMLElement;
  cardInsight: HTMLElement;
  cardCoord: HTMLElement;
};

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function createFallbackTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 512, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "#000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);
  return new THREE.CanvasTexture(canvas);
}

export function initPremiumGlobe(
  container: HTMLElement,
  ui: GlobeCardElements,
): () => void {
  const cities = GLOBE_CITIES;
  const scene = new THREE.Scene();

  const getSize = () => ({
    w: Math.max(container.offsetWidth, 1),
    h: Math.max(container.offsetHeight, 1),
  });

  let { w, h } = getSize();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(0, 0.5, 3.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.enableZoom = false;
  controls.minDistance = 3.2;
  controls.maxDistance = 3.2;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.215625;
  controls.enablePan = false;
  controls.rotateSpeed = 0.4;
  controls.zoomSpeed = 0;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.8;

  const ambientLight = new THREE.AmbientLight(0x1a2a5a, 0.4);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xc8d8ff, 1.8);
  sunLight.position.set(5, 3, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.bias = -0.001;
  sunLight.shadow.normalBias = 0.02;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x4a6fff, 0.6);
  rimLight.position.set(-3, 1, -3);
  scene.add(rimLight);

  const bottomFill = new THREE.PointLight(0x0a1a40, 0.3, 10);
  bottomFill.position.set(0, -3, 0);
  scene.add(bottomFill);

  const textureLoader = new THREE.TextureLoader();
  const dayTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    undefined,
    undefined,
    () => {
      earthMaterial.map = createFallbackTexture("#0a1a3a");
    },
  );
  const nightTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png",
  );
  const normalTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
  );
  const specularTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  );

  const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: dayTexture,
    specularMap: specularTexture,
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(0.6, 0.6),
    shininess: 15,
    specular: new THREE.Color(0x1a2a5a),
    emissiveMap: nightTexture,
    emissive: new THREE.Color(0x334488),
    emissiveIntensity: 0.35,
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.castShadow = true;
  earth.receiveShadow = true;
  scene.add(earth);

  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      uniform vec3 lightDirection;
      uniform float time;
      void main() {
        float rim = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
        float lightFace = max(0.0, dot(normalize(vWorldPos), lightDirection));
        vec3 col = mix(vec3(0.08, 0.18, 0.55), vec3(0.2, 0.45, 0.95), lightFace * 0.5);
        col += vec3(0.04, 0.08, 0.2) * sin(time * 0.3) * 0.3;
        gl_FragColor = vec4(col, 1.0) * rim;
      }
    `,
    uniforms: {
      lightDirection: {
        value: new THREE.Vector3(1, 0.5, 1).normalize(),
      },
      time: { value: 0 },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
  });
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.018, 64, 64),
    atmosphereMaterial,
  );
  scene.add(atmosphere);

  const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
        gl_FragColor = vec4(0.12, 0.3, 0.8, 1.0) * intensity * 0.25;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.06, 48, 48), glowMaterial));

  const cloudsTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  );
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.008, 64, 64),
    new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
      color: 0x6688bb,
      blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(clouds);

  const gridOverlay = new THREE.Mesh(
    new THREE.SphereGeometry(1.003, 80, 40),
    new THREE.MeshBasicMaterial({
      color: 0x2244aa,
      wireframe: true,
      transparent: true,
      opacity: 0.025,
      depthWrite: false,
    }),
  );
  scene.add(gridOverlay);

  const starsGeometry = new THREE.BufferGeometry();
  const starsVertices: number[] = [];
  const starsColors: number[] = [];
  for (let i = 0; i < 12000; i++) {
    starsVertices.push(
      (Math.random() - 0.5) * 1600,
      (Math.random() - 0.5) * 1600,
      (Math.random() - 0.5) * 1600,
    );
    const c = new THREE.Color();
    c.setHSL(0.6 + Math.random() * 0.1, 0.3, 0.5 + Math.random() * 0.4);
    starsColors.push(c.r, c.g, c.b);
  }
  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starsVertices, 3),
  );
  starsGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(starsColors, 3),
  );
  const starsMaterial = new THREE.PointsMaterial({
    size: 0.015,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    vertexColors: true,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  const GLOBE_RADIUS = 1.0;
  const cityGroup = new THREE.Group();
  scene.add(cityGroup);

  const mouse = new THREE.Vector2();
  let pointerX = 0;
  let pointerY = 0;

  const markerVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const markerFragmentShader = `
    varying vec2 vUv;
    uniform float pulse;
    uniform float hover;
    void main() {
      float dist = distance(vUv, vec2(0.5));
      float core = smoothstep(0.18, 0.0, dist);
      float glow = smoothstep(0.5, 0.0, dist) * 0.4;
      float ring = smoothstep(0.28, 0.24, dist) * smoothstep(0.20, 0.24, dist) * 0.5;
      float alpha = (core + glow + ring) * (0.7 + pulse * 0.3);
      alpha *= (1.0 + hover * 0.6);
      vec3 col = mix(vec3(0.25, 0.55, 1.0), vec3(0.5, 0.75, 1.0), core);
      col = mix(col, vec3(0.7, 0.88, 1.0), hover * 0.4);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  type CityMarker = {
    marker: THREE.Mesh;
    dot: THREE.Mesh;
    beam: THREE.Mesh;
    pos: THREE.Vector3;
    city: (typeof cities)[0];
    matRef: THREE.ShaderMaterial;
  };

  const cityMarkers: CityMarker[] = [];

  cities.forEach((city, idx) => {
    const pos = latLonToVec3(city.lat, city.lon, GLOBE_RADIUS);
    const markerMat = new THREE.ShaderMaterial({
      vertexShader: markerVertexShader,
      fragmentShader: markerFragmentShader,
      uniforms: {
        pulse: { value: 0 },
        hover: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const marker = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, 0.06),
      markerMat,
    );
    marker.position.copy(pos);
    marker.lookAt(pos.clone().multiplyScalar(2));
    cityGroup.add(marker);

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.005, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0x8ab4ff,
        transparent: true,
        opacity: 0.9,
      }),
    );
    dot.position.copy(pos.clone().multiplyScalar(1.002));
    cityGroup.add(dot);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.001, 0.001, 0.04, 4),
      new THREE.MeshBasicMaterial({
        color: 0x4a80ff,
        transparent: true,
        opacity: 0.2,
      }),
    );
    const beamPos = pos.clone().multiplyScalar(1.02);
    beam.position.copy(beamPos);
    beam.lookAt(beamPos.clone().multiplyScalar(2));
    cityGroup.add(beam);

    cityMarkers.push({ marker, dot, beam, pos, city, matRef: markerMat });
  });

  function createArc(p1: THREE.Vector3, p2: THREE.Vector3) {
    const mid = p1.clone().add(p2).multiplyScalar(0.5);
    const dist = p1.distanceTo(p2);
    mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.2);
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const points = curve.getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({
        color: 0x2255aa,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
      }),
    );
  }

  GLOBE_CONNECTION_PAIRS.forEach(([a, b]) => {
    const p1 = latLonToVec3(cities[a].lat, cities[a].lon, GLOBE_RADIUS);
    const p2 = latLonToVec3(cities[b].lat, cities[b].lon, GLOBE_RADIUS);
    cityGroup.add(createArc(p1, p2));
  });

  let hoveredCity = -1;
  let cardHideTimeout: ReturnType<typeof setTimeout> | null = null;
  const CARD_HIDE_DELAY_MS = 3000;

  const clearCardHideTimeout = () => {
    if (cardHideTimeout !== null) {
      clearTimeout(cardHideTimeout);
      cardHideTimeout = null;
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
    pointerY = e.clientY - rect.top;
    mouse.x = (pointerX / rect.width) * 2 - 1;
    mouse.y = -(pointerY / rect.height) * 2 + 1;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      controls.autoRotate = !controls.autoRotate;
    }
    if (e.code === "KeyR") controls.reset();
  };

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  window.addEventListener("keydown", onKeyDown);

  function updateHover() {
    let closest = -1;
    let closestDist = Infinity;

    cityMarkers.forEach((cm, idx) => {
      const markerWorld = new THREE.Vector3();
      cm.marker.getWorldPosition(markerWorld);
      const camDir = camera.position.clone().sub(markerWorld).normalize();
      const markerNormal = markerWorld.clone().normalize();
      const facing = camDir.dot(markerNormal);

      if (facing > 0.15) {
        const projected = markerWorld.clone().project(camera);
        const screenDist = Math.hypot(
          projected.x - mouse.x,
          projected.y - mouse.y,
        );
        if (screenDist < 0.06 && screenDist < closestDist) {
          closestDist = screenDist;
          closest = idx;
        }
      }
    });

    if (closest !== hoveredCity) {
      hoveredCity = closest;
      if (closest >= 0) {
        clearCardHideTimeout();
        const c = cities[closest];
        ui.cardCity.textContent = c.name;
        ui.cardTitle.textContent = c.title;
        ui.cardInsight.textContent = c.insight;
        ui.cardCoord.textContent = `${Math.abs(c.lat).toFixed(2)}°${c.lat >= 0 ? "N" : "S"} — ${Math.abs(c.lon).toFixed(2)}°${c.lon >= 0 ? "E" : "W"}`;
        ui.card.classList.add("visible");
      } else {
        clearCardHideTimeout();
        cardHideTimeout = setTimeout(() => {
          ui.card.classList.remove("visible");
          cardHideTimeout = null;
        }, CARD_HIDE_DELAY_MS);
      }
    }

    if (hoveredCity >= 0) {
      const rect = container.getBoundingClientRect();
      let cx = pointerX + 16;
      let cy = pointerY - 36;
      const cardW = 320;
      const cardH = 200;
      if (cx + cardW > rect.width) cx = pointerX - cardW - 8;
      if (cy + cardH > rect.height) cy = pointerY - cardH;
      if (cy < 8) cy = 8;
      ui.card.style.left = `${cx}px`;
      ui.card.style.top = `${cy}px`;
    }

    cityMarkers.forEach((cm, idx) => {
      const target = idx === hoveredCity ? 1 : 0;
      const current = cm.matRef.uniforms.hover.value as number;
      cm.matRef.uniforms.hover.value += (target - current) * 0.12;
    });
  }

  let time = 0;
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    time += 0.008;

    const rotSpeed = 0.0001;
    earth.rotation.y += rotSpeed;
    cityGroup.rotation.y += rotSpeed;
    gridOverlay.rotation.y += rotSpeed;
    clouds.rotation.y += rotSpeed * 1.3;
    clouds.rotation.x = Math.sin(time * 0.15) * 0.01;

    atmosphereMaterial.uniforms.lightDirection.value
      .copy(sunLight.position)
      .normalize();
    atmosphereMaterial.uniforms.time.value = time;

    starsMaterial.opacity = 0.45 + Math.sin(time * 1.5) * 0.15;

    cityMarkers.forEach((cm, idx) => {
      const phase = time * 1.2 + idx * 0.4;
      cm.matRef.uniforms.pulse.value = Math.sin(phase) * 0.5 + 0.5;
    });

    updateHover();
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  const resizeObserver = new ResizeObserver(() => {
    const size = getSize();
    w = size.w;
    h = size.h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(container);

  return () => {
    clearCardHideTimeout();
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("keydown", onKeyDown);
    controls.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
    earthGeometry.dispose();
    earthMaterial.dispose();
    starsGeometry.dispose();
    starsMaterial.dispose();
  };
}
