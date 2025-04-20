// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Profil from './pages/profil';
import SidebarPage from './pages/SidebarPage';
import DashboardPage from './pages/dashbordpage';
import Meetings from './pages/Meetings';
import Livrables from './pages/Livrables';
import Tasks from './pages/Tasks';
import Particu from './pages/page';





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rediriger "/" vers "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* Route Home */}
        <Route path="/home" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Route Profil protégée */}
        <Route>
          <Route path="/particulier" element={<Particu/>} />
          <Route path="/startup" element={<Profil />} />
          <Route path="/sidebar" element={<SidebarPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/livrable" element={<Livrables />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route> 
        
      </Routes>
    </Router>
  );
}

export default App;