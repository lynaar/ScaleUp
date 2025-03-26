// components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
  
   <style jsx>{`
   :root {
  --primary: #e43e32;
  --secondary: #0c4c80;
  --dark: #2d2d34;
  --light: #f5f5f5;
  --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}
   .navbar {
  position: fixed;
  width: 100%;
  height: 90px;
  padding: 1.5rem 5%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 200px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary);
  transform: translateY(-2px);
}
  @media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .navbar {
    height: 70px;
    padding: 1rem 5%;
  }

  .mobile-menu a {
    color: var(--dark);
    text-decoration: none;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .mobile-menu a:hover {
    background: var(--light);
    color: var(--primary);
  }
}
  
`}</style>

      <nav className="navbar">
        <img 
          src={`${process.env.PUBLIC_URL}/ScaleUp_Logo_-_Original_with_Transparent_Background_-_5000x5000.png   `} 
          className="logo" 
          alt="ScaleUp Logo" 
        />
        
        {/* Menu Desktop */}
        <div className="nav-links">
          <a href="#hero">Accueil</a>
          <a href="#features">Fonctionnalités</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Hamburger Icon */}
        <button 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu mobile"
        >
          <svg
            className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}
            viewBox="0 0 100 100"
            width="40"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path
              className="line middle"
              d="m 30,50 h 40"
            />
            <path
              className="line bottom"
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
        </button>

        {/* Menu Mobile */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setIsMenuOpen(false)}>Accueil</a>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Fonctionnalités</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;