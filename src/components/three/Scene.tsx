import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Html } from '@react-three/drei'
import ComputerModel from './ComputerModel'
import CameraController from './CameraController'
import MonitorUI from '../portfolio/MonitorUI'
import { useCameraZoom } from '../../hooks/useCameraZoom'

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-accent text-lg animate-pulse">Cargando modelo 3D...</div>
    </Html>
  )
}

export default function Scene() {
  const { isZoomed, toggleZoom, animate } = useCameraZoom()

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      className="h-full w-full"
    >
      <Suspense fallback={<LoadingFallback />}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#64ffda" />

        <ComputerModel />

        {isZoomed && (
          <Html
            transform
            position={[0, 1.15, 0.41]}
            scale={0.18}
          >
            <MonitorUI />
          </Html>
        )}

        <Environment preset="city" />

        <CameraController onAnimate={animate} onClick={toggleZoom} isZoomed={isZoomed} />
      </Suspense>
    </Canvas>
  )
}
