import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Html } from '@react-three/drei'
import * as THREE from 'three'
import ComputerModel from './ComputerModel'
import CameraController from './CameraController'
import MonitorUI from '../portfolio/MonitorUI'
import { useCameraZoom } from '../../hooks/useCameraZoom'

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-navy-900">
      <div className="text-accent text-xl animate-pulse">Cargando modelo 3D...</div>
    </div>
  )
}

export default function Scene() {
  const [modelInfo, setModelInfo] = useState<{ size: THREE.Vector3 } | null>(null)

  const handleModelLoaded = useCallback((info: { size: THREE.Vector3 }) => {
    setModelInfo(info)
  }, [])

  const cameraStart: [number, number, number] = modelInfo
    ? [0, modelInfo.size.y * 0.6, modelInfo.size.z * 2.5]
    : [0, 2, 5]

  const cameraEnd: [number, number, number] = modelInfo
    ? [0, modelInfo.size.y * 0.5, modelInfo.size.z * 0.8]
    : [0, 1.2, 1.8]

  const lookAtY = modelInfo ? modelInfo.size.y * 0.45 : 1

  const { isZoomed, toggleZoom, animate } = useCameraZoom(cameraStart, cameraEnd, lookAtY)

  return (
    <div className="relative h-full w-full">
      {!modelInfo && <LoadingScreen />}
      <Canvas
        shadows
        dpr={[1, 2]}
        flat
        camera={{ position: cameraStart, fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0a192f']} />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <hemisphereLight
          color="#b1e1ff"
          groundColor="#0a192f"
          intensity={0.4}
        />

        <ComputerModel onLoaded={handleModelLoaded} />

        {isZoomed && modelInfo && (
          <Html
            transform
            position={[0, modelInfo.size.y * 0.45, modelInfo.size.z * 0.25]}
            scale={modelInfo.size.x * 0.12}
          >
            <MonitorUI />
          </Html>
        )}

        <Environment preset="city" />

        <CameraController
          onAnimate={animate}
          onClick={toggleZoom}
          isZoomed={isZoomed}
        />
      </Canvas>
    </div>
  )
}
