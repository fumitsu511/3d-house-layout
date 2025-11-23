import React, { useRef, useEffect, useState, useMemo } from 'react'
import { TransformControls } from '@react-three/drei'
import { TextureLoader, Shape, Vector2, DoubleSide } from 'three'
import useStore from '../../store'

const ExtrudedFurniture = ({ shapePoints, depth, texture, color }) => {
    const shape = useMemo(() => {
        const s = new Shape()
        if (shapePoints && shapePoints.length > 0) {
            s.moveTo(shapePoints[0].x, shapePoints[0].y)
            for (let i = 1; i < shapePoints.length; i++) {
                s.lineTo(shapePoints[i].x, shapePoints[i].y)
            }
            s.closePath()
        }
        return s
    }, [shapePoints])

    const extrudeSettings = useMemo(() => ({
        depth: depth,
        bevelEnabled: false,
    }), [depth])

    return (
        <mesh castShadow receiveShadow>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            {/* Material 0: Front/Back (Texture), Material 1: Sides (Color) */}
            <meshBasicMaterial attach="material-0" map={texture} side={DoubleSide} />
            <meshStandardMaterial attach="material-1" color="#ffffff" />
        </mesh>
    )
}

const Table = ({ color }) => (
    <group>
        {/* Table Top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.6, 0.2, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.6, 0.2, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[-0.6, 0.2, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.6, 0.2, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const RoundTable = ({ color }) => (
    <group>
        {/* Table Top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Leg (Central) */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const Chair = ({ color }) => (
    <group>
        {/* Seat */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.05, 0.4]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.5, -0.175]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.5, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.15, 0.125, 0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.15, 0.125, 0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[-0.15, 0.125, -0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.15, 0.125, -0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const Bed = ({ color }) => (
    <group>
        {/* Mattress */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.2, 2]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.1, 2.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.4, -1]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.6, 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.35, -0.8]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.1, 0.4]} />
            <meshStandardMaterial color="#eeeeee" />
        </mesh>
    </group>
)

const Sofa = ({ color }) => (
    <group>
        {/* Base */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.3, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.45, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.4, 0.2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.9, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.3, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.9, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.3, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const LShapedSofa = ({ color }) => (
    <group>
        {/* Long section base */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.3, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Long section backrest */}
        <mesh position={[0, 0.45, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.4, 0.2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Short section base */}
        <mesh position={[1.1, 0.15, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.3, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Short section backrest */}
        <mesh position={[1.5, 0.45, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.4, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const Ottoman = ({ color }) => (
    <group>
        {/* Main cushion */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.3, 0.05, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0.3, 0.05, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.3, 0.05, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0.3, 0.05, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
    </group>
)

const OfficeChair = ({ color }) => (
    <group>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.1, 0.5]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.8, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.5, 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Base with wheels */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.05, 0.6]} />
            <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
        </mesh>
    </group>
)

const DiningChair = ({ color }) => (
    <group>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.05, 0.45]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.7, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.43, 0.45, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs - Front */}
        <mesh position={[-0.18, 0.225, 0.18]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.45, 0.04]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.18, 0.225, 0.18]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.45, 0.04]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs - Back */}
        <mesh position={[-0.18, 0.45, -0.18]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.9, 0.04]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.18, 0.45, -0.18]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.9, 0.04]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const Window = ({ color }) => (
    <group>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.5, 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Glass */}
        <mesh position={[0, 0, 0.06]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 1.4, 0.02]} />
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
        </mesh>
    </group>
)

const Painting = ({ color }) => (
    <group>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.8, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Canvas */}
        <mesh position={[0, 0, 0.03]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.7, 0.01]} />
            <meshStandardMaterial color="#f5f5dc" />
        </mesh>
    </group>
)

const Mirror = ({ color }) => (
    <group>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 1.2, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Reflective Surface */}
        <mesh position={[0, 0, 0.03]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 1.1, 0.01]} />
            <meshStandardMaterial color="#d3d3d3" metalness={0.9} roughness={0.1} />
        </mesh>
    </group>
)

