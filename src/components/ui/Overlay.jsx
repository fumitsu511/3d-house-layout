import React, { useRef, useState, useCallback } from 'react'
import useStore from '../../store'
import { removeBackground } from '@imgly/background-removal'
import { houseTemplates } from '../../data/templates'

const Overlay = () => {
    const mode = useStore((state) => state.mode)
    const setMode = useStore((state) => state.setMode)
    const addWall = useStore((state) => state.addWall)
    const addFloor = useStore((state) => state.addFloor)
    const walls = useStore((state) => state.walls)
    const floors = useStore((state) => state.floors)
    const selectedStructureId = useStore((state) => state.selectedStructureId)
    const selectedStructureType = useStore((state) => state.selectedStructureType)
    const duplicateStructure = useStore((state) => state.duplicateStructure)
    const deleteStructure = useStore((state) => state.deleteStructure)
    const updateStructureColor = useStore((state) => state.updateStructureColor)
    const furniture = useStore((state) => state.furniture)
    const selectedFurnitureId = useStore((state) => state.selectedFurnitureId)
    const duplicateFurniture = useStore((state) => state.duplicateFurniture)
    const deleteFurniture = useStore((state) => state.deleteFurniture)
    const updateFurnitureColor = useStore((state) => state.updateFurnitureColor)
    const updateFurnitureScale = useStore((state) => state.updateFurnitureScale)
    const updateFurnitureRotation = useStore((state) => state.updateFurnitureRotation)
    const updateFurniture = useStore((state) => state.updateFurniture)
    const roomHeight = useStore((state) => state.roomHeight)
    const setRoomHeight = useStore((state) => state.setRoomHeight)
    const gizmoMode = useStore((state) => state.gizmoMode)
    const setGizmoMode = useStore((state) => state.setGizmoMode)
    const addFurniture = useStore((state) => state.addFurniture)
    const saveLayout = useStore((state) => state.saveLayout)
    const loadLayout = useStore((state) => state.loadLayout)
    const addImageFurniture = useStore((state) => state.addImageFurniture)
    const loadTemplate = useStore((state) => state.loadTemplate)

    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const buttonStyle = {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginRight: '8px',
        marginBottom: '8px'
    }

    const activeStyle = { ...buttonStyle, background: '#3b82f6', color: 'white' }
    const inactiveStyle = { ...buttonStyle, background: '#e5e7eb', color: '#374151' }

    const getSelectedStructure = () => {
        if (selectedStructureType === 'wall') {
            return walls.find(w => w.id === selectedStructureId)
        } else if (selectedStructureType === 'floor') {
            return floors.find(f => f.id === selectedStructureId)
        }
        return null
    }

    const selectedStructure = getSelectedStructure()
    const selectedFurniture = useStore((state) => state.furniture.find(f => f.id === selectedFurnitureId))

    // Calculate total area - handle both scale-based and points-based floors
    const calculateFloorArea = (floor) => {
        if (floor.scale) {
            // Old format: scale-based
            return floor.scale[0] * floor.scale[1]
        } else if (floor.points) {
            // New format: points-based (polygon)
            // Use Shoelace formula for polygon area
            const points = floor.points
            let area = 0
            for (let i = 0; i < points.length; i++) {
                const j = (i + 1) % points.length
                area += points[i][0] * points[j][1]
                area -= points[j][0] * points[i][1]
            }
            return Math.abs(area / 2)
        }
        return 0
    }

    const totalArea = floors.reduce((acc, f) => acc + calculateFloorArea(f), 0).toFixed(2)

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setIsProcessing(true)
            try {
                // 1. Remove Background
                const cleanImageUrl = await removeBackground(file)

                // 2. Process Image (Contour, Aspect Ratio)
                const { shapePoints, aspectRatio } = await processImage(cleanImageUrl)

                // 3. Add to Scene
                addImageFurniture(cleanImageUrl, shapePoints, aspectRatio)
            } catch (error) {
                console.error('Image processing failed:', error)
                alert('画像の処理に失敗しました。')
            } finally {
                setIsProcessing(false)
            }
        }
    }

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

            {/* Top Bar: Modes & Persistence & Global Settings */}
            <div style={{ position: 'absolute', top: 20, left: 20, pointerEvents: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <button
                        style={mode === 'view' ? activeStyle : inactiveStyle}
                        onClick={() => setMode('view')}
                    >
                        閲覧モード
                    </button>
                    <button
                        style={mode === 'edit-structure' ? activeStyle : inactiveStyle}
                        onClick={() => setMode('edit-structure')}
                    >
                        構造編集
                    </button>
                    <button
                        style={mode === 'edit-furniture' ? activeStyle : inactiveStyle}
                        onClick={() => setMode('edit-furniture')}
                    >
                        家具編集
                    </button>
                    <button
                        style={mode === 'templates' ? activeStyle : inactiveStyle}
                        onClick={() => setMode('templates')}
                    >
                        テンプレート
                    </button>
                </div>

                <div style={{ marginRight: '20px', background: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>総面積: {totalArea} m²</span>

                    <label style={{ marginRight: '5px', fontWeight: 'bold' }}>天井高:</label>
                    <input
                        type="number"
                        min="2" max="10" step="0.1"
                        value={roomHeight}
                        onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
                        style={{ width: '60px', padding: '4px' }}
                    />
                    <span style={{ marginLeft: '5px' }}>m</span>
                </div>

                <div style={{ marginRight: '20px', background: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>操作:</span>
                    <button
                        style={gizmoMode === 'translate' ? activeStyle : inactiveStyle}
                        onClick={() => setGizmoMode('translate')}
                    >
                        移動
                    </button>
                    <button
                        style={gizmoMode === 'scale' ? activeStyle : inactiveStyle}
                        onClick={() => setGizmoMode('scale')}
                    >
                        拡大縮小
                    </button>
                    <button
                        style={gizmoMode === 'rotate' ? activeStyle : inactiveStyle}
                        onClick={() => setGizmoMode('rotate')}
                    >
                        回転
                    </button>
                </div>

                <div>
                    <button style={inactiveStyle} onClick={saveLayout}>保存</button>
                    <button style={inactiveStyle} onClick={loadLayout}>読み込み</button>
                </div>
            </div>

            {/* Structure Controls */}
            {mode === 'edit-structure' && (
                <div style={{ position: 'absolute', top: 80, left: 20, pointerEvents: 'auto', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto' }}>
                    <h3>構造ツール</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <button style={inactiveStyle} onClick={addWall}>壁を追加</button>
                        <button style={inactiveStyle} onClick={addFloor}>床を追加</button>
                    </div>

                    {selectedStructure && (
                        <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                            <h4>選択中: {selectedStructureType === 'wall' ? '壁' : '床'}</h4>

                            <div style={{ marginBottom: '10px' }}>
                                <label>色</label>
                                <input
                                    type="color"
                                    value={selectedStructure.color}
                                    onChange={(e) => {
                                        if (selectedStructureType === 'wall') updateWall(selectedStructure.id, { color: e.target.value })
                                        else updateFloor(selectedStructure.id, { color: e.target.value })
                                    }}
                                    style={{ display: 'block', marginTop: '5px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>サイズ (m)</label>
                                <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>幅 (X)</label>
                                        <input
                                            type="number" step="0.1"
                                            value={selectedStructure.scale[0]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                if (selectedStructureType === 'wall') updateWall(selectedStructure.id, { scale: [val, selectedStructure.scale[1], selectedStructure.scale[2]] })
                                                else updateFloor(selectedStructure.id, { scale: [val, selectedStructure.scale[1], selectedStructure.scale[2]] })
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>{selectedStructureType === 'floor' ? '奥行 (Y)' : '高さ (Y)'}</label>
                                        <input
                                            type="number" step="0.1"
                                            value={selectedStructure.scale[1]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                if (selectedStructureType === 'wall') {
                                                    // Update height and position to keep on ground
                                                    updateWall(selectedStructure.id, {
                                                        scale: [selectedStructure.scale[0], val, selectedStructure.scale[2]],
                                                        position: [selectedStructure.position[0], val / 2, selectedStructure.position[2]]
                                                    })
                                                } else {
                                                    updateFloor(selectedStructure.id, { scale: [selectedStructure.scale[0], val, selectedStructure.scale[2]] })
                                                }
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>厚さ (Z)</label>
                                        <input
                                            type="number" step="0.05"
                                            value={selectedStructure.scale[2]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                if (selectedStructureType === 'wall') updateWall(selectedStructure.id, { scale: [selectedStructure.scale[0], selectedStructure.scale[1], val] })
                                                else updateFloor(selectedStructure.id, { scale: [selectedStructure.scale[0], selectedStructure.scale[1], val] })
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {selectedStructureType === 'wall' && (
                                <>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedStructure.transparent}
                                                onChange={(e) => updateWall(selectedStructure.id, { transparent: e.target.checked })}
                                            /> 半透明
                                        </label>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label>不透明度: {selectedStructure.opacity}</label>
                                        <input
                                            type="range" min="0" max="1" step="0.1"
                                            value={selectedStructure.opacity}
                                            onChange={(e) => updateWall(selectedStructure.id, { opacity: parseFloat(e.target.value) })}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </>
                            )}

                            <div style={{ marginTop: '10px' }}>
                                <button style={{ ...inactiveStyle, background: '#ef4444', color: 'white' }} onClick={() => deleteStructure(selectedStructure.id, selectedStructureType)}>削除</button>
                                <button style={inactiveStyle} onClick={() => duplicateStructure(selectedStructure.id, selectedStructureType)}>複製</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Furniture Controls */}
            {mode === 'edit-furniture' && (
                <div style={{ position: 'absolute', top: 80, left: 20, pointerEvents: 'auto', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto', width: '250px' }}>
                    <h3>家具を追加</h3>

                    {!selectedCategory ? (
                        // Category Selection
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('sofa')}>ソファ</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('chair')}>椅子</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('bed')}>ベッド</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('table')}>テーブル</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('wall')}>壁掛けアイテム</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('appliance')}>家電・設備</button>
                            <button style={inactiveStyle} onClick={() => setSelectedCategory('image')}>画像を追加</button>
                        </div>
                    ) : (
                        // Item Selection within Category
                        <div>
                            <button style={{ ...inactiveStyle, marginBottom: '15px' }} onClick={() => setSelectedCategory(null)}>← カテゴリに戻る</button>

                            {selectedCategory === 'sofa' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>ソファ</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('sofa')}>ソファ</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('sofa_l')}>L字ソファ</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('sofa_ottoman')}>オットマン</button>
                                </div>
                            )}

                            {selectedCategory === 'chair' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>椅子</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('chair')}>椅子</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('chair_office')}>オフィスチェア</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('chair_dining')}>ダイニングチェア</button>
                                </div>
                            )}

                            {selectedCategory === 'bed' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>ベッド</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('bed')}>ダブルベッド</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('bed_single')}>シングルベッド</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('bed_bunk')}>二段ベッド</button>
                                </div>
                            )}

                            {selectedCategory === 'table' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>テーブル</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('table')}>テーブル (四角)</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('table_round')}>テーブル (丸)</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('table_coffee')}>コーヒーテーブル</button>
                                </div>
                            )}

                            {selectedCategory === 'wall' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>壁掛けアイテム</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('window')}>窓</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('painting')}>絵</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('mirror')}>鏡</button>
                                </div>
                            )}

                            {selectedCategory === 'appliance' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>家電・設備</h4>
                                    <button style={inactiveStyle} onClick={() => addFurniture('tv')}>テレビ</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('refrigerator')}>冷蔵庫</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('kitchen')}>キッチン</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('sink')}>洗面所</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('toilet')}>トイレ</button>
                                    <button style={inactiveStyle} onClick={() => addFurniture('aircon')}>エアコン</button>
                                </div>
                            )}

                            {selectedCategory === 'image' && (
                                <div>
                                    <h4 style={{ margin: '0 0 8px 0' }}>画像を追加</h4>
                                    <label style={{ ...inactiveStyle, display: 'block', textAlign: 'center', cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.6 : 1 }}>
                                        {isProcessing ? '処理中...' : '画像を選択'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                            disabled={isProcessing}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    )}

                    {selectedFurniture && (
                        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                            <h4>選択中の家具</h4>

                            <div style={{ marginBottom: '10px' }}>
                                <label>色</label>
                                <input
                                    type="color"
                                    value={selectedFurniture.color}
                                    onChange={(e) => updateFurniture(selectedFurniture.id, { color: e.target.value })}
                                    style={{ display: 'block', marginTop: '5px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>サイズ (m)</label>
                                <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>幅 (X)</label>
                                        <input
                                            type="number" step="0.1"
                                            value={selectedFurniture.scale[0]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                updateFurniture(selectedFurniture.id, { scale: [val, selectedFurniture.scale[1], selectedFurniture.scale[2]] })
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>高さ (Y)</label>
                                        <input
                                            type="number" step="0.1"
                                            value={selectedFurniture.scale[1]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                // If image, it's centered, so we need to adjust Y to keep on floor.
                                                // If realistic furniture, it's floored (pivot at bottom), so just scale.
                                                if (selectedFurniture.type === 'image') {
                                                    updateFurniture(selectedFurniture.id, {
                                                        scale: [selectedFurniture.scale[0], val, selectedFurniture.scale[2]],
                                                        position: [selectedFurniture.position[0], val / 2, selectedFurniture.position[2]]
                                                    })
                                                } else {
                                                    updateFurniture(selectedFurniture.id, {
                                                        scale: [selectedFurniture.scale[0], val, selectedFurniture.scale[2]]
                                                    })
                                                }
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '12px' }}>奥行 (Z)</label>
                                        <input
                                            type="number" step="0.1"
                                            value={selectedFurniture.scale[2]}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value)
                                                updateFurniture(selectedFurniture.id, { scale: [selectedFurniture.scale[0], selectedFurniture.scale[1], val] })
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ fontSize: '12px' }}>回転 (Y軸 - 度)</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedFurniture.rotation[1] * (180 / Math.PI))}
                                    onChange={(e) => {
                                        const deg = parseFloat(e.target.value)
                                        const rad = deg * (Math.PI / 180)
                                        updateFurniture(selectedFurniture.id, {
                                            rotation: [selectedFurniture.rotation[0], rad, selectedFurniture.rotation[2]]
                                        })
                                    }}
                                    style={{ width: '100%', marginTop: '5px' }}
                                />
                            </div>

                            <button style={{ ...inactiveStyle, background: '#ef4444', color: 'white' }} onClick={() => removeFurniture(selectedFurnitureId)}>削除</button>
                            <button style={inactiveStyle} onClick={() => duplicateFurniture(selectedFurnitureId)}>複製</button>
                        </div>
                    )}
                </div>
            )}

            {/* Template Selection */}
            {mode === 'templates' && (
                <div style={{ position: 'absolute', top: 80, left: 20, pointerEvents: 'auto', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto', width: '300px' }}>
                    <h3>テンプレートを選択</h3>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '0' }}>家のテンプレートを読み込んで、編集を始めましょう。</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {houseTemplates.map(template => (
                            <div key={template.id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '12px',
                                cursor: 'pointer',
                                backgroundColor: '#fff'
                            }} onClick={() => {
                                loadTemplate(template)
                                setMode('view')
                            }}>
                                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{template.name}</h4>
                                <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{template.description}</p>
                                <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#999' }}>
                                    {template.areas.length}部屋 • {template.furniture.length}アイテム
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div style={{ position: 'absolute', bottom: 20, left: 20, pointerEvents: 'none', color: 'white', textShadow: '0 1px 2px black' }}>
                <p>左クリック: 選択 | 右クリック: 回転 | スクロール: ズーム</p>
            </div>
        </div>
    )
}

export default Overlay
