import { useState, useCallback } from 'react'
import type { PerspectiveCamera } from 'three'
import * as THREE from 'three'

interface CameraZoomState {
  isZoomed: boolean
  progress: number
}

const INITIAL_POSITION = new THREE.Vector3(0, 1.5, 5)
const ZOOM_POSITION = new THREE.Vector3(0, 1.2, 1.8)
const ZOOM_SPEED = 2

export function useCameraZoom() {
  const [state, setState] = useState<CameraZoomState>({
    isZoomed: false,
    progress: 0,
  })

  const toggleZoom = useCallback(() => {
    setState(prev => ({ ...prev, isZoomed: !prev.isZoomed }))
  }, [])

  const animate = useCallback((camera: PerspectiveCamera, delta: number) => {
    setState(prev => {
      const targetProgress = prev.isZoomed ? 1 : 0
      const direction = targetProgress > prev.progress ? 1 : -1
      const newProgress = THREE.MathUtils.clamp(
        prev.progress + direction * delta * ZOOM_SPEED,
        0,
        1
      )

      const eased = THREE.MathUtils.smoothstep(newProgress, 0, 1)
      camera.position.lerpVectors(INITIAL_POSITION, ZOOM_POSITION, eased)
      camera.lookAt(0, 1, 0)

      return { ...prev, progress: newProgress }
    })
  }, [])

  return { isZoomed: state.isZoomed, progress: state.progress, toggleZoom, animate }
}
