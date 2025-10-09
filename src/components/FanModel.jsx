import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";

const FanModel = ({ modelPath, scale }) => {
  const { scene } = useGLTF(modelPath);
  const { gl } = useThree();
  const [localScale, setLocalScale] = useState(scale);

  // Handle pinch zoom gesture (mobile AR)
  useGesture(
    {
      onPinch: ({ offset: [distance] }) => {
        const newScale = Math.min(Math.max(0.2, distance / 100), 2); // limit between 0.2–2x
        setLocalScale(newScale);
      },
    },
    { target: gl.domElement }
  );

  return (
    <primitive
      object={scene}
      scale={localScale}
      position={[0, -1, 0]} // slightly above user head like ceiling
      rotation={[Math.PI / 2, 0, 0]} // ceiling-facing orientation
    />
  );
};

export default FanModel;
