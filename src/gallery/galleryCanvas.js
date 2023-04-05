import { React } from "react";
import "./gallery.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

//갤러리캔버스
function GalleryCanvas() {
  return (
    <Canvas className="canvas">
      <OrbitControls autoRotate={false} autoRotateSpeed={10} />
      <mesh>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-1, 0, 1]}
          color={0xa52a2a}
          intensity={0.5}
        />
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial attach="material" color={0xffdeff} />
      </mesh>
    </Canvas>
  );
}

export default GalleryCanvas;
