import React from 'react';
import { FaHome, FaTachometerAlt, FaUsers, FaCalendarAlt, FaComments,FaBug, FaFileAlt, FaBook, FaRocket } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    // Fonction pour déterminer si un lien est actif
    const isActive = (path) => {
      return location.pathname === path;
    };
  
    return (
        <>
    <style jsx>{`
          .sidebar {
              background: white;
              border-right: 1px solid #e5e7eb;
              padding: 1.5rem;
              position: sticky;
              top: 0;
              height: 120vh;
              width: 280px;
              overflow-y: hidden;
              
              z-index: 100;
              transition: transform 0.3s ease;
              box-shadow: #9ca3af 0px 0px 10px 0px;
          }
          .sidebar::after {
              content: '';
              top: 0;
              left: 0;
              right: 0;
              pointer-events: none;
              position: absolute;
              bottom: 0;
              background: repeating-linear-gradient(
                  45deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(255,255,255,0.05) 3px,
                  rgba(255,255,255,0.05) 5px
              );
              animation: space-scan 20s linear infinite;
          }
  
          .logo {
              text-align: center;
              margin-top: 1rem;
              margin-right: 2rem;
              padding-bottom: 2rem;
              position: relative;
              text-decoration: overline;
              z-index: 1;   
         
          }
  
          .logo-icon img {
              width: 150px;
              height: 100px;
              display: block;
              margin: 0 auto;
              object-fit: cover;
             text-decoration:overline;
             border-bottom: 1px solid rgb(166, 157, 157);
              z-index: 1;
          }
         
        
          .nav-menu {
                      display: flex;
                      flex-direction: column;
                      gap: 0.5rem;
                  }
  
  
                  .nav-item::after {
                      content: '';
                      position: absolute;
                      left: 0;
                      bottom: 0;
                      width: 0;
                      height: 2px;
                      background: var(--primary);
                      transition: 0.3s;
                  }
  
                  .nav-item:hover {
                      background: var(--hover);
                  }
  
               
  
  
                  .nav-item {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 1rem;
              color: #444;
              border-radius: 8px;
              text-decoration: none;
              position: relative;
              transition: all 0.3s ease;
              background: transparent;
          }
  
          .nav-item::before {
              content: '';
              position: absolute;
              left: -10px;
              top: 50%;
              transform: translateY(-50%);
              width: 4px;
              height: 0%;
              background: #e43e32;
              border-radius: 2px;
              transition: all 0.3s ease;
          }
  
          .nav-item:hover {
              background: rgba(228, 62, 50, 0.05);
              color: #e43e32;
              padding-left: 1.5rem;
          }
  
        
          .nav-item.active {
              background: rgba(228, 62, 50, 0.1);
              color: #e43e32;
              font-weight: 600;
          }
  
          .nav-item.active::before {
              height: 100%;
              left: 0;
          }
                  
                  @keyframes fadeIn {
                      from {
                          opacity: 0;
                          transform: translateY(10px);
                      }
                      to {
                          opacity: 1;
                          transform: translateY(0);
                      }
                  }
       /* Responsive Design */
       @media (max-width: 768px) {
                      .hamburger-menu {
                          display: block;
                      }
  
                      .sidebar {
                          transform: translateX(-100%);
                      }
  
                      .sidebar.active {
                          transform: translateX(0);
                      }
  
                      .hamburger-menu.active span:nth-child(1) {
                          transform: rotate(45deg) translate(5px, 5px);
                      }
  
                      .hamburger-menu.active span:nth-child(2) {
                          opacity: 0;
                      }
  
                      .hamburger-menu.active span:nth-child(3) {
                          transform: rotate(-45deg) translate(7px, -6px);
                      }
                  }
  
  
          /* Main Content */
          .main-content {
              padding: 2rem;
              z-index: 1;
              position: relative;
          }
  
          .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
          }
  
          .header-title h1 {
              font-size: 1.5rem;
              font-weight: 600;
              color: var(--dark);
          }
  
          .header-title p {
              color: var(--gray);
              font-size: 0.875rem;
              
          }
  
          .user-profile {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              z-index: 1;
          }
       
          .user-avatar {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              object-fit: cover;
          }
  
          /* Dashboard Grid */
          .dashboard-grid {
              display: grid;
              grid-template-columns: repeat(12, 1fr);
              gap: 1.5rem;
          }
  
          /* Cards */
          .card {
              background: white;
              border-radius: 12px;
              box-shadow: var(--card-shadow);
              padding: 1.5rem;
          }
  
          .card-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1rem;
          }
  
          .card-title {
              font-size: 1rem;
              font-weight: 600;
              color: var(--dark);
          }
  
          .card-actions {
              display: flex;
              gap: 0.5rem;
          }
  
          .card-actions button {
              background: none;
              border: none;
              color: var(--gray);
              cursor: pointer;
              font-size: 1rem;
          }
  
          /* Metrics Cards */
          .metric-card {
              grid-column: span 3;
              display: flex;
              flex-direction: column;
          }
  
          .metric-value {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 0.25rem;
          }
  
          .metric-label {
              color: var(--gray);
              font-size: 0.875rem;
              margin-bottom: 0.5rem;
          }
  
          .metric-change {
              display: flex;
              align-items: center;
              gap: 0.25rem;
              font-size: 0.875rem;
              font-weight: 500;
          }
  
          .metric-change.positive {
              color: var(--secondary);
          }
  
          .metric-change.negative {
              color: var(--danger);
          }
  
          /* Charts */
          .chart-card {
              grid-column: span 6;
              height: 350px;
          }
  
          /* Data Table */
          .data-table {
              width: 100%;
              border-collapse: collapse;
          }
  
          .data-table th, .data-table td {
              padding: 0.75rem 1rem;
              text-align: left;
              border-bottom: 1px solid #e5e7eb;
          }
  
          .data-table th {
              font-weight: 600;
              color: #374151;
              font-size: 0.875rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
          }
  
          .data-table td {
              font-size: 0.875rem;
              color: #4b5563;
          }
  
          .badge {
              display: inline-block;
              padding: 0.25rem 0.5rem;
              border-radius: 9999px;
              font-size: 0.75rem;
              font-weight: 600;
          }
  
          .badge-success {
              background-color: #ecfdf5;
              color: var(--secondary);
          }
  
          .badge-warning {
              background-color: #fffbeb;
              color: var(--warning);
          }
  
          /* Hamburger Menu */
          .hamburger-menu {
              display: none;
              cursor: pointer;
              padding: 10px;
              z-index: 101;
              position:fixed;
              top: 20px;
              left: 20px;
              background: rgba(181, 179, 179, 0.7);
              border-radius: 5px;
          }
  
          .hamburger-menu span {
              display: block;
              width: 25px;
              height: 3px;
              background: white;
              margin: 5px 0;
              transition: all 0.3s ease;
          }
  
          /* Responsive */
          @media (max-width: 1200px) {
              .metric-card {
                  grid-column: span 6;
              }
              .chart-card {
                  grid-column: span 12;
              }
          }
  
          @media (max-width: 768px) {
              .dashboard {
                  grid-template-columns: 1fr;
              }
              
              .sidebar {
                  position: fixed;
                  width: 280px;
                  transform: translateX(-100%);
              }
              
              .sidebar.active {
                  transform: translateX(0);
              }
              
              .hamburger-menu {
                  display: block;
              }
              
              .hamburger-menu.active span:nth-child(1) {
                  transform: rotate(45deg) translate(5px, 5px);
              }
              
              .hamburger-menu.active span:nth-child(2) {
                  opacity: 0;
              }
              
              .hamburger-menu.active span:nth-child(3) {
                  transform: rotate(-45deg) translate(7px, -6px);
              }
              
              .main-content {
                  margin-left: 0;
                  padding-top: 80px;
              }
              
              .metric-card {
                  grid-column: span 12;
              }
          }
          
          .logo-icon a{
              z-index: 1;
          }
          
          @keyframes space-scan {
              0% {
                  background-position: 0 0;
              }
              100% {
                  background-position: 100px 100px;
              }
          }
               `}</style>
             
             <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <a href="">
              <img 
                src={`${process.env.PUBLIC_URL}/ScaleUp_Logo_-_Original_with_Transparent_Background_-_5000x5000.png`} 
                className="logo" 
                alt="ScaleUp Logo" 
              />
            </a>
          </div>
        </div>
        <nav className="nav-menu">  
          <Link 
            className={`nav-item ${isActive('/startup') ? 'active' : ''}`} 
            to={localStorage.getItem('role') === 'startup' ? '/startup' : '/particulier'}
          >
            <FaHome/>
            <span>Home</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`} 
            to="/dashboard"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/meetings') ? 'active' : ''}`} 
            to="/meetings"
          >
            <FaCalendarAlt />
            <span>Meeting</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/feed') ? 'active' : ''}`} 
            to="/feed"
          >
            <FaComments />
            <span>Feeds</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/livrable') ? 'active' : ''}`} 
            to="/livrable"
          >
            <FaFileAlt/>
            <span>Livrable</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/ressource') ? 'active' : ''}`} 
            to="/ressource"
          >
            <FaBook/>
            <span>Ressource</span>
          </Link>
          
          <Link 
            className={`nav-item ${isActive('/tasks') ? 'active' : ''}`} 
            to="/tasks"
          >
            <FaRocket/>
            <span>Tasks</span>      
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;