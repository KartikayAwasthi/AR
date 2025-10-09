import React from "react";
import { Canvas } from "@react-three/fiber";
import { XR, ARButton } from "@react-three/xr";
import CeilingFanPlacer from "./CeilingFanPlacer";

const ARFanViewer = () => {
  return (
    <>
      <ARButton
        sessionInit={{ requiredFeatures: ["hit-test", "local-floor"] }}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2,
          background: "#000",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "8px",
        }}
      />

      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <XR>
          <CeilingFanPlacer />
        </XR>
      </Canvas>
    </>
  );
};

export default ARFanViewer;
