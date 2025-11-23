import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal'

export const removeBackground = async (imageSource) => {
    try {
        const blob = await imglyRemoveBackground(imageSource)
        return URL.createObjectURL(blob)
    } catch (error) {
        console.error('Background removal failed:', error)
        throw error
    }
}

export const processImage = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // Resize for processing speed (keep aspect ratio)
            const maxSize = 500
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width
                    width = maxSize
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height
                    height = maxSize
                }
            }

            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)

            const imageData = ctx.getImageData(0, 0, width, height)
            const data = imageData.data

            // 2. Extract Contour (Moore-Neighbor Tracing)
            const points = traceContour(data, width, height)

            // 3. Normalize Points to [-0.5, 0.5] range
            // Aspect ratio is width / height
            const aspectRatio = img.width / img.height
            const normalizedPoints = points.map(p => ({
                x: (p.x / width - 0.5) * aspectRatio, // Scale X by aspect ratio
                y: -(p.y / height - 0.5) // Flip Y for 3D coords
            }))

            resolve({
                shapePoints: normalizedPoints,
                aspectRatio
            })
        }
        img.onerror = reject
        img.src = imageUrl
    })
}

// Simple Moore-Neighbor Tracing
const traceContour = (data, width, height) => {
    const points = []
    const threshold = 128

    // Find start point
    let startX = -1
    let startY = -1

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4
            if (data[index + 3] > threshold) {
                startX = x
                startY = y
                break
            }
        }
        if (startX !== -1) break
    }

    if (startX === -1) return [] // Empty image

    points.push({ x: startX, y: startY })

    let x = startX
    let y = startY
    let dir = 0 // 0: N, 1: NE, 2: E, 3: SE, 4: S, 5: SW, 6: W, 7: NW
    // Actually standard Moore uses 8 directions.
    // Let's use a simpler boundary follow:
    // Current pixel P. Backtrack B.
    // Search clockwise from B for first non-zero pixel.

    // Directions: [dx, dy]
    const neighbors = [
        [0, -1], [1, -1], [1, 0], [1, 1],
        [0, 1], [-1, 1], [-1, 0], [-1, -1]
    ]

    let prevX = x
    let prevY = y - 1 // Start coming from North

    // Max iterations to prevent infinite loop
    let maxIter = width * height * 2
    let iter = 0

    // Helper to check pixel
    const isSolid = (px, py) => {
        if (px < 0 || px >= width || py < 0 || py >= height) return false
        return data[(py * width + px) * 4 + 3] > threshold
    }

    // Find initial direction from start to prev (backtrack)
    // Actually, standard algorithm:
    // B = backtrack direction (from neighbor to current)
    // Search clockwise starting from B.

    // Let's use a simpler approach: "Turtle" algorithm (always turn left if solid, right if empty) works for simple shapes.
    // But Moore is better.
    // Let's stick to a simplified version:
    // 1. Find first pixel (done).
    // 2. Check 8 neighbors clockwise starting from "back".

    let currentDir = 7 // Start checking from NW?
    // Let's just use a robust library-free implementation logic

    // Reset for loop
    x = startX
    y = startY
    // Backtrack is conceptually "up" (0,-1) relative to start, so we start searching from there?
    // Let's try a known working snippet logic for Moore

    let b = 0 // Backtrack direction index (0-7)
    // Initial backtrack is "Up" (0) -> neighbor index 6 (West)? No.
    // Let's assume we entered from West (-1, 0).
    // We search clockwise from West.

    // Let's try a simpler "Marching Squares" approach which is easier to implement robustly without edge cases.
    // Actually, for "furniture", a simple Convex Hull might be too loose, but a detailed contour is good.
    // Let's try a simplified radial sweep if Moore is too complex to get right in one shot.

    // RE-ATTEMPT MOORE:
    // Start at S. Enter from P (previous).
    // Scan neighbors of S clockwise starting from P.
    // First solid neighbor becomes new S. P becomes old S.

    // Initial state: S = (startX, startY). P = (startX, startY-1) (dummy).
    let cx = startX
    let cy = startY
    let px = startX - 1 // Assume we came from left
    let py = startY

    // Find valid P (first empty neighbor)
    // Actually, just find the first solid neighbor of StartX, StartY

    // Let's use a VERY simple approach:
    // 1. Scan lines to find left/right bounds for each Y? No, that's not a contour.

    // Let's use a "Walk around" logic:
    // Always keep "solid" on your right.
    // Move forward. If solid, turn left. If empty, turn right.
    // This is for 4-connectivity.

    const dirs4 = [[1, 0], [0, 1], [-1, 0], [0, -1]] // E, S, W, N
    let cd = 0 // Facing East

    // Adjust start to be on the boundary. We found (startX, startY) which is solid.
    // We need to start "outside" or just on the edge.
    // Let's start at (startX, startY) and face East.

    cx = startX
    cy = startY

    // We need to ensure we are on the edge. (startX-1, startY) is empty.
    // So if we face North, Left is empty.
    // Let's face North (3).
    cd = 3

    const startPos = `${cx},${cy}`

    while (iter < maxIter) {
        // Check "Left" relative to current direction
        // Left of N is W.
        // Left of E is N.
        // Left of S is E.
        // Left of W is S.
        // (cd + 3) % 4

        const leftDir = (cd + 3) % 4
        const leftX = cx + dirs4[leftDir][0]
        const leftY = cy + dirs4[leftDir][1]

        if (isSolid(leftX, leftY)) {
            // Turn left and move
            cd = leftDir
            cx = leftX
            cy = leftY
        } else {
            // Check "Forward"
            const fwdX = cx + dirs4[cd][0]
            const fwdY = cy + dirs4[cd][1]

            if (isSolid(fwdX, fwdY)) {
                // Move forward
                cx = fwdX
                cy = fwdY
            } else {
                // Turn right (don't move yet)
                cd = (cd + 1) % 4
            }
        }

        // Add point if it's new (simplify)
        const last = points[points.length - 1]
        if (last.x !== cx || last.y !== cy) {
            // Simplify: only add if direction changed?
            // For smooth curves, we want points.
            // Let's add every 5th point to reduce count?
            // Or just add all and simplify later.
            points.push({ x: cx, y: cy })
        }

        if (cx === startX && cy === startY && iter > 10) break
        iter++
    }

    // Simplify points (Douglas-Peucker or just distance threshold)
    const simplified = []
    if (points.length > 0) {
        simplified.push(points[0])
        for (let i = 1; i < points.length; i++) {
            const p1 = simplified[simplified.length - 1]
            const p2 = points[i]
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
            if (dist > 5) { // Threshold 5 pixels
                simplified.push(p2)
            }
        }
    }

    return simplified
}
