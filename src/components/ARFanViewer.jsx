import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton, Controllers } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import FanModel from "./FanModel";

const ARFanViewer = () => {
  return (
    <div className="w-full h-screen bg-black relative">
      <ARButton
        sessionInit={{ requiredFeatures: ["hit-test"] }}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 20px",
          background: "white",
          color: "black",
          borderRadius: "8px",
          fontWeight: "600",
        }}
      />
      <Canvas camera={{ position: [0, 1.6, 0] }}>
        <XR>
          <ambientLight intensity={1.2} />
          <directionalLight position={[0, 5, 5]} />
          <Suspense fallback={null}>
            <FanModel modelPath="/models/Lara_Metallic_Brown.glb" />
          </Suspense>
          <Environment preset="city" />
          <Controllers />
        </XR>
      </Canvas>
    </div>
  );
};

export default ARFanViewer;
