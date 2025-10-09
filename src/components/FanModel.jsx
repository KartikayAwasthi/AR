import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const FanModel = forwardRef(({ modelPath }, ref) => {
  const { scene } = useGLTF(modelPath);

  // ✅ Correct orientation for ceiling mount
  scene.rotation.set(-Math.PI / 2, 0, Math.PI);

  return <primitive ref={ref} object={scene} scale={0.5} />;
});

export default FanModel;
