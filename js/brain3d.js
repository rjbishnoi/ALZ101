/* ============================================
   NeuroViz — 3D Brain Atlas
   ============================================
   A WebGL/Three.js-based interactive 3D brain.

   Design notes:
   - Uses low-poly procedural geometry so it ships without external
     binary model files (faster page load, no CDN dependency for assets).
   - Brain hemisphere is built from a deformed sphere with multiple
     "bumps" added via vertex displacement to suggest gyri.
   - Each anatomical region is a separate Three.Group attached to the
     hemisphere — clickable, hoverable, color-coded.
   - Regions have "affected by" metadata identical to the SVG version
     so the same legend + detail panel keeps working.

   Author: NeuroViz, 2026
   ============================================ */

/* global THREE */
const NV_BRAIN3D = {

  // Region metadata mirrors the existing SVG so the legend + detail
  // panel remain consistent.
  // Coordinate system:
  //   +X = patient's right (viewer's left)
  //   +Y = up (toward vertex)
  //   +Z = anterior (forward, toward face)
  // Brain base has radius ~2.5 with z elongation 1.15 → z extent ~2.9
  REGIONS: [
    {
      id: 'frontal',
      name: 'Frontal lobe',
      color: 0xc4a890,
      affectedBy: ['FTD (primary)', "Late Alzheimer's", 'Vascular dementia'],
      clinical: 'Personality change, disinhibition, executive dysfunction, apathy.',
      pos: [-1.4, 0.7, 1.6],
      scale: [1.0, 0.95, 1.2]
    },
    {
      id: 'temporal',
      name: 'Temporal lobe',
      color: 0xa04848,
      affectedBy: ["Alzheimer's (origin)", 'svPPA / FTD-language', 'Mesial temporal sclerosis'],
      clinical: 'Memory loss, word-finding difficulty (anomia), semantic deficits.',
      pos: [-1.9, -0.6, 0.4],
      scale: [1.0, 0.55, 1.0]
    },
    {
      id: 'hippocampus',
      name: 'Hippocampus',
      color: 0x6b1f1a,
      affectedBy: ["Alzheimer's (earliest site)", 'Mesial temporal sclerosis', 'Wernicke-Korsakoff'],
      clinical: 'Anterograde amnesia: forming new memories becomes impossible.',
      pos: [-1.0, -0.6, 0.5],
      scale: [0.55, 0.25, 0.8]
    },
    {
      id: 'parietal',
      name: 'Parietal lobe',
      color: 0xd9a87a,
      affectedBy: ["Posterior cortical atrophy", "Late Alzheimer's", 'Corticobasal syndrome'],
      clinical: 'Visuospatial deficits, dressing apraxia, neglect.',
      pos: [-1.2, 1.5, -0.4],
      scale: [1.1, 0.8, 1.2]
    },
    {
      id: 'occipital',
      name: 'Occipital lobe',
      color: 0x8a6a3c,
      affectedBy: ['DLB (visual hallucinations)', 'Posterior cortical atrophy'],
      clinical: 'Visual hallucinations, perceptual deficits, color/motion processing.',
      pos: [-0.9, 0.2, -2.1],
      scale: [1.0, 0.95, 0.85]
    },
    {
      id: 'cingulate',
      name: 'Cingulate cortex',
      color: 0x7a4a8a,
      affectedBy: ["Alzheimer's (posterior cingulate)", 'FTD-bv (anterior cingulate)'],
      clinical: 'Posterior: spatial disorientation, AD; anterior: apathy, FTD.',
      pos: [-0.4, 1.2, 0.3],
      scale: [0.5, 0.45, 1.5]
    },
    {
      id: 'basalganglia',
      name: 'Basal ganglia',
      color: 0x5a4a7a,
      affectedBy: ['Vascular dementia', "Huntington's disease", 'PDD'],
      clinical: 'Motor: chorea (HD), parkinsonism (PDD); cognitive slowing.',
      pos: [-0.7, -0.2, 0.4],
      scale: [0.55, 0.4, 0.7]
    }
  ],

  three: null,
  camera: null,
  renderer: null,
  scene: null,
  brainGroup: null,
  raycaster: null,
  mouse: null,
  hoveredRegion: null,
  selectedRegion: null,
  onRegionSelect: null,
  animFrame: null,

  /**
   * Initialize the 3D brain in a target element.
   * @param {HTMLElement} target
   * @param {Object} opts { onRegionSelect: function }
   */
  init(target, opts = {}) {
    if (!target) return;
    if (typeof THREE === 'undefined') {
      target.innerHTML = '<div style="padding:30px; text-align:center; color: var(--ink-muted); font-size:13px;">3D brain requires WebGL — falling back to 2D view.</div>';
      return false;
    }

    this.onRegionSelect = opts.onRegionSelect || null;

    // Clean any previous mount
    target.innerHTML = '';
    if (this.animFrame) cancelAnimationFrame(this.animFrame);

    const w = target.clientWidth || 720;
    const h = 460;

    this.scene = new THREE.Scene();
    this.scene.background = null; // transparent

    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this.camera.position.set(5, 1.5, 6);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    target.appendChild(this.renderer.domElement);

    // Lighting — soft 3-point setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(3, 4, 5);
    this.scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xfae8e0, 0.3);
    fillLight.position.set(-3, 1, 3);
    this.scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xc4d8d0, 0.4);
    rimLight.position.set(-2, 2, -3);
    this.scene.add(rimLight);

    // Build the brain
    this.brainGroup = new THREE.Group();
    this.scene.add(this.brainGroup);
    this._buildBrain();

    // Setup interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this._wireInteraction(target);
    this._wireDragRotate(target);

    // Default lateral view (camera does the angling, not the brain)
    this.brainGroup.rotation.y = 0;
    this.brainGroup.rotation.x = 0;

    // Animate (rotation paused until user interacts or after grace period)
    this._initialRotateDelay = 5000; // 5 seconds of static view first
    const startTime = performance.now();
    const animate = () => {
      this.animFrame = requestAnimationFrame(animate);
      const elapsed = performance.now() - startTime;
      // Gentle auto-rotate after initial pause, paused during user interaction
      if (!this._userIsRotating && !this.selectedRegion && elapsed > this._initialRotateDelay) {
        this.brainGroup.rotation.y += 0.001;
      }
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    // Resize handler
    this._resizeHandler = () => {
      const newW = target.clientWidth || 720;
      this.camera.aspect = newW / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(newW, h);
    };
    window.addEventListener('resize', this._resizeHandler);

    return true;
  },

  /**
   * Build the brain shape: ellipsoid base + cerebellum + brainstem,
   * with separate region meshes overlaid on the surface.
   */
  _buildBrain() {
    // Base brain — full ellipsoid, slightly elongated front-to-back
    const baseColor = 0xf0e8d8;
    const baseGeom = this._makeBrainGeometry(2.5, 0.06);
    const baseMat  = new THREE.MeshStandardMaterial({
      color: baseColor, roughness: 0.65, metalness: 0.05
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    this.brainGroup.add(base);

    // Cerebellum: a smaller textured ellipsoid attached at the back/bottom
    const cerebGeom = new THREE.SphereGeometry(0.85, 32, 24);
    // Apply small surface noise
    const cPos = cerebGeom.attributes.position;
    const cv = new THREE.Vector3();
    for (let i = 0; i < cPos.count; i++) {
      cv.fromBufferAttribute(cPos, i);
      const n = this._noise3(cv.x * 4, cv.y * 4, cv.z * 4);
      cv.normalize().multiplyScalar(0.85 + n * 0.04);
      cPos.setXYZ(i, cv.x, cv.y, cv.z);
    }
    cerebGeom.computeVertexNormals();
    const cerebellum = new THREE.Mesh(
      cerebGeom,
      new THREE.MeshStandardMaterial({ color: 0xeed8b8, roughness: 0.7 })
    );
    cerebellum.position.set(0, -1.4, -2.0);
    cerebellum.scale.set(1.1, 0.7, 0.85);
    this.brainGroup.add(cerebellum);

    // Brainstem (cylinder dropping below)
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.42, 1.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xece2d0, roughness: 0.7 })
    );
    stem.position.set(0, -2.1, -1.0);
    stem.rotation.x = -0.4;
    this.brainGroup.add(stem);

    // Now overlay each region as a separate, clickable mesh.
    // Regions are placed on both sides (left + mirror) so they read
    // as belonging to both hemispheres.
    this.regionMeshes = {};
    this.REGIONS.forEach(r => {
      const geom = new THREE.SphereGeometry(0.7, 24, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: r.color,
        roughness: 0.55,
        metalness: 0.05,
        transparent: true,
        opacity: 0.92,
        emissive: r.color,
        emissiveIntensity: 0.0
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(r.pos[0], r.pos[1], r.pos[2]);
      mesh.scale.set(r.scale[0], r.scale[1], r.scale[2]);
      mesh.userData.regionId = r.id;
      mesh.userData.region = r;

      // Mirror to the right hemisphere too (cosmetic balance)
      const mirror = mesh.clone();
      mirror.material = mat.clone();
      mirror.position.x = -r.pos[0];
      mirror.userData.regionId = r.id;
      mirror.userData.region = r;
      mirror.userData.isMirror = true;

      this.brainGroup.add(mesh);
      this.brainGroup.add(mirror);
      this.regionMeshes[r.id] = [mesh, mirror];
    });
  },

  /**
   * Build a full ellipsoid brain shape with bumpy surface for gyri.
   * Slightly elongated front-to-back (along z axis).
   */
  _makeBrainGeometry(radius, displacement) {
    const geom = new THREE.SphereGeometry(radius, 64, 48);
    // Elongate along z (front-to-back)
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Slight elongation
      v.z *= 1.15;
      // Slight flattening at bottom (where brainstem attaches)
      if (v.y < 0) v.y *= 0.8;
      // Procedural noise for gyri
      const n = this._noise3(v.x * 1.3, v.y * 1.3, v.z * 1.3);
      const dir = v.clone().normalize();
      v.add(dir.multiplyScalar(n * displacement * 4));
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geom.computeVertexNormals();
    return geom;
  },

  /** Cheap pseudo-noise — sum of sines. Good enough for cosmetic bumpiness. */
  _noise3(x, y, z) {
    return Math.sin(x * 5.1 + y * 3.7) * 0.5
         + Math.sin(y * 4.3 + z * 2.9) * 0.3
         + Math.sin(z * 6.7 + x * 1.5) * 0.2;
  },

  _wireInteraction(target) {
    const canvas = this.renderer.domElement;

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this._handleHover();
    });

    canvas.addEventListener('mouseleave', () => {
      this._setHover(null);
    });

    canvas.addEventListener('click', () => {
      if (this.hoveredRegion) {
        this._select(this.hoveredRegion);
      }
    });
  },

  _wireDragRotate(target) {
    const canvas = this.renderer.domElement;
    let dragging = false;
    let lastX = 0, lastY = 0;
    canvas.addEventListener('mousedown', e => {
      dragging = true;
      this._userIsRotating = true;
      lastX = e.clientX; lastY = e.clientY;
      canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      dragging = false;
      // Resume auto-rotate after 2s
      clearTimeout(this._idleTimer);
      this._idleTimer = setTimeout(() => { this._userIsRotating = false; }, 2000);
      canvas.style.cursor = 'grab';
    });
    canvas.addEventListener('mousemove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      this.brainGroup.rotation.y += dx * 0.01;
      this.brainGroup.rotation.x += dy * 0.01;
      this.brainGroup.rotation.x = Math.max(-1, Math.min(1, this.brainGroup.rotation.x));
      lastX = e.clientX; lastY = e.clientY;
    });
    canvas.style.cursor = 'grab';
  },

  _handleHover() {
    if (!this.regionMeshes) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const allMeshes = Object.values(this.regionMeshes).flat();
    const intersects = this.raycaster.intersectObjects(allMeshes, false);
    if (intersects.length > 0) {
      this._setHover(intersects[0].object.userData.regionId);
    } else {
      this._setHover(null);
    }
  },

  _setHover(regionId) {
    if (this.hoveredRegion === regionId) return;

    // Reset previous
    if (this.hoveredRegion && this.regionMeshes[this.hoveredRegion]) {
      this.regionMeshes[this.hoveredRegion].forEach(m => {
        if (this.hoveredRegion !== this.selectedRegion) {
          m.material.emissiveIntensity = 0.0;
        }
      });
    }
    this.hoveredRegion = regionId;
    if (regionId && this.regionMeshes[regionId]) {
      this.regionMeshes[regionId].forEach(m => {
        m.material.emissiveIntensity = 0.4;
      });
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.renderer.domElement.style.cursor = this._userIsRotating ? 'grabbing' : 'grab';
    }
  },

  _select(regionId) {
    // Deselect previous
    if (this.selectedRegion && this.regionMeshes[this.selectedRegion]) {
      this.regionMeshes[this.selectedRegion].forEach(m => {
        m.material.emissiveIntensity = 0.0;
      });
    }
    if (this.selectedRegion === regionId) {
      this.selectedRegion = null;
      if (this.onRegionSelect) this.onRegionSelect(null);
      return;
    }
    this.selectedRegion = regionId;
    if (this.regionMeshes[regionId]) {
      this.regionMeshes[regionId].forEach(m => {
        m.material.emissiveIntensity = 0.6;
      });
    }
    const r = this.REGIONS.find(x => x.id === regionId);
    if (this.onRegionSelect) this.onRegionSelect(r);
  },

  /** Highlight regions affected by a particular dementia type. */
  highlightByType(typeId) {
    if (!this.regionMeshes) return;
    // Reset all
    Object.values(this.regionMeshes).flat().forEach(m => {
      m.material.opacity = 0.92;
      m.material.emissiveIntensity = 0.0;
    });
    if (!typeId) return;
    // Identify regions that mention this type
    this.REGIONS.forEach(r => {
      const hit = r.affectedBy.some(a => a.toLowerCase().includes(typeId.toLowerCase()));
      const ms = this.regionMeshes[r.id];
      if (!ms) return;
      ms.forEach(m => {
        if (hit) {
          m.material.emissiveIntensity = 0.5;
          m.material.opacity = 0.95;
        } else {
          m.material.opacity = 0.25;
        }
      });
    });
  },

  destroy() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
};

if (typeof window !== 'undefined') window.NV_BRAIN3D = NV_BRAIN3D;
