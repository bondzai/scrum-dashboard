import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <h1> Scrum Dashboard </h1>
            <div>
                <Table/>
            </div>
        </div>
    )
}

export default App
