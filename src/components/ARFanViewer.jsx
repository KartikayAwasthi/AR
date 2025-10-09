import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { XR, ARButton, useHitTest, Controllers } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import FanModel from "./FanModel";

const CeilingFan = ({ modelPath }) => {
  const ref = useRef();

  // ✅ Make fan rotate slowly
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.02;
  });

  return <FanModel ref={ref} modelPath={modelPath} />;
};

const ARFanViewer = () => {
  const [fanPosition, setFanPosition] = useState(null);
  const [fanRotation, setFanRotation] = useState([0, 0, 0]);

  // ✅ Detect ceiling plane using hit-test
  useHitTest((hitMatrix) => {
    const pos = new THREE.Vector3();
    const rot = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    hitMatrix.decompose(pos, rot, scale);

    // Condition to detect if it's likely the ceiling (high Y position)
    if (pos.y > 1.5) {
      setFanPosition([pos.x, pos.y, pos.z]);
      const euler = new THREE.Euler().setFromQuaternion(rot);
      setFanRotation([euler.x + Math.PI, euler.y, euler.z]); // flip to mount on ceiling
    }
  });

  return (
    <div className="w-full h-screen bg-black relative">
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test", "plane-detection"], // ✅ enable ceiling detection
        }}
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
            {fanPosition && (
              <group position={fanPosition} rotation={fanRotation}>
                <CeilingFan modelPath="/models/Lara_Metallic_Brown.glb" />
              </group>
            )}
          </Suspense>
          <Environment preset="city" />
          <Controllers />
        </XR>
      </Canvas>
    </div>
  );
};

export default ARFanViewer;
