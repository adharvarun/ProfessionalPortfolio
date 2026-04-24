"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.3, 2.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;

    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#ffffff", 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3);
    keyLight.position.set(3, 4, 2);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#7dd3fc", 1.8);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight("#38bdf8", 2);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(10, 64),
      new THREE.MeshBasicMaterial({
        color: "#0f172a",
        transparent: true,
        opacity: 0.25,
      })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    let model: THREE.Group | null = null;

    const loader = new GLTFLoader();

    loader.load("/laptop.glb", (gltf) => {
      model = gltf.scene;

      model.scale.set(5.2, 5.2, 5.2);
      model.position.set(0, -0.25, -0.5);

      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.metalness = 0.2;
              material.roughness = 0.6;
              material.envMapIntensity = 2.5;
              material.needsUpdate = true;
            }
          });
        }
      });

      scene.add(model);
    });

    let raf = 0;

    const animate = () => {
      if (model) {
        model.rotation.y += 0.003;
        model.position.y = -0.25 + Math.sin(Date.now() * 0.0015) * 0.08;
        model.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      if (!mount) return;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[1] opacity-80"
      aria-hidden
    />
  );
}