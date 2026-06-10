import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

interface CameraControllerProps {
  onAnimate: (camera: PerspectiveCamera, delta: number, zoomed: boolean) => void
  onClick: () => void
  isZoomed: boolean
}

export default function CameraController({ onAnimate, onClick, isZoomed }: CameraControllerProps) {
  const { camera, gl } = useThree()
  const cameraRef = useRef(camera as PerspectiveCamera)
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (!pointerDownPos.current) return
      const dx = e.clientX - pointerDownPos.current.x
      const dy = e.clientY - pointerDownPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 5) {
        onClick()
      }
      pointerDownPos.current = null
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick()
      }
    }

    gl.domElement.addEventListener('pointerdown', handlePointerDown)
    gl.domElement.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown)
      gl.domElement.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gl, onClick])

  useFrame((_, delta) => {
    onAnimate(cameraRef.current, delta, isZoomed)
  })

  return null
}
