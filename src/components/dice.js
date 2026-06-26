import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';



function Dice({ value }) {
  const mesh = useRef();

  const textures = useLoader(THREE.TextureLoader, [
    '/textures/one.png',
    '/textures/two.png',
    '/textures/three.png',
    '/textures/four.png',
    '/textures/five.png',
    '/textures/six.png',
  ]);

  //evite de recreer les materiaux
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: textures[3] }),
    new THREE.MeshStandardMaterial({ map: textures[2] }),
    new THREE.MeshStandardMaterial({ map: textures[0] }),
    new THREE.MeshStandardMaterial({ map: textures[5] }),
    new THREE.MeshStandardMaterial({ map: textures[4] }),
    new THREE.MeshStandardMaterial({ map: textures[1] }),
  ], [textures]);

  //rotations pour chaque valeur du dé
  const rotations = {
    1: [0, 0, 0],
    2: [Math.PI / 2, 0, 0],
    3: [0, 0, -Math.PI / 2],
    4: [0, 0, Math.PI / 2],
    5: [-Math.PI / 2, 0, 0],
    6: [Math.PI, 0, 0],
  };


  const targetRotation = rotations[value] || [0, 0, 0];

  useFrame(() => {
    if (!mesh.current) return;
    //rapprochement vers la rotation cible
    mesh.current.rotation.x += (targetRotation[0] - mesh.current.rotation.x) * 0.08;
    mesh.current.rotation.y += (targetRotation[1] - mesh.current.rotation.y) * 0.08;
    mesh.current.rotation.z += (targetRotation[2] - mesh.current.rotation.z) * 0.08;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default Dice;
