
import React from "react";

const AboutSection = () => (

  <section
    id="about"
    className="relative py-24 overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #ffffffff  0%, #f7fafc 60%, #92eb9aff 100%)',
      backgroundColor: 'unset',
    }}
  >
    {/* Solid dark background for dark mode to match above section */}
    <div
      className="absolute inset-0 z-0 pointer-events-none dark:block hidden"
      style={{
        background: '#181f2a',
        opacity: 1,
      }}
    ></div>
    <div className="relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center gap-16 z-10">
      {/* Left: Bouncing earth in glassmorphic circle */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-[420px]">
        <div
          className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg flex items-center justify-center animate-bounce-smooth shadow-2xl"
          style={{
            boxShadow:
              '0 0 600px 15px #92eb9aff, 0 0 0 0 #fff0, 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://toppng.com/uploads/preview/earth-11530975611ywsuafshqw.png"
            alt="Earth"
            className="w-full h-full object-cover"
            style={{ borderRadius: '50%' }}
          />
        </div>
        <style>{`
          @keyframes bounce-smooth {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-24px); }
          }
          .animate-bounce-smooth {
            animation: bounce-smooth 2.2s cubic-bezier(0.6,0,0.4,1) infinite;
          }
        `}</style>
      </div>
      {/* Right: About text and features, centered vertically, with icons/emojis */}
      <div className="flex-1 flex flex-col justify-center md:justify-center md:pl-8">
        <h2 className="text-5xl font-extrabold text-green-800 dark:text-white mb-6 flex items-center gap-4 drop-shadow-lg">
          <span className="inline-block align-middle">
      
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                
                <path d="M24 40C24 28 24 20 24 12" stroke="#43A047" strokeWidth="3" strokeLinecap="round"/>
                
                <ellipse cx="18" cy="18" rx="5" ry="9" fill="#A5D6A7" transform="rotate(-30 18 18)"/>
             
                <ellipse cx="30" cy="18" rx="5" ry="9" fill="#A5D6A7" transform="rotate(30 30 18)"/>
               
                <ellipse cx="24" cy="8" rx="4.5" ry="7" fill="#A5D6A7"/>
              </g>
            </svg>
          </span>
          <span className="inline-block align-middle">Why only Vasundhara!</span>
        </h2>
        <p className="text-base md:text-lg text-green-900 dark:text-gray-200 mb-8 leading-relaxed max-w-3xl" style={{ textShadow: '0 1px 2px #ffffff80, 0 1px 2px #00000040' }}>
          Vasundhara is an <span className="font-bold text-green-800 dark:text-white">AI-powered</span> chatbot platform for <span className="font-bold text-green-800 dark:text-white">climate action</span> and <span className="font-bold text-green-800 dark:text-white">sustainability</span>. Our mission is to empower everyone to make eco-friendly choices, understand environmental impact, and take meaningful steps for a cleaner, greener future. Built by a passionate team, Vasundhara combines modern design, advanced AI, and real data to help you make a difference for the planet.
        </p>
        <div className="flex flex-row flex-wrap gap-4 mt-2">
          <span className="bg-green-100 text-green-800 dark:bg-[#232b3a] dark:text-white px-6 py-2 rounded-2xl font-semibold text-base shadow-lg flex items-center gap-2 transition-colors"><span role="img" aria-label="Leaf">🍃</span>#ClimateAction</span>
          <span className="bg-green-100 text-green-800 dark:bg-[#232b3a] dark:text-white px-6 py-2 rounded-2xl font-semibold text-base shadow-lg flex items-center gap-2 transition-colors"><span role="img" aria-label="Seedling">🌱</span>#Sustainability</span>
          <span className="bg-green-100 text-green-800 dark:bg-[#232b3a] dark:text-white px-6 py-2 rounded-2xl font-semibold text-base shadow-lg flex items-center gap-2 transition-colors"><span role="img" aria-label="Robot">🤖</span>#AI</span>
          <span className="bg-green-100 text-green-800 dark:bg-[#232b3a] dark:text-white px-6 py-2 rounded-2xl font-semibold text-base shadow-lg flex items-center gap-2 transition-colors"><span role="img" aria-label="Handshake">🤝</span>#TeamWork</span>
          <span className="bg-green-100 text-green-800 dark:bg-[#232b3a] dark:text-white px-6 py-2 rounded-2xl font-semibold text-base shadow-lg flex items-center gap-2 transition-colors"><span role="img" aria-label="Globe">🌍</span>#Vibe Coding</span>
          
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