const TV = ({ color }) => (
    <group>
        {/* Stand Base */}
        <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.06, 0.35]} />
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Stand Pole */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Screen Back */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.9, 0.08]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Screen Frame/Bezel */}
        <mesh position={[0, 0.5, 0.045]} castShadow receiveShadow>
            <boxGeometry args={[1.52, 0.92, 0.01]} />
            <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0.5, 0.055]} castShadow receiveShadow>
            <boxGeometry args={[1.45, 0.85, 0.005]} />
            <meshStandardMaterial color="#000033" emissive="#000080" emissiveIntensity={0.3} />
        </mesh>
        {/* Bottom Bezel with Logo */}
        <mesh position={[0, 0.07, 0.055]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.02, 0.005]} />
            <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Power LED */}
        <mesh position={[-0.65, 0.07, 0.055]} castShadow receiveShadow>
            <boxGeometry args={[0.015, 0.015, 0.005]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
    </group>
)

const Toilet = ({ color }) => (
    <group>
        {/* Bowl Base */}
        <mesh position={[0, 0.15, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.3, 0.55]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Bowl Front Curve */}
        <mesh position={[0, 0.15, 0.35]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.28, 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Tank */}
        <mesh position={[0, 0.5, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.5, 0.18]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Tank Top */}
        <mesh position={[0, 0.76, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.47, 0.02, 0.2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Seat */}
        <mesh position={[0, 0.32, 0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.02, 0.52]} />
            <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Seat Inner Edge */}
        <mesh position={[0, 0.33, 0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.35, 0.01, 0.4]} />
            <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.45, -0.05]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.02, 0.45]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Flush Button */}
        <mesh position={[0.15, 0.7, -0.15]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.04, 0.02]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.6} roughness={0.4} />
        </mesh>
    </group>
)

const AirCon = ({ color }) => (
    <group>
        {/* Main Unit */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.28, 0.24]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Front Panel */}
        <mesh position={[0, 0.01, 0.125]} castShadow receiveShadow>
            <boxGeometry args={[0.98, 0.26, 0.01]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Vent Slats - Multiple */}
        <mesh position={[0, -0.11, 0.13]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.02, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.07, 0.13]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.02, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.03, 0.13]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.02, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Display/LED */}
        <mesh position={[-0.35, 0.08, 0.13]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.04, 0.005]} />
            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} />
        </mesh>
        {/* Sensor */}
        <mesh position={[0.35, 0.08, 0.13]} castShadow receiveShadow>
            <boxGeometry args={[0.03, 0.03, 0.005]} />
            <meshStandardMaterial color="#2a2a2a" />
        </mesh>
    </group>
)

const Sink = ({ color }) => (
    <group>
        {/* Cabinet */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.8, 0.5]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Basin */}
        <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.15, 0.35]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Faucet */}
        <mesh position={[0, 1, -0.1]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.2, 0.05]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
    </group>
)

const Kitchen = ({ color }) => (
    <group>
        {/* Counter/Cabinet */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.9, 0.6]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Countertop */}
        <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.05, 0.05, 0.65]} />
            <meshStandardMaterial color="#2c2c2c" />
        </mesh>
        {/* Sink */}
        <mesh position={[0.5, 0.96, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.12, 0.38]} />
            <meshStandardMaterial color="#808080" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Faucet */}
        <mesh position={[0.5, 1.12, -0.05]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Stovetop */}
        <mesh position={[-0.5, 0.96, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.02, 0.45]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Burners */}
        <mesh position={[-0.65, 0.97, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.35, 0.97, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.65, 0.97, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.35, 0.97, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Drawer Handles */}
        <mesh position={[0, 0.65, 0.31]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.02, 0.02]} />
            <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0.31]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.02, 0.02]} />
            <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
)

const SingleBed = ({ color }) => (
    <group>
        {/* Frame */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.3, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.2, 1.95]} />
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.47, -0.75]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.1, 0.3]} />
            <meshStandardMaterial color="#eeeeee" />
        </mesh>
    </group>
)

const BunkBed = ({ color }) => (
    <group>
        {/* Lower bed frame */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.3, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Lower mattress */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.15, 1.95]} />
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        {/* Upper bed frame */}
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.3, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Upper mattress */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.15, 1.95]} />
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        {/* Posts */}
        <mesh position={[-0.45, 0.65, -0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.3, 0.08]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.45, 0.65, -0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.3, 0.08]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[-0.45, 0.65, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.3, 0.08]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.45, 0.65, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.3, 0.08]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const CoffeeTable = ({ color }) => (
    <group>
        {/* Top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.05, 0.7]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.5, 0.2, -0.28]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.5, 0.2, -0.28]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0.28]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.5, 0.2, 0.28]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
)

const Refrigerator = ({ color }) => (
    <group>
        {/* Main Body */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 1.8, 0.7]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Freezer Door */}
        <mesh position={[0, 1.35, 0.36]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.88, 0.02]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Fridge Door */}
        <mesh position={[0, 0.45, 0.36]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.88, 0.02]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Handle - Top */}
        <mesh position={[0.3, 1.35, 0.37]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.3, 0.03]} />
            <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Handle - Bottom */}
        <mesh position={[0.3, 0.45, 0.37]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.3, 0.03]} />
            <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
)

