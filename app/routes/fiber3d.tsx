import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshWobbleMaterial } from '@react-three/drei'
import { SphereGeometry } from 'three'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.02))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* <boxGeometry args={[1, 2, 2]} /> */}
      <sphereGeometry args={[1, 40, 40]} />
      <MeshWobbleMaterial
        attach='material'
        factor={1} // Strength, 0 disables the effect (default=1)
        speed={10} // Speed (default=1)
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  )
}

// ReactDOM.render(
//   <Canvas>
//     <ambientLight />
//     <pointLight position={[10, 10, 10]} />
//     <Box position={[-1.2, 0, 0]} />
//     <Box position={[1.2, 0, 0]} />
//   </Canvas>,
//   document.getElementById('root')
// )

export default function Fiber() {
  return (
    <Canvas style={{ height: '100vh', backgroundColor: '#333333' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  )
}
