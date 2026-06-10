import { useGLTF } from '@react-three/drei'

export default function ComputerModel() {
  const { scene } = useGLTF('/Computer.glb')

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  )
}

useGLTF.preload('/Computer.glb')
