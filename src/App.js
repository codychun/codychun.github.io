import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Alarm from './components/Alarm';

function App() {
  useEffect(() => {
    document.title = "Cody Chun | Portfolio";
  }, []);
  return (
    <div className="App">
      <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/"  element={<About />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/alarm"  element={<Alarm />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;