import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const FanModel = forwardRef(({ modelPath }, ref) => {
  const { scene } = useGLTF(modelPath);

  // ✅ Ensure correct ceiling orientation
  scene.rotation.set(-Math.PI / 2, 0, Math.PI);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.5}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
});

export default FanModel;
