import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton, Controllers } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import FanModel from "./FanModel";

const ARFanViewer = () => {
  const [scale, setScale] = useState(0.5);

  return (
    <div className="w-full h-screen bg-black relative">
      {/* ✅ AR Button */}
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

      {/* ✅ AR Scene */}
      <Canvas camera={{ position: [0, 1.6, 0] }}>
        <XR>
          <ambientLight intensity={1.2} />
          <directionalLight position={[0, 5, 5]} />
          <Suspense fallback={null}>
            <FanModel modelPath="/models/Lara_Metallic_Brown.glb" scale={scale} />
          </Suspense>
          <Environment preset="city" />
          <Controllers />
        </XR>
      </Canvas>

      {/* ✅ Zoom Buttons */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
          className="px-5 py-2 bg-white text-black font-semibold rounded-lg shadow-lg active:scale-95"
        >
          Zoom +
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.2))}
          className="px-5 py-2 bg-white text-black font-semibold rounded-lg shadow-lg active:scale-95"
        >
          Zoom -
        </button>
      </div>
    </div>
  );
};

export default ARFanViewer;
