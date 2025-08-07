import React, { useState, useEffect } from "react";
import impactData from "./data/impactData.json";
import ItemSearch from "./components/ItemSearch";
import ImpactInfo from "./components/ImpactInfo";
import PollutionChart from "./components/PollutionChart";
import Alternatives from "./components/Alternatives";
import Chatbot from "./components/Chatbot";
import GeminiChatbot from "./components/GeminiChatbot";
import ChatGPTChatbot from "./components/ChatGPTChatbot";
import ChatbotSelector from "./components/ChatbotSelector";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [itemData, setItemData] = useState(null);
  const [activeChatbot, setActiveChatbot] = useState("original");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (item) => {
    // Try exact match first
    if (impactData[item]) {
      setSelectedItem(item);
      setItemData(impactData[item]);
      return;
    }
    // Try synonym match
    const keys = Object.keys(impactData);
    let found = null;
    for (const key of keys) {
      const synonyms = impactData[key].synonyms || [];
      if (synonyms.map(s => s.toLowerCase()).includes(item)) {
        found = key;
        break;
      }
    }
    if (found) {
      setSelectedItem(found);
      setItemData(impactData[found]);
      return;
    }
    // Try partial match (substring)
    const closest = keys.find(key => key.includes(item));
    if (closest) {
      setSelectedItem(closest);
      setItemData(impactData[closest]);
    } else {
      setSelectedItem(item);
      setItemData(null);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 pt-16">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
      {/* ...existing code... */}
      {/* ...existing code... */}
      {/* ...existing code... */}
        {/* Animated Background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-10 dark:opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center fade-in">
            {/* Floating Earth Icon */}
            <div className="floating mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-6xl shadow-glow">
                🌍
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6 leading-tight">
              Vasundhara
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Clean Earth over greenwashing — action over appearance.
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover the environmental impact of everyday items and find eco-friendly alternatives. 
              Every small choice makes a big difference for our planet's future.
            </p>
            
            {/* Floating Stats */}
            <div className="flex justify-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Items Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card rounded-3xl p-8 slide-up">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                🔍 Discover Environmental Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Search for any item to see its environmental footprint and find sustainable alternatives
              </p>
            </div>
            
            <ItemSearch onSearch={handleSearch} />
            
            {selectedItem && !itemData && (
              <div className="mt-6 glass-card rounded-2xl p-6 border-l-4 border-red-500">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-2xl mr-4">
                    ⚠️
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">Item not found!</h3>
                    <p className="text-red-700 dark:text-red-300">
                      Try searching for: plastic bag, cloth bag, plastic bottle, reusable bottle, paper bag, straw, metal straw, coffee cup, reusable coffee cup, bamboo, glass bottle, stainless steel bottle, bamboo straw, ceramic mug, reusable tote
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {itemData && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <ImpactInfo item={selectedItem} data={itemData} />
            <PollutionChart item={selectedItem} data={itemData} />
            <Alternatives data={itemData} />
          </div>
        </section>
      )}

      {/* AI Assistant Section */}
      <section id="chatbot" className="py-20 bg-gradient-to-br from-white/50 to-primary-50/50 dark:from-gray-800/50 dark:to-primary-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold gradient-text mb-6">
              🤖 AI-Powered Climate Assistant
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose Vasundhara incase you don't have Gemini or ChatGPT API keys.
            </p>
          </div>

          {/* Chatbot Selector */}
          <ChatbotSelector 
            activeChatbot={activeChatbot} 
            onChatbotChange={setActiveChatbot} 
          />

          {/* Active Chatbot */}
          {activeChatbot === 'gemini' ? <GeminiChatbot /> : 
           activeChatbot === 'chatgpt' ? <ChatGPTChatbot /> : 
           <Chatbot />}
        </div>
      </section>

      {/* Features Section */}
      <section id="why-choose" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              🌟 Why Choose Climate Action Now?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive tools and insights to help you make sustainable choices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-glow">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get detailed environmental impact data with interactive visualizations and real-time calculations
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-glow-blue">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                AI-Powered Guidance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced AI assistants provide personalized advice and answer all your climate action questions
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-glow">
                🌱
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Sustainable Alternatives
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover eco-friendly alternatives and get practical tips for reducing your environmental footprint
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <ContactSection />

      {/* About Section (features, mission, etc.) */}
      <AboutSection />

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              🌍
            </div>
            <h3 className="text-3xl font-bold mb-4">Vasundhara</h3>
            <p className="text-gray-300 text-lg">
              Empowering individuals to make sustainable choices for a better future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Environmental Impact Analysis</li>
                <li>AI-Powered Chatbot</li>
                <li>Sustainable Alternatives</li>
                <li>Interactive Visualizations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technology & Languages</h4>
              <ul className="space-y-2 text-gray-300">
                <li>React.js (JavaScript)</li>
                <li>Tailwind CSS</li>
                <li>Node.js (JavaScript)</li>
                <li>Express.js (JavaScript)</li>
                <li>Chart.js (JavaScript)</li>
                <li>Google Gemini AI</li>
                <li>HTML & CSS</li>
                <li>JSON (Data)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Domains</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Climate Science</li>
                <li>Environmental Sustainability</li>
                <li>AI & Machine Learning</li>
                <li>Data Visualization</li>
                <li>Web Development</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              Technologies & Languages used: React.js, Tailwind CSS, Node.js, Express.js, Chart.js, Google Gemini, JavaScript, JSON, HTML, CSS.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Domains: Climate Action, Sustainability, AI, Data Visualization, Environmental Education, Web Development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;