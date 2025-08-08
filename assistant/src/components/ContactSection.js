import React from "react";
// Animated border CSS for founder cards
const animatedBorderStyle = `
  .animated-border {
    pointer-events: none;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .animated-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 4px;
    background: conic-gradient(from 0deg, #00ff1aff 0%, #aeefb5 30%, #fff0 40%, #aeefb5 60%, #fff0 70%, #aeefb5 100%);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), black 100%);
    mask: radial-gradient(farthest-side, transparent calc(100% - 6px), black 100%);
    animation: rotate-border 2.5s linear infinite;
  }
  @keyframes rotate-border {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .founder-img-shadow {
     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 2px 8px 0 rgba(34,197,94,0.18);
  }
  .dibakar-3d-shadow {
      box-shadow:
        0 12px 36px 0 rgba(31, 38, 135, 0.45),
        0 1.5px 8px 0 rgba(34,197,94,0.25),
        0 0 32px 8px #43a04744;
      background: linear-gradient(135deg, #f7fafc 60%, #e0ffe0 100%);
      transition: box-shadow 0.3s;
  }
  .icon-shadow {
     box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.18), 0 1px 4px 0 rgba(34,197,94,0.12);
     border-radius: 50%;
     background: white;
     transition: box-shadow 0.2s;
  }
`;

const founders = [
  {
    name: "Dibakar Das",
    image: "https://i.postimg.cc/3xhW7KJR/Whats-App-Image-2025-03-15-at-12-47-02-780be8b3.jpg",
    email: "dibakardas612@gmail.com",
    linkedin: "https://www.linkedin.com/in/dibakar-das-453653248/",
    github: "https://github.com/DibakarDas9",
    cv: "https://drive.google.com/file/d/1rL3e6uw3pPcJuXScmWF2Ew34iSiNcN7S/view"
  },
  {
        name: "Dipanjan Samanta",
        image: "https://i.postimg.cc/L8jKxRL9/IMG-9495-1.jpg",
        imageAlt: "https://media.licdn.com/dms/image/v2/D5635AQFc3dDOODLOFw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1732287409229?e=1754661600&v=beta&t=t6UbPo73_rFYNoGb15htkrkYC8WcJrTh11M_lqdau68",
    email: "dipanjanbdn03@gmail.com",
    linkedin: "https://www.linkedin.com/in/dipanjan-samanta-856411239/",
    github: "https://github.com/DipanjanSamanta13",
    cv: "https://drive.google.com/file/d/14aQsPdXSxUWdwZUbhNelzFRHowzP7ILn/view"
  },
  {
    name: "Soumadeep Dutta",
    image: "https://i.postimg.cc/rmKNksFS/Whats-App-Image-2025-08-05-at-21-37-53-0671aa0f.jpg",
    email: "soumadeepdutta212@gmail.com",
    linkedin: "https://www.linkedin.com/in/soumadeep-dutta-05368330a/",
    cv: "https://drive.google.com/file/d/1QumHp2wTm2KrQjnUBwmvZ3jbICQd0JkG/view"
  },
  {
    name: "Riddhiman Mukhopadhyay",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGvTtz9OeLKHQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726763010173?e=1757548800&v=beta&t=WOE63ZV9N35BP0-1qdI4_cSxs8pD9a34lEQvz-psnpk",
    email: "rawinsane01@gmail.com",
    linkedin: "https://www.linkedin.com/in/riddhiman-mukhopadhyay-933662272",
    github: "https://github.com/Riddhiman004",
    
  },
  {
    name: "Sukanta Ghosh",
    image: "https://i.postimg.cc/bwryvJ4Y/Whats-App-Image-2025-08-06-at-21-33-02-03ac3dbf.jpg",
    email: "sg743495@gmail.com", 
    linkedin: "http://www.linkedin.com/in/sukanta-ghosh-13b994255",
    github: "https://github.com/sg743495",

  },
  {
    name: "Amit Ghosh",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGyXHaRcIh5Tg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702193030533?e=1757548800&v=beta&t=1r4o4RiWj7-MRM5twa2R00ku7g7nCV9fZgUle_B4xuQ",
    email: "amitghosh96104@gmail.com",
    linkedin: "https://www.linkedin.com/in/amit-ghosh-56643a2a4",
    github: "https://github.com/amit12020",
    cv: "https://drive.google.com/file/d/13ddLSerOZuoSzustYIT_AgzuZKJdTITh/view?usp=drivesdkGTI"

    
  }
];

