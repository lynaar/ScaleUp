import React from 'react';
import Sidebar from '../components/sidebar'; 
import Dashboard from '../components/dashbord'; 
import Meetings from '../components/meetings';
import Livrables from '../components/livrable';
import Tasks from '../components/task';
const SidebarPage = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Dashboard />
     

    </div>
  );
}

 <style jsx>{`
  .app-container {
  display: flex;
  min-height: 100vh;
}
     `}</style>
      

export default SidebarPage;