import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";

const FanModel = ({ modelPath, scale }) => {
  const { scene } = useGLTF(modelPath);
  const { gl } = useThree();
  const [localScale, setLocalScale] = useState(scale);

  // ✅ Fix orientation: canopy faces ceiling
  scene.rotation.set(-Math.PI / 2, 0, Math.PI); // rotate 180° on Z to flip upside-down

  // ✅ Pinch zoom support
  useGesture(
    {
      onPinch: ({ offset: [distance] }) => {
        const newScale = Math.min(Math.max(0.2, distance / 100), 2);
        setLocalScale(newScale);
      },
    },
    { target: gl.domElement }
  );

  return (
    <primitive
      object={scene}
      scale={localScale}
      position={[0, -1, 0]} // hanging above
    />
  );
};

export default FanModel;
