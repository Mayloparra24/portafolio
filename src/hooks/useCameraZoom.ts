import { useState, useCallback, useRef } from 'react'
import type { PerspectiveCamera } from 'three'
import * as THREE from 'three'

const ZOOM_SPEED = 2

export function useCameraZoom(
  startPos: [number, number, number],
  endPos: [number, number, number],
  lookAtY: number
) {
  const [isZoomed, setIsZoomed] = useState(false)
  const progressRef = useRef(0)
  const startVec = useRef(new THREE.Vector3(...startPos))
  const endVec = useRef(new THREE.Vector3(...endPos))

  startVec.current.set(...startPos)
  endVec.current.set(...endPos)

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev)
  }, [])

  const animate = useCallback(
    (camera: PerspectiveCamera, delta: number, zoomed: boolean) => {
      const target = zoomed ? 1 : 0
      const dir = target > progressRef.current ? 1 : -1
      progressRef.current = THREE.MathUtils.clamp(
        progressRef.current + dir * delta * ZOOM_SPEED,
        0,
        1
      )

      const eased = THREE.MathUtils.smoothstep(progressRef.current, 0, 1)
      camera.position.lerpVectors(startVec.current, endVec.current, eased)
      camera.lookAt(0, lookAtY, 0)
    },
    [lookAtY]
  )

  return { isZoomed, toggleZoom, animate }
}