const FurnitureItem = ({ item, isSelected, onSelect, onUpdate, gizmoMode }) => {
    const meshRef = useRef()
    const [texture, setTexture] = useState(null)

    useEffect(() => {
        if (item.type === 'image' && item.url) {
            new TextureLoader().load(item.url, (tex) => {
                setTexture(tex)
            })
        } else {
            setTexture(null)
        }
    }, [item.type, item.url])

    const renderFurniture = () => {
        switch (item.type) {
            case 'table': return <Table color={item.color} />
            case 'table_round': return <RoundTable color={item.color} />
            case 'table_coffee': return <CoffeeTable color={item.color} />
            case 'chair': return <Chair color={item.color} />
            case 'chair_office': return <OfficeChair color={item.color} />
            case 'chair_dining': return <DiningChair color={item.color} />
            case 'bed': return <Bed color={item.color} />
            case 'bed_single': return <SingleBed color={item.color} />
            case 'bed_bunk': return <BunkBed color={item.color} />
            case 'sofa': return <Sofa color={item.color} />
            case 'sofa_l': return <LShapedSofa color={item.color} />
            case 'sofa_ottoman': return <Ottoman color={item.color} />
            case 'window': return <Window color={item.color} />
            case 'painting': return <Painting color={item.color} />
            case 'mirror': return <Mirror color={item.color} />
            case 'tv': return <TV color={item.color} />
            case 'toilet': return <Toilet color={item.color} />
            case 'aircon': return <AirCon color={item.color} />
            case 'sink': return <Sink color={item.color} />
            case 'kitchen': return <Kitchen color={item.color} />
            case 'refrigerator': return <Refrigerator color={item.color} />
            case 'image':
                if (item.shapePoints) {
                    return <ExtrudedFurniture
                        shapePoints={item.shapePoints}
                        depth={1}
                        texture={texture}
                        color="#ffffff"
                    />
                }
                // Fallback for image without shape (shouldn't happen with new logic)
                return (
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[1, 1, 1]} />
                        {texture ? <meshBasicMaterial map={texture} /> : <meshStandardMaterial color={item.color} />}
                    </mesh>
                )
            default:
                return (
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={item.color} />
                    </mesh>
                )
        }
    }

    return (
        <>
            <group
                ref={meshRef}
                position={item.position}
                rotation={item.rotation}
                scale={item.scale}
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect(item.id)
                }}
            >
                {renderFurniture()}

                {/* Selection Highlight */}
                {isSelected && (
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.1, 1.1, 1.1]} />
                        <meshBasicMaterial color="#ff9900" wireframe transparent opacity={0.5} />
                    </mesh>
                )}
            </group>

            {isSelected && (
                <TransformControls
                    object={meshRef}
                    mode={gizmoMode}
                    onObjectChange={(e) => {
                        if (meshRef.current) {
                            const { position, rotation, scale } = meshRef.current

                            // Gravity Constraint: Keep on floor
                            // For composed objects (realistic), pivot is at bottom, so Y should be 0.
                            // For images/boxes (centered), pivot is at center, so Y should be scale.y / 2.

                            if (item.type === 'image') {
                                position.y = scale.y / 2
                            } else {
                                if (position.y < 0) position.y = 0
                            }

                            onUpdate(item.id, {
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

const Furniture = () => {
    const { furniture, selectedFurnitureId, selectFurniture, updateFurniture, gizmoMode } = useStore()
    const mode = useStore((state) => state.mode)

    return (
        <group>
            {furniture.map((item) => (
                <FurnitureItem
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedFurnitureId && mode === 'edit-furniture'}
                    onSelect={selectFurniture}
                    onUpdate={updateFurniture}
                />
            ))}
        </group>
    )
}

export default Furniture
