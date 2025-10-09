import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function CeilingFanPlacer() {
  const { gl, scene } = useThree();
  const [session, setSession] = useState(null);
  const [placed, setPlaced] = useState(false);
  const reticleRef = useRef();
  const fanRef = useRef();

  // Load your GLB model (change this line to use other models)
  const { scene: fanModel } = useGLTF("/models/Inara_Ivory.glb");

  // Create Reticle
  useEffect(() => {
    const geometry = new THREE.RingGeometry(0.07, 0.1, 32).rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
    const reticle = new THREE.Mesh(geometry, material);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    reticleRef.current = reticle;
    return () => scene.remove(reticle);
  }, [scene]);

  // Track XR session
  useEffect(() => {
    const onSessionStart = () => {
      const xrSession = gl.xr.getSession();
      if (xrSession) setSession(xrSession);
    };
    gl.xr.addEventListener("sessionstart", onSessionStart);
    gl.xr.addEventListener("sessionend", () => setSession(null));
    return () => {
      gl.xr.removeEventListener("sessionstart", onSessionStart);
    };
  }, [gl]);

  // Hit test setup
  useEffect(() => {
    if (!session) return;
    let hitTestSource = null;
    let localSpace = null;
    let refSpace = null;

    (async () => {
      const viewerSpace = await session.requestReferenceSpace("viewer");
      hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
      refSpace = await session.requestReferenceSpace("local-floor");

      session.requestAnimationFrame(function onXRFrame(time, frame) {
        const viewerPose = frame.getViewerPose(refSpace);
        if (!viewerPose) return;
        const results = frame.getHitTestResults(hitTestSource);
        if (results.length > 0) {
          const pose = results[0].getPose(refSpace);
          reticleRef.current.visible = true;
          reticleRef.current.matrix.fromArray(pose.transform.matrix);
        } else {
          reticleRef.current.visible = false;
        }
        session.requestAnimationFrame(onXRFrame);
      });
    })();

    const onSelect = () => {
      if (reticleRef.current.visible && !placed) {
        const model = fanModel.clone();
        model.position.setFromMatrixPosition(reticleRef.current.matrix);
        model.scale.set(0.3, 0.3, 0.3);
        model.rotation.x = Math.PI; // adjust for ceiling orientation
        scene.add(model);
        fanRef.current = model;
        setPlaced(true);
      }
    };

    session.addEventListener("select", onSelect);
    return () => session.removeEventListener("select", onSelect);
  }, [session, placed, fanModel, scene]);

  // Rotate fan
  useFrame((_, delta) => {
    if (fanRef.current) fanRef.current.rotation.y += delta * 2;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 2, 2]} />
    </>
  );
}
