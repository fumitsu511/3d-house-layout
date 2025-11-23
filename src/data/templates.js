import { v4 as uuidv4 } from 'uuid'

// Template データ: 5つの完全な家のデザイン
export const houseTemplates = [
    {
        id: 'modern',
        name: 'モダンハウス',
        description: 'シンプルで洗練された現代的なデザイン',
        areas: [
            {
                id: uuidv4(),
                name: 'リビング',
                points: [[0, 0], [6, 0], [6, 5], [0, 5]],
                height: 2.7,
                floorColor: '#4a4a4a',
                wallColor: '#ffffff'
            },
            {
                id: uuidv4(),
                name: 'キッチン',
                points: [[6, 0], [10, 0], [10, 3], [6, 3]],
                height: 2.7,
                floorColor: '#4a4a4a',
                wallColor: '#f5f5f5'
            },
            {
                id: uuidv4(),
                name: '寝室',
                points: [[6, 3], [10, 3], [10, 7], [6, 7]],
                height: 2.7,
                floorColor: '#5a5a5a',
                wallColor: '#e8e8e8'
            },
            {
                id: uuidv4(),
                name: 'バスルーム',
                points: [[10, 0], [12, 0], [12, 2], [10, 2]],
                height: 2.7,
                floorColor: '#6a6a6a',
                wallColor: '#ffffff'
            }
        ],
        furniture: [
            { type: 'sofa', position: [2, 0, 2.5], rotation: [0, 0, 0], scale: [2, 0.8, 0.8], color: '#2c2c2c' },
            { type: 'table_coffee', position: [2, 0, 1], rotation: [0, 0, 0], scale: [1.2, 0.4, 0.7], color: '#1a1a1a' },
            { type: 'tv', position: [2, 0, 4.5], rotation: [0, Math.PI, 0], scale: [1.5, 0.9, 0.1], color: '#2c2c2c' },
            { type: 'table', position: [8, 0, 1.5], rotation: [0, 0, 0], scale: [1.5, 0.8, 0.8], color: '#3a3a3a' },
            { type: 'chair_dining', position: [7.3, 0, 1.2], rotation: [0, Math.PI / 4, 0], scale: [0.5, 0.9, 0.5], color: '#2c2c2c' },
            { type: 'chair_dining', position: [8.7, 0, 1.8], rotation: [0, -Math.PI / 4, 0], scale: [0.5, 0.9, 0.5], color: '#2c2c2c' },
            { type: 'kitchen', position: [9, 0, 2.5], rotation: [0, 0, 0], scale: [2, 0.9, 0.6], color: '#ffffff' },
            { type: 'refrigerator', position: [7, 0, 0.35], rotation: [0, Math.PI / 2, 0], scale: [0.7, 1.8, 0.7], color: '#e0e0e0' },
            { type: 'bed', position: [8, 0, 5], rotation: [0, 0, 0], scale: [1.5, 0.6, 2], color: '#3a3a3a' },
            { type: 'toilet', position: [11, 0, 0.8], rotation: [0, Math.PI / 2, 0], scale: [0.5, 0.7, 0.7], color: '#ffffff' },
            { type: 'sink', position: [11, 0, 1.5], rotation: [0, Math.PI, 0], scale: [0.6, 0.9, 0.5], color: '#f0f0f0' }
        ]
    },
    {
        id: 'nordic',
        name: '北欧ハウス',
        description: '明るく温かみのある北欧スタイル',
        areas: [
            {
                id: uuidv4(),
                name: 'リビング・ダইニング',
                points: [[0, 0], [7, 0], [7, 6], [0, 6]],
                height: 2.8,
                floorColor: '#d4c5b9',
                wallColor: '#f9f6f2'
            },
            {
                id: uuidv4(),
                name: 'キッチン',
                points: [[7, 0], [10.5, 0], [10.5, 3], [7, 3]],
                height: 2.8,
                floorColor: '#d4c5b9',
                wallColor: '#ffffff'
            },
            {
                id: uuidv4(),
                name: '寝室',
                points: [[7, 3], [11.5, 3], [11.5, 7], [7, 7]],
                height: 2.8,
                floorColor: '#e5d5c5',
                wallColor: '#faf8f5'
            },
            {
                id: uuidv4(),
                name: 'バスルーム',
                points: [[10.5, 0], [12.5, 0], [12.5, 2], [10.5, 2]],
                height: 2.8,
                floorColor: '#c8b8a8',
                wallColor: '#ffffff'
            }
        ],
        furniture: [
            { type: 'sofa', position: [2, 0, 4.5], rotation: [0, Math.PI, 0], scale: [2, 0.8, 0.8], color: '#b8c5d6' },
            { type: 'sofa_ottoman', position: [2, 0, 3], rotation: [0, 0, 0], scale: [0.8, 0.4, 0.8], color: '#d4b896' },
            { type: 'table_round', position: [2.5, 0, 2], rotation: [0, 0, 0], scale: [1.2, 0.8, 1.2], color: '#a89070' },
            { type: 'chair_dining', position: [1.8, 0, 1.5], rotation: [0, Math.PI / 6, 0], scale: [0.5, 0.9, 0.5], color: '#f0e8dc' },
            { type: 'chair_dining', position: [3.2, 0, 2.5], rotation: [0, -Math.PI / 6, 0], scale: [0.5, 0.9, 0.5], color: '#f0e8dc' },
            { type: 'kitchen', position: [8.75, 0, 1.5], rotation: [0, 0, 0], scale: [2, 0.9, 0.6], color: '#ffffff' },
            { type: 'refrigerator', position: [7.5, 0, 0.35], rotation: [0, Math.PI / 2, 0], scale: [0.7, 1.8, 0.7], color: '#f5f5f5' },
            { type: 'bed_single', position: [9, 0, 5], rotation: [0, 0, 0], scale: [1, 0.6, 2], color: '#c8b8a8' },
            { type: 'toilet', position: [11.5, 0, 0.8], rotation: [0, Math.PI / 2, 0], scale: [0.5, 0.7, 0.7], color: '#ffffff' },
            { type: 'sink', position: [11.5, 0, 1.5], rotation: [0, Math.PI, 0], scale: [0.6, 0.9, 0.5], color: '#ffffff' }
        ]
    },
    {
        id: 'natural',
        name: 'ナチュラルハウス',
        description: '自然素材と温かみのあるデザイン',
        areas: [
            { // リビング
                id: uuidv4(),
                name: 'リビング',
                points: [[0, 0], [7, 0], [7, 6], [0, 6]], // expanded
                height: 2.7,
                floorColor: '#c9a87c',
                wallColor: '#f5ebe0'
            },
            { // ダイニング
                id: uuidv4(),
                name: 'ダイニング',
                points: [[7, 0], [12, 0], [12, 5], [7, 5]], // expanded
                height: 2.7,
                floorColor: '#c9a87c',
                wallColor: '#f0e8dc'
            },
            { // 寝室1
                id: uuidv4(),
                name: '寝室1',
                points: [[12, 0], [17, 0], [17, 5], [12, 5]], // expanded
                height: 2.7,
                floorColor: '#d4c0a0',
                wallColor: '#faf5ef'
            },
            { // 寝室2
                id: uuidv4(),
                name: '寝室2',
                points: [[7, 5], [12, 5], [12, 9], [7, 9]], // expanded
                height: 2.7,
                floorColor: '#d4c0a0',
                wallColor: '#faf5ef'
            },
            { // バスルーム
                id: uuidv4(),
                name: 'バスルーム',
                points: [[12, 5], [15, 5], [15, 8], [12, 8]], // expanded
                height: 2.7,
                floorColor: '#b8a890',
                wallColor: '#ffffff'
            }
        ],
        furniture: [
            { type: 'sofa_l', position: [1.5, 0, 2.5], rotation: [0, 0, 0], scale: [2.5, 0.8, 2.5], color: '#a86f3c' },
            { type: 'table_coffee', position: [2.5, 0, 1.5], rotation: [0, 0, 0], scale: [1.2, 0.4, 0.7], color: '#7a5230' },
            { type: 'table', position: [7.5, 0, 2], rotation: [0, 0, 0], scale: [1.5, 0.8, 0.8], color: '#8b6f47' },
            { type: 'chair_dining', position: [6.8, 0, 1.5], rotation: [0, Math.PI / 6, 0], scale: [0.5, 0.9, 0.5], color: '#9d7f5a' },
            { type: 'chair_dining', position: [8.2, 0, 2.5], rotation: [0, -Math.PI / 6, 0], scale: [0.5, 0.9, 0.5], color: '#9d7f5a' },
            { type: 'kitchen', position: [7.5, 0, 3.5], rotation: [0, Math.PI, 0], scale: [2, 0.9, 0.6], color: '#d9c5a8' },
            { type: 'refrigerator', position: [6, 0, 3.65], rotation: [0, Math.PI / 2, 0], scale: [0.7, 1.8, 0.7], color: '#f0e8dc' },
            { type: 'bed', position: [11.5, 0, 2], rotation: [0, Math.PI / 2, 0], scale: [1.5, 0.6, 2], color: '#8b6f47' },
            { type: 'bed_bunk', position: [7, 0, 5.75], rotation: [0, 0, 0], scale: [1, 1.8, 2], color: '#9d7f5a' },
            { type: 'toilet', position: [10, 0, 5], rotation: [0, Math.PI / 2, 0], scale: [0.5, 0.7, 0.7], color: '#ffffff' },
            { type: 'sink', position: [10, 0, 6], rotation: [0, Math.PI, 0], scale: [0.6, 0.9, 0.5], color: '#f5f5f5' }
        ]
    },
    {
        id: 'japanese',
        name: '和モダンハウス',
        description: '日本の伝統と現代の融合',
        areas: [
            {
                id: uuidv4(),
                name: 'リビング',
                points: [[0, 0], [6, 0], [6, 5.5], [0, 5.5]],
                height: 2.6,
                floorColor: '#d9cdb5',
                wallColor: '#f5f0e8'
            },
            {
                id: uuidv4(),
                name: '和室',
                points: [[6, 0], [10.5, 0], [10.5, 4.5], [6, 4.5]],
                height: 2.6,
                floorColor: '#c8b89f',
                wallColor: '#fffef9'
            },
            {
                id: uuidv4(),
                name: 'キッチン',
                points: [[6, 4.5], [10, 4.5], [10, 7.5], [6, 7.5]],
                height: 2.6,
                floorColor: '#d9cdb5',
                wallColor: '#f5f0e8'
            },
            {
                id: uuidv4(),
                name: 'バス',
                points: [[10, 4.5], [12, 4.5], [12, 7], [10, 7]],
                height: 2.6,
                floorColor: '#b8a890',
                wallColor: '#ffffff'
            }
        ],
        furniture: [
            { type: 'sofa', position: [2, 0, 2.5], rotation: [0, 0, 0], scale: [2, 0.8, 0.8], color: '#7a6954' },
            { type: 'table_coffee', position: [2, 0, 1.2], rotation: [0, 0, 0], scale: [1.2, 0.4, 0.7], color: '#5a4a3a' },
            { type: 'sofa_ottoman', position: [8.25, 0, 2.25], rotation: [0, 0, 0], scale: [0.8, 0.4, 0.8], color: '#8b7355' },
            { type: 'table_round', position: [8.25, 0, 1.5], rotation: [0, 0, 0], scale: [0.9, 0.35, 0.9], color: '#6a5444' },
            { type: 'bed_single', position: [8.25, 0, 3.5], rotation: [0, 0, 0], scale: [1, 0.6, 2], color: '#9d8f7a' },
            { type: 'kitchen', position: [8, 0, 6], rotation: [0, 0, 0], scale: [2, 0.9, 0.6], color: '#e8dcc8' },
            { type: 'refrigerator', position: [6.5, 0, 5.35], rotation: [0, Math.PI / 2, 0], scale: [0.7, 1.8, 0.7], color: '#f5f0e8' },
            { type: 'toilet', position: [11, 0, 5.3], rotation: [0, Math.PI / 2, 0], scale: [0.5, 0.7, 0.7], color: '#ffffff' },
            { type: 'sink', position: [11, 0, 6.3], rotation: [0, Math.PI, 0], scale: [0.6, 0.9, 0.5], color: '#ffffff' }
        ]
    },
    {
        id: 'compact',
        name: 'コンパクトハウス',
        description: '効率的な一人暮らし向けデザイン',
        areas: [
            {
                id: uuidv4(),
                name: 'リビング・寝室',
                points: [[0, 0], [6, 0], [6, 4], [0, 4]],
                height: 2.5,
                floorColor: '#e8e8e8',
                wallColor: '#fafafa'
            },
            {
                id: uuidv4(),
                name: 'キッチン',
                points: [[6, 0], [8, 0], [8, 2], [6, 2]],
                height: 2.5,
                floorColor: '#e0e0e0',
                wallColor: '#ffffff'
            },
            {
                id: uuidv4(),
                name: 'バスルーム',
                points: [[6, 2], [7.5, 2], [7.5, 4], [6, 4]],
                height: 2.5,
                floorColor: '#d8d8d8',
                wallColor: '#ffffff'
            }
        ],
        furniture: [
            { type: 'sofa', position: [3, 0, 1], rotation: [0, 0, 0], scale: [2, 0.8, 0.8], color: '#7a8c9e' },
            { type: 'table_coffee', position: [3, 0, 2.5], rotation: [0, 0, 0], scale: [1.2, 0.4, 0.7], color: '#5a6a7a' },
            { type: 'chair_office', position: [1, 0, 3], rotation: [0, Math.PI / 2, 0], scale: [0.6, 1.2, 0.6], color: '#4a5a6a' },
            { type: 'tv', position: [5.5, 0, 0.5], rotation: [0, Math.PI, 0], scale: [1.5, 0.9, 0.1], color: '#3a3a3a' },
            { type: 'kitchen', position: [7, 0, 1], rotation: [0, Math.PI / 2, 0], scale: [1.5, 0.9, 0.6], color: '#f5f5f5' },
            { type: 'refrigerator', position: [7.65, 0, 0.35], rotation: [0, Math.PI, 0], scale: [0.7, 1.8, 0.7], color: '#e8e8e8' },
            { type: 'toilet', position: [6.7, 0, 3], rotation: [0, Math.PI / 2, 0], scale: [0.5, 0.7, 0.7], color: '#ffffff' },
            { type: 'sink', position: [6.25, 0, 2.4], rotation: [0, 0, 0], scale: [0.6, 0.9, 0.5], color: '#f0f0f0' }
        ]
    }
]
