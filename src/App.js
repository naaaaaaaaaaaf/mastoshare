import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShareComponent from './ShareComponent'; // 先ほど作成したMyComponentをインポートします
import SettingsComponent from "./SettingsComponent";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/share" element={<ShareComponent />} />
      <Route path="/share.php" element={<ShareComponent />} />
      <Route path="/settings" element={<SettingsComponent />} />
        {/* 他のルートをここに追加します */}
      </Routes>
    </Router>
  );
}

export default App;
