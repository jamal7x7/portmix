import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  MeshWobbleMaterial,
  MeshDistortMaterial,
} from '@react-three/drei'
import { SphereGeometry } from 'three'
import { Link } from 'remix'
import { Vector3 } from 'three'

import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei'

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

import { MovingSpot } from './MovingSpot'

function Sphere(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <sphereBufferGeometry args={[1, 20, 20]} />
      <meshPhysicalMaterial wireframe />

      {/* <MeshDistortMaterial /> */}

      {/* <MeshDistortMaterial
        attach='material'
        factor={1} // Strength, 0 disables the effect (default=1)
        speed={3} // Speed (default=1)
        color={hovered ? 'hotpink' : '#010101'}
        // ref={set}
        // envMap={envMap}
        // bumpMap={bumpMap}

        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.2}
      /> */}
    </mesh>
  )
}

export default function Fiber() {
  return (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      {/* <Canvas style={{ height: '100vh', backgroundColor: '#333333' }}> */}
      <Canvas
        style={{ height: '100vh' }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
      >
        <color attach='background' args={['#202020']} />
        <fog attach='fog' args={['#202020', 5, 20]} />
        <ambientLight intensity={0.2} />
        {/* <ambientLight /> */}
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[-1, 1, 1]} />

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        <Scene />

        <EffectComposer>
          {/* <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          /> */}
          {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
          {/* <Noise opacity={0.02} /> */}
          {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        </EffectComposer>
      </Canvas>
    </>
  )
}

function Plan() {
  return (
    <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[50, 50]} />
      <meshPhongMaterial />
    </mesh>
  )
}

function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  // const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <>
      {/* <MovingSpot
        // depthBuffer={depthBuffer}
        color='#0c8cbf'
        position={[3, 3, 2]}
      />
      <MovingSpot
        // depthBuffer={depthBuffer}
        color='#b00c3f'
        position={[1, 3, 0]}
      /> */}
      <Sphere position={[0, 0, 0]} />
      <Bubble
        position={[0, 0, 0]}
        phi={0.25 * Math.PI}
        theta={0.25 * Math.PI}
      />
      <Bubble
        position={[0, 0, 0]}
        phi={0.45 * Math.PI}
        theta={0.55 * Math.PI}
      />
      {/* <Plan /> */}
      {/* <mesh position={[0, -1.03, 0]} castShadow receiveShadow dispose={null} /> */}
    </>
  )
}

function Bubble(
  { phi = 0.25 * Math.PI, theta = 0.25 * Math.PI },

  props: JSX.IntrinsicElements['mesh']
) {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    let t = clock.getElapsedTime()
    let p = mesh.current.position
    let s = mesh.current.scale

    // p.x = 0.2 * Math.cos(t) + 0.5
    // p.y = 1.3 * Math.sin(t) + 1

    let r = 1.3 * Math.sin(t) + 1
    // let phi = phi
    // let phi = 0.25 * Math.PI
    // let theta = theta
    // let theta = 0.25 * Math.PI

    p.x = r * Math.cos(phi) * Math.cos(theta)
    p.y = r * Math.cos(phi) * Math.cos(theta)
    p.z = r * Math.cos(phi) * Math.cos(theta)

    s.x = 1 - 1 * Math.sin(t)
    s.y = 1 - 1 * Math.sin(t)
    s.z = 1 - 1 * Math.sin(t)

    // console.log(mesh.current.position)
  })
  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry args={[0.3, 10, 10]} />

      <MeshDistortMaterial wireframe color='teal' />
      {/* <MeshDistortMaterial
        attach='material'
        factor={1} // Strength, 0 disables the effect (default=1)
        speed={3} // Speed (default=1)
        color={'hotpink'}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      /> */}
    </mesh>
  )
}
