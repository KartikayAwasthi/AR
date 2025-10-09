import React, { useState, useRef } from "react";
import { useHitTest } from "@react-three/xr";
import * as THREE from "three";
import FanModel from "./FanModel";
import { useFrame } from "@react-three/fiber";

const CeilingFanPlacer = ({ modelPath }) => {
  const [fanPosition, setFanPosition] = useState(null);
  const [fanRotation, setFanRotation] = useState([0, 0, 0]);
  const fanRef = useRef();

  // ✅ Slow fan rotation
  useFrame(() => {
    if (fanRef.current) {
      fanRef.current.rotation.z += 0.03;
    }
  });

  // ✅ Hit-test for ceiling detection
  useHitTest((hitMatrix) => {
    const pos = new THREE.Vector3();
    const rot = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    hitMatrix.decompose(pos, rot, scale);

    // If the plane is high enough, treat it as ceiling
    if (pos.y > 1.5) {
      setFanPosition([pos.x, pos.y, pos.z]);
      const euler = new THREE.Euler().setFromQuaternion(rot);
      setFanRotation([euler.x + Math.PI, euler.y, euler.z]);
    }
  });

  return (
    fanPosition && (
      <group ref={fanRef} position={fanPosition} rotation={fanRotation}>
        <FanModel modelPath={modelPath} />
      </group>
    )
  );
};

export default CeilingFanPlacer;
