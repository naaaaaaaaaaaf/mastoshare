import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShareComponent from './ShareComponent.jsx';
import SettingsComponent from './SettingsComponent.jsx';
import HomePage from './HomePage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/share" element={<ShareComponent />} />
                <Route path="/post.php" element={<ShareComponent />} />
                <Route path="/settings" element={<SettingsComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
