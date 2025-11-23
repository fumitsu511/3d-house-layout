import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import House from './House'
import Furniture from './Furniture'
import useStore from '../../store'

const Scene = () => {
    const mode = useStore((state) => state.mode)

    return (
        <Canvas
            shadows
            camera={{ position: [10, 10, 10], fov: 50 }}
            style={{ background: '#1a1a1a' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            <Grid infiniteGrid fadeDistance={50} sectionColor="#4a4a4a" cellColor="#2a2a2a" />

            <House />
            <Furniture />

            <OrbitControls makeDefault enabled={mode !== 'edit-furniture'} />
        </Canvas>
    )
}

export default Scene
