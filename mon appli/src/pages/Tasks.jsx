// src/pages/SidebarPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar'; 
import Tasks from '../components/task';

const SidebarPage = () => {
  return (
    <div>
      <Sidebar />
      <Tasks/>
   
    </div>
  );
}

export default SidebarPage;