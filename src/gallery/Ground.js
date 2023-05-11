// import * as THREE from "three";
// // import { RigidBody } from "@react-three/rapier";
// import { useRigidBody } from "@react-three/cannon";

// export default function Ground(props) {
//   const ref = useRigidBody(() => ({
//     type: "Static",
//     position: [0, 0, 0],
//     rotation: [0, 0, 0],
//   }));

//   return (
//     // <RigidBody {...props} type="fixed" colliders={false}>
//     <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
//       <boxGeometry args={[1000, 2, 1000]} />
//       <planeGeometry args={[1000, 1000]} />
//       <meshStandardMaterial color="lightblue" />
//     </mesh>
//     // </RigidBody>
//   );
// }

// import * as THREE from "three";
// import { RigidBody } from "@react-three/rapier";

// export default function Ground(props) {
//   return (
//     <RigidBody {...props} type="fixed" colliders={false}>
//       <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
//         <planeGeometry args={[1000, 1000]} />
//         <meshStandardMaterial color="lightblue" />
//       </mesh>
//       <boxGeometry args={[1000, 2, 1000]} />
//     </RigidBody>
//   );
// }

import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export default function Ground(props) {
  return (
    <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="lightblue" />
      <boxGeometry args={[1000, 2, 1000]} />
    </mesh>
  );
}
