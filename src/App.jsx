import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scrum from './pages/Scrum';
import Sidebar from "./components/Sidebar";

function App() {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Scrum />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
