import { useState, useCallback, useRef } from 'react'
import type { PerspectiveCamera } from 'three'
import * as THREE from 'three'

const INITIAL_POSITION = new THREE.Vector3(0, 1.5, 5)
const ZOOM_POSITION = new THREE.Vector3(0, 1.2, 1.8)
const ZOOM_SPEED = 2

export function useCameraZoom() {
  const [isZoomed, setIsZoomed] = useState(false)
  const progressRef = useRef(0)

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev)
  }, [])

  const animate = useCallback((camera: PerspectiveCamera, delta: number, zoomed: boolean) => {
    const targetProgress = zoomed ? 1 : 0
    const direction = targetProgress > progressRef.current ? 1 : -1
    progressRef.current = THREE.MathUtils.clamp(
      progressRef.current + direction * delta * ZOOM_SPEED,
      0,
      1
    )

    const eased = THREE.MathUtils.smoothstep(progressRef.current, 0, 1)
    camera.position.lerpVectors(INITIAL_POSITION, ZOOM_POSITION, eased)
    camera.lookAt(0, 1, 0)
  }, [])

  return { isZoomed, toggleZoom, animate }
}
