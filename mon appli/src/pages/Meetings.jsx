// src/pages/SidebarPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar'; 
import Meetings from '../components/meetings';

const SidebarPage = () => {
  return (
    <div>
      <Sidebar />
      < Meetings/>
   
    </div>
  );
}

export default SidebarPage;