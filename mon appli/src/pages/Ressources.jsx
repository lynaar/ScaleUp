// src/pages/SidebarPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar'; 
import Ressource from '../components/ressource';

const SidebarPage = () => {
  return (
    <div>
      <Sidebar />
      <Ressource/>
    </div>
  );
}

export default SidebarPage;