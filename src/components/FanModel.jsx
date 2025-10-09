import { useGLTF } from "@react-three/drei";
import React from "react";

const FanModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[0, 0, -1]} // hanging 1m away
      rotation={[Math.PI, 0, 0]} // flip to appear on ceiling
    />
  );
};

export default FanModel;