const ContactSection = () => (
  <section id="contact" className="py-16 bg-white dark:bg-gray-900">
    <style>{animatedBorderStyle}</style>
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-green-700 dark:text-green-300">We'd Love to Hear from You! </h2>
      <div className="flex flex-col items-center gap-8">
        {/* Desktop: Top row with 4 founders, Mobile: All founders stacked */}
        <div className="hidden md:flex flex-row justify-center gap-8">
          {/* Top row: first 4 founders - Desktop only */}
          {founders.slice(0, 4).map((founder, idx) => (
            <div key={founder.name || idx} className="relative flex items-center justify-center w-72 h-72">
              <div className="animated-border"></div>
              <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-full shadow-lg p-6 w-64 h-64 glass-card" style={{boxShadow: '0 4px 24px 0 rgba(34,197,94,0.12), 0 1.5px 8px 0 rgba(0,0,0,0.08)', zIndex: 2, position: 'relative'}}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className={`w-24 h-24 rounded-full mb-3 object-cover ${founder.name === 'Dibakar Das' ? 'dibakar-3d-shadow' : 'founder-img-shadow'}`}
                />
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-1">{founder.name}</h3>
                <a href={`mailto:${founder.email}`} className="text-sm text-gray-700 dark:text-gray-300 hover:underline mb-2">{founder.email}</a>
                <div className="flex justify-center gap-4 mt-2">
                  {founder.linkedin && (
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-blue-600 hover:text-blue-800 icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/></svg>
                    </a>
                  )}
                  {founder.github && (
                    <a href={founder.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-800 dark:text-gray-200 hover:text-black icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.585 8.199-6.082 8.199-11.385 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {founder.cv && (
                    <a href={founder.cv} target="_blank" rel="noopener noreferrer" title="CV" className="text-green-700 dark:text-green-300 hover:text-green-900 icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2h-12zm0 2h12v16h-12v-16zm2 2v2h8v-2h-8zm0 4v2h8v-2h-8zm0 4v2h5v-2h-5z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: Bottom row with 2 founders, Mobile: All founders stacked */}
        <div className="hidden md:flex flex-row justify-center gap-8 mt-8">
          {/* Bottom row: Sukanta and Amit - Desktop only */}
          {founders.slice(4, 6).map((founder, idx) => (
            <div key={founder.name || idx} className="relative flex items-center justify-center w-72 h-72">
              <div className="animated-border"></div>
              <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-full shadow-lg p-6 w-64 h-64 glass-card" style={{boxShadow: '0 4px 24px 0 rgba(34,197,94,0.12), 0 1.5px 8px 0 rgba(0,0,0,0.08)', zIndex: 2, position: 'relative'}}>
                <img src={founder.image} alt={founder.name} className="w-24 h-24 rounded-full mb-3 object-cover" style={{boxShadow: '0 4px 16px 0 rgba(34,197,94,0.15), 0 1.5px 8px 0 rgba(0,0,0,0.10)'}} />
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-1">{founder.name}</h3>
                <a href={`mailto:${founder.email}`} className="text-sm text-gray-700 dark:text-gray-300 hover:underline mb-2">{founder.email}</a>
                <div className="flex justify-center gap-4 mt-2">
                  {founder.linkedin && (
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-blue-600 hover:text-blue-800">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/></svg>
                    </a>
                  )}
                  {founder.github && (
                    <a href={founder.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-800 dark:text-gray-200 hover:text-black">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.585 8.199-6.082 8.199-11.385 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {founder.cv && (
                    <a href={founder.cv} target="_blank" rel="noopener noreferrer" title="CV" className="text-green-700 dark:text-green-300 hover:text-green-900">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2h-12zm0 2h12v16h-12v-16zm2 2v2h8v-2h-8zm0 4v2h8v-2h-8zm0 4v2h5v-2h-5z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile: All founders stacked vertically */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {founders.map((founder, idx) => (
            <div key={founder.name || idx} className="relative flex items-center justify-center w-72 h-72">
              <div className="animated-border"></div>
              <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-full shadow-lg p-6 w-64 h-64 glass-card" style={{boxShadow: '0 4px 24px 0 rgba(34,197,94,0.12), 0 1.5px 8px 0 rgba(0,0,0,0.08)', zIndex: 2, position: 'relative'}}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className={`w-24 h-24 rounded-full mb-3 object-cover ${founder.name === 'Dibakar Das' ? 'dibakar-3d-shadow' : 'founder-img-shadow'}`}
                />
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-1">{founder.name}</h3>
                <a href={`mailto:${founder.email}`} className="text-sm text-gray-700 dark:text-gray-300 hover:underline mb-2">{founder.email}</a>
                <div className="flex justify-center gap-4 mt-2">
                  {founder.linkedin && (
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-blue-600 hover:text-blue-800 icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/></svg>
                    </a>
                  )}
                  {founder.github && (
                    <a href={founder.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-800 dark:text-gray-200 hover:text-black icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.585 8.199-6.082 8.199-11.385 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {founder.cv && (
                    <a href={founder.cv} target="_blank" rel="noopener noreferrer" title="CV" className="text-green-700 dark:text-green-300 hover:text-green-900 icon-shadow">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2h-12zm0 2h12v16h-12v-16zm2 2v2h8v-2h-8zm0 4v2h8v-2h-8zm0 4v2h5v-2h-5z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
