import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const useStore = create((set, get) => ({
    mode: 'view', // 'view', 'edit-structure', 'edit-furniture'
    setMode: (mode) => set({ mode, selectedFurnitureId: null, selectedStructureId: null }),

    gizmoMode: 'translate', // 'translate', 'rotate', 'scale'
    setGizmoMode: (mode) => set({ gizmoMode: mode }),

    // Structure State (Walls & Floors)
    walls: [],
    floors: [],
    roomHeight: 3, // Default height in meters
    selectedStructureId: null, // Can be a wall or a floor ID
    selectedStructureType: null, // 'wall' or 'floor'

    setRoomHeight: (height) => set((state) => ({
        roomHeight: height,
        walls: state.walls.map(w => ({
            ...w,
            scale: [w.scale[0], height, w.scale[2]],
            position: [w.position[0], height / 2, w.position[2]]
        }))
    })),

    // Initial Setup (Default Room)
    initializeDefaultRoom: () => {
        const floorId = uuidv4()
        const wall1 = uuidv4()
        const wall2 = uuidv4()
        const wall3 = uuidv4()
        const wall4 = uuidv4()
        const h = 3 // Default height

        set({
            roomHeight: h,
            floors: [{
                id: floorId,
                position: [0, 0, 0],
                rotation: [-Math.PI / 2, 0, 0],
                scale: [10, 10, 1],
                color: '#e0e0e0'
            }],
            walls: [
                { id: wall1, position: [0, h / 2, -5], rotation: [0, 0, 0], scale: [10, h, 0.2], color: '#ffffff', opacity: 0.5, transparent: true },
                { id: wall2, position: [0, h / 2, 5], rotation: [0, 0, 0], scale: [10, h, 0.2], color: '#ffffff', opacity: 0.5, transparent: true },
                { id: wall3, position: [-5, h / 2, 0], rotation: [0, Math.PI / 2, 0], scale: [10, h, 0.2], color: '#ffffff', opacity: 0.5, transparent: true },
                { id: wall4, position: [5, h / 2, 0], rotation: [0, Math.PI / 2, 0], scale: [10, h, 0.2], color: '#ffffff', opacity: 0.5, transparent: true },
            ]
        })
    },

    // Structure Actions
    addWall: () => set((state) => {
        const id = uuidv4()
        const h = state.roomHeight
        return {
            walls: [...state.walls, {
                id,
                position: [0, h / 2, 0],
                rotation: [0, 0, 0],
                scale: [5, h, 0.2],
                color: '#ffffff',
                opacity: 0.5,
                transparent: true
            }],
            selectedStructureId: id,
            selectedStructureType: 'wall'
        }
    }),

    addFloor: () => set((state) => {
        const id = uuidv4()
        return {
            floors: [...state.floors, {
                id,
                position: [0, 0, 0],
                rotation: [-Math.PI / 2, 0, 0],
                scale: [5, 5, 1],
                color: '#cccccc'
            }],
            selectedStructureId: id,
            selectedStructureType: 'floor'
        }
    }),

    selectStructure: (id, type) => set({ selectedStructureId: id, selectedStructureType: type, selectedFurnitureId: null }),

    updateWall: (id, updates) => set((state) => ({
        walls: state.walls.map((w) => w.id === id ? { ...w, ...updates } : w)
    })),

    updateFloor: (id, updates) => set((state) => ({
        floors: state.floors.map((f) => f.id === id ? { ...f, ...updates } : f)
    })),

    removeStructure: (id, type) => set((state) => {
        if (type === 'wall') {
            return { walls: state.walls.filter((w) => w.id !== id), selectedStructureId: null, selectedStructureType: null }
        } else {
            return { floors: state.floors.filter((f) => f.id !== id), selectedStructureId: null, selectedStructureType: null }
        }
    }),

    // Delete structure (wall or floor)
    deleteStructure: (id, type) => set((state) => {
        if (type === 'wall') {
            return { walls: state.walls.filter((w) => w.id !== id), selectedStructureId: null, selectedStructureType: null }
        } else {
            return { floors: state.floors.filter((f) => f.id !== id), selectedStructureId: null, selectedStructureType: null }
        }
    }),

    duplicateStructure: (id, type) => set((state) => {
        const newId = uuidv4()
        if (type === 'wall') {
            const item = state.walls.find((w) => w.id === id)
            if (!item) return {}
            return {
                walls: [...state.walls, { ...item, id: newId, position: [item.position[0] + 1, item.position[1], item.position[2] + 1] }],
                selectedStructureId: newId,
                selectedStructureType: 'wall'
            }
        } else {
            const item = state.floors.find((f) => f.id === id)
            if (!item) return {}
            return {
                floors: [...state.floors, { ...item, id: newId, position: [item.position[0] + 1, item.position[1], item.position[2] + 1] }],
                selectedStructureId: newId,
                selectedStructureType: 'floor'
            }
        }
    }),

    // Furniture State
    furniture: [],
    selectedFurnitureId: null,

    addFurniture: (type) => set((state) => {
        const id = uuidv4()
        let scale = [1, 1, 1]
        let yPos = 0.5

        // Match geometry sizes from Furniture.jsx
        switch (type) {
            case 'table':
                scale = [1.5, 0.8, 0.8]
                yPos = 0
                break
            case 'table_round':
                scale = [1.2, 0.8, 1.2]
                yPos = 0
                break
            case 'chair':
                scale = [0.5, 1, 0.5]
                yPos = 0
                break
            case 'bed':
                scale = [1.5, 0.6, 2]
                yPos = 0
                break
            case 'sofa':
                scale = [2, 0.8, 0.8]
                yPos = 0
                break
            case 'sofa_l':
                scale = [2.5, 0.8, 2.5]
                yPos = 0
                break
            case 'sofa_ottoman':
                scale = [0.8, 0.4, 0.8]
                yPos = 0
                break
            case 'chair':
                scale = [0.5, 1, 0.5]
                yPos = 0
                break
            case 'chair_office':
                scale = [0.6, 1.2, 0.6]
                yPos = 0
                break
            case 'chair_dining':
                scale = [0.5, 0.9, 0.5]
                yPos = 0
                break
            case 'bed':
                scale = [1.5, 0.6, 2]
                yPos = 0
                break
            case 'bed_single':
                scale = [1, 0.6, 2]
                yPos = 0
                break
            case 'bed_bunk':
                scale = [1, 1.8, 2]
                yPos = 0
                break
            case 'table':
                scale = [1.5, 0.8, 0.8]
                yPos = 0
                break
            case 'table_round':
                scale = [1.2, 0.8, 1.2]
                yPos = 0
                break
            case 'table_coffee':
                scale = [1.2, 0.4, 0.7]
                yPos = 0
                break
            case 'window':
                scale = [1.2, 1.5, 0.1]
                yPos = 1.5
                break
            case 'painting':
                scale = [1, 0.8, 0.05]
                yPos = 1.6
                break
            case 'mirror':
                scale = [0.8, 1.2, 0.05]
                yPos = 1.5
                break
            case 'tv':
                scale = [1.5, 0.9, 0.1]
                yPos = 0.45
                break
            case 'toilet':
                scale = [0.5, 0.7, 0.7]
                yPos = 0
                break
            case 'aircon':
                scale = [1, 0.3, 0.25]
                yPos = 2.5
                break
            case 'sink':
                scale = [0.6, 0.9, 0.5]
                yPos = 0
                break
            case 'kitchen':
                scale = [2, 0.9, 0.6]
                yPos = 0
                break
            case 'refrigerator':
                scale = [0.7, 1.8, 0.7]
                yPos = 0
                break
            default:
                scale = [1, 1, 1]
                yPos = 0.5
        }

        return {
            furniture: [
                ...state.furniture,
                {
                    id,
                    type,
                    position: [0, yPos, 0],
                    rotation: [0, 0, 0],
                    scale,
                    color: '#555555'
                }
            ],
            selectedFurnitureId: id,
            selectedStructureId: null
        }
    }),

    addImageFurniture: (url, shapePoints, aspectRatio) => set((state) => {
        const id = uuidv4()
        // Default height 1m, width based on aspect ratio
        const scale = [1 * aspectRatio, 1, 0.1] // Thicker for extrusion
        const yPos = 0.5

        return {
            furniture: [
                ...state.furniture,
                {
                    id,
                    type: 'image',
                    url,
                    shapePoints,
                    position: [0, yPos, 0],
                    rotation: [0, 0, 0],
                    scale,
                    color: '#ffffff'
                }
            ],
            selectedFurnitureId: id,
            selectedStructureId: null
        }
    }),

    selectFurniture: (id) => set({ selectedFurnitureId: id, selectedStructureId: null, selectedStructureType: null }),

    updateFurniture: (id, updates) => set((state) => ({
        furniture: state.furniture.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        )
    })),

    removeFurniture: (id) => set((state) => ({
        furniture: state.furniture.filter((item) => item.id !== id),
        selectedFurnitureId: null
    })),

    duplicateFurniture: (id) => set((state) => {
        const item = state.furniture.find((f) => f.id === id)
        if (!item) return {}

        const newId = uuidv4()
        return {
            furniture: [
                ...state.furniture,
                {
                    ...item,
                    id: newId,
                    position: [item.position[0] + 1, item.position[1], item.position[2] + 1]
                }
            ],
            selectedFurnitureId: newId
        }
    }),

    // Persistence
    saveLayout: () => {
        const state = get()
        const data = {
            walls: state.walls,
            floors: state.floors,
            furniture: state.furniture
        }
        localStorage.setItem('house-layout-v2', JSON.stringify(data))
        alert('Layout saved!')
    },

    loadLayout: () => {
        const data = localStorage.getItem('house-layout-v2')
        if (data) {
            const parsed = JSON.parse(data)
            set({
                walls: parsed.walls || [],
                floors: parsed.floors || [],
                furniture: parsed.furniture || [],
                selectedFurnitureId: null,
                selectedStructureId: null
            })
            alert('Layout loaded!')
        } else {
            alert('No saved layout found.')
        }
    },

    // Load template
    loadTemplate: (template) => {
        const { areas, furniture } = template

        // Convert areas to floors with position/scale format
        const floors = areas.map(area => {
            // Calculate bounding box from points
            const xs = area.points.map(p => p[0])
            const zs = area.points.map(p => p[1])
            const minX = Math.min(...xs)
            const maxX = Math.max(...xs)
            const minZ = Math.min(...zs)
            const maxZ = Math.max(...zs)

            const width = maxX - minX
            const depth = maxZ - minZ
            const centerX = (minX + maxX) / 2
            const centerZ = (minZ + maxZ) / 2

            return {
                id: area.id,
                name: area.name,
                points: area.points, // Keep points for area calculation
                position: [centerX, 0, centerZ],
                rotation: [0, 0, 0],
                scale: [width, 0.1, depth],
                color: area.floorColor,
                transparent: false,
                opacity: 1
            }
        })

        // Convert areas to walls
        const walls = []
        areas.forEach(area => {
            const points = area.points
            for (let i = 0; i < points.length; i++) {
                const start = points[i]
                const end = points[(i + 1) % points.length]

                // Calculate wall parameters
                const dx = end[0] - start[0]
                const dz = end[1] - start[1]
                const length = Math.sqrt(dx * dx + dz * dz)
                const centerX = (start[0] + end[0]) / 2
                const centerZ = (start[1] + end[1]) / 2
                const angle = Math.atan2(dz, dx)

                walls.push({
                    id: uuidv4(),
                    position: [centerX, area.height / 2, centerZ],
                    rotation: [0, angle, 0],
                    scale: [length, area.height, 0.1],
                    color: area.wallColor,
                    transparent: true,
                    opacity: 0.7
                })
            }
        })

        // Add furniture with IDs
        const furnitureWithIds = furniture.map(item => ({
            ...item,
            id: item.id || uuidv4()
        }))

        set({
            floors,
            walls,
            furniture: furnitureWithIds,
            selectedFurnitureId: null,
            selectedStructureId: null,
            roomHeight: areas[0]?.height || 2.7
        })
    }
}))

export default useStore
