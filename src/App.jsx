import React from 'react'
import Scene from './components/3d/Scene'
import Overlay from './components/ui/Overlay'

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Scene />
            <Overlay />
        </div>
    )
}

export default App
