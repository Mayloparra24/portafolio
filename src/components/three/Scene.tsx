import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import ComputerModel from './ComputerModel'
import CameraController from './CameraController'
import MonitorUI from '../portfolio/MonitorUI'
import { useCameraZoom } from '../../hooks/useCameraZoom'

export default function Scene() {
  const { toggleZoom, animate } = useCameraZoom()

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#64ffda" />

        <ComputerModel />

        <Html
          transform
          position={[0, 1.15, 0.41]}
          rotation={[0, 0, 0]}
          scale={0.18}
          occlude="blending"
        >
          <MonitorUI />
        </Html>

        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />

        <CameraController onAnimate={animate} onClick={toggleZoom} />
      </Suspense>
    </Canvas>
  )
}
