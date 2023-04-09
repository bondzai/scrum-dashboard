import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Scrum from './pages/Scrum';

function App() {
    return (
        <div>
            <Router>
                <div className='Navigation'>
                    <Navbar />
                </div>
                <div className="App">
                    <Routes>
                        <Route path='/' element={<Scrum />} />
                    </Routes>
                    <p> &copy; FOR SWD-DEV TEAM </p>
                </div>
            </Router>
        </div>
    )
}

export default App
