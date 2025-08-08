import React, { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } glass-card backdrop-blur-lg bg-white/80 border-b border-green-100 shadow-[0_4px_24px_0_rgba(34,197,94,0.15)] dark:bg-gray-900/80`}
    >
      <div className="max-w-7xl mx-auto px-4 py-7 flex items-center justify-between">
        {/* Logo & Name */}
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-300 flex items-center justify-center text-white text-2xl font-bold shadow-glow">🌱</span>
          <span className="text-2xl font-extrabold tracking-wide text-green-700 dark:text-green-300 font-[Inter,ui-sans-serif]">Vasundhara</span>
        </a>
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li><a href="#home" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
          <li><a href="#about" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a></li>
          <li><a href="#features" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a></li>
          <li><a href="#chatbot" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' }); }}>Climate Chatbot</a></li>
          <li><a href="#contact" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200">Contact</a></li>
        </ul>
        {/* Get Started Button & Dark Mode */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <a
              href="https://sdgs.un.org/goals"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block px-12 py-1.5 rounded-full font-extrabold text-2xl shadow-glow transition duration-200"
              style={{
                background: '#16a34a',
                fontFamily: '"Luckiest Guy", "Comic Sans MS", cursive, Poppins, Inter, ui-sans-serif',
                letterSpacing: '2px',
                border: 'none',
                boxShadow: '0 6px 32px 0 rgba(22,163,74,0.15)',
              }}
            >
              <span style={{
                color: '#fff',
                fontWeight: 900,
                fontSize: '2rem',
                display: 'inline-block',
                textShadow: '0 2px 12px rgba(22,163,74,0.18)',
                letterSpacing: '2px',
              }}>
                M
                <span style={{
                  fontFamily: 'inherit',
                  fontWeight: 900,
                  fontSize: '2rem',
                  display: 'inline-block',
                  margin: '0 2px',
                  background: 'linear-gradient(180deg, #FF9933 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>I</span>GA
              </span>
            </a>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Make India Great Again
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
          <DarkModeToggle inNavbar={true} />
          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 p-2 rounded-full bg-green-100 hover:bg-green-200 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Nav Links */}
      {menuOpen && (
        <ul className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-green-100 dark:border-green-900 shadow-glass px-4 py-4 flex flex-col space-y-4 text-lg font-medium animate-fade-in">
          <li><a href="#home" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>Home</a></li>
          <li><a href="#about" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>About</a></li>
          <li><a href="#features" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={e => { e.preventDefault(); document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Features</a></li>
          <li><a href="#chatbot" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={() => setMenuOpen(false)}>Climate Chatbot</a></li>
          <li><a href="#contact" className="text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 transition duration-200" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li>
            <div className="relative group">
              <a 
                href="https://sdgs.un.org/goals" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-2 rounded-full font-extrabold text-lg" 
                style={{background: '#16a34a', color: '#fff', fontFamily: 'Poppins, Inter, ui-sans-serif', letterSpacing: '2px', border: 'none', boxShadow: '0 6px 32px 0 rgba(22,163,74,0.15)'}} 
                onClick={() => setMenuOpen(false)}
              >
                MIGA
              </a>
              {/* Tooltip for mobile */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Make INDIA Great Again
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
