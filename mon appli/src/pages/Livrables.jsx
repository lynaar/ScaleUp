// src/pages/SidebarPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar'; 
import Livrables from '../components/livrable';

const SidebarPage = () => {
  return (
    <div>
      <Sidebar />
      < Livrables/>
   
    </div>
  );
}

export default SidebarPage;