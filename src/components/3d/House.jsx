import React, { useRef, useEffect } from 'react'
import { DoubleSide } from 'three'
import { TransformControls, Html } from '@react-three/drei'
import useStore from '../../store'

const DimensionsLabel = ({ scale, position }) => {
    return (
        <Html position={[0, scale[1] / 2 + 0.5, 0]} center>
            <div style={{
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
            }}>
                {scale[0].toFixed(1)}m x {scale[1].toFixed(1)}m x {scale[2].toFixed(1)}m
            </div>
        </Html>
    )
}

const Wall = ({ data, isSelected, onSelect, onUpdate, gizmoMode }) => {
    const meshRef = useRef()

    return (
        <>
            <mesh
                ref={meshRef}
                position={data.position}
                rotation={data.rotation}
                scale={data.scale}
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect(data.id, 'wall')
                }}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={isSelected ? '#ff9900' : data.color}
                    transparent={data.transparent}
                    opacity={data.opacity}
                />
                {isSelected && <DimensionsLabel scale={data.scale} position={data.position} />}
            </mesh>

            {isSelected && (
                <TransformControls
                    object={meshRef}
                    mode={gizmoMode}
                    onObjectChange={() => {
                        if (meshRef.current) {
                            const { position, rotation, scale } = meshRef.current

                            // Gravity Constraint: Wall bottom should be at Y=0
                            // So Center Y = Scale Y / 2
                            position.y = scale.y / 2

                            onUpdate(data.id, {
                                position: position.toArray(),
                                rotation: rotation.toArray(),
                                scale: scale.toArray()
                            })
                        }
                    }}
                />
            )}
        </>
    )
}

const Floor = ({ data, isSelected, onSelect, onUpdate, gizmoMode }) => {
    const meshRef = useRef()

    return (
        <>
            <mesh
                ref={meshRef}
                position={data.position}
                rotation={data.rotation}
                scale={data.scale}
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect(data.id, 'floor')
                }}
                receiveShadow
                castShadow
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={isSelected ? '#ff9900' : data.color}
                    transparent={data.transparent}
                    opacity={data.opacity}
                />
                {isSelected && <DimensionsLabel scale={data.scale} position={data.position} />}
            </mesh>

            {isSelected && (
                <TransformControls
                    object={meshRef}
                    mode={gizmoMode}
                    onObjectChange={() => {
                        if (meshRef.current) {
                            const { position, rotation, scale } = meshRef.current

                            // Gravity Constraint: Floor should be at Y=0
                            position.y = 0

                            onUpdate(data.id, {
                                position: position.toArray(),
                                rotation: rotation.toArray(),
                                scale: scale.toArray()
                            })
                        }
                    }}
                />
            )}
        </>
    )
}

const House = () => {
    const { walls, floors, selectedStructureId, selectedStructureType, selectStructure, updateWall, updateFloor, initializeDefaultRoom, loadLayout, gizmoMode } = useStore()
    const mode = useStore((state) => state.mode)

    // Initialize default room if empty (and not loading)
    useEffect(() => {
        if (walls.length === 0 && floors.length === 0) {
            const saved = localStorage.getItem('house-layout-v2')
            if (!saved) {
                initializeDefaultRoom()
            } else {
                loadLayout()
            }
        }
    }, [])

    return (
        <group>
            {floors.map((floor) => (
                <Floor
                    key={floor.id}
                    data={floor}
                    isSelected={mode === 'edit-structure' && selectedStructureId === floor.id && selectedStructureType === 'floor'}
                    onSelect={selectStructure}
                    onUpdate={updateFloor}
                    gizmoMode={gizmoMode}
                />
            ))}

            {walls.map((wall) => (
                <Wall
                    key={wall.id}
                    data={wall}
                    isSelected={mode === 'edit-structure' && selectedStructureId === wall.id && selectedStructureType === 'wall'}
                    onSelect={selectStructure}
                    onUpdate={updateWall}
                    gizmoMode={gizmoMode}
                />
            ))}
        </group>
    )
}

export default House
