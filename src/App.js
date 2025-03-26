import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import hero from './components/hero';
import Features from './components/Features';
import Footer from './components/Footer';
import './App.css';
import Hero from './components/hero';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      
      <Hero />
      <main>
        <Features />
      </main>
      <Footer />
    </div>
  );
};
export default App;

