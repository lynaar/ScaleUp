// src/pages/SidebarPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar'; 
import Dashboard from '../components/dashbord'; 

const SidebarPage = () => {
  return (
    <div>
      <Sidebar />
      <Dashboard />
   
    </div>
  );
}

export default SidebarPage;