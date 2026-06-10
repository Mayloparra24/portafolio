import { useRef, useEffect } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

interface ComputerModelProps {
  onLoaded?: (info: { boundingBox: THREE.Box3; size: THREE.Vector3 }) => void
}

export default function ComputerModel({ onLoaded }: ComputerModelProps) {
  const { scene } = useGLTF('/Computer.glb')
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    onLoaded?.({ boundingBox: box, size })
  }, [scene, onLoaded])

  return (
    <Center ref={groupRef}>
      <primitive object={scene} />
    </Center>
  )
}

useGLTF.preload('/Computer.glb')
