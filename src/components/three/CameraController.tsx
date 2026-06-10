import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

interface CameraControllerProps {
  onAnimate: (camera: PerspectiveCamera, delta: number) => void
  onClick: () => void
}

export default function CameraController({ onAnimate, onClick }: CameraControllerProps) {
  const { camera, gl } = useThree()
  const cameraRef = useRef(camera as PerspectiveCamera)

  useEffect(() => {
    const handleInteraction = () => onClick()

    gl.domElement.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return () => {
      gl.domElement.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [gl, onClick])

  useFrame((_, delta) => {
    onAnimate(cameraRef.current, delta)
  })

  return null
}
