import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;