import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || ""; // Loaded from .env.gemini

// Enhanced climate-focused prompt for better responses
const CLIMATE_SYSTEM_PROMPT = `You are an expert climate action assistant powered by Google's Gemini AI. Your role is to help users understand environmental impact, sustainability, and climate change. 

Key areas of expertise:
- Environmental impact analysis of products and activities
- Sustainable living tips and alternatives
- Climate change science and solutions
- Carbon footprint reduction strategies
- Renewable energy and green technology
- Waste reduction and circular economy
- Biodiversity and ecosystem protection
- Environmental policy and advocacy

Always provide:
- Accurate, science-based information
- Practical, actionable advice
- Positive, encouraging tone
- Specific examples when possible
- Links to further resources when relevant

Keep responses concise but informative, and always encourage sustainable choices.`;

const GeminiChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: "bot", 
      text: "Hello! I'm Gemini, your AI climate action assistant. I'm here to help you understand environmental impact, find sustainable alternatives, and take meaningful climate action. What would you like to know about today? 🌱", 
      timestamp: new Date(),
      type: "welcome"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    if (!GEMINI_API_KEY) {
      setIsConnected(false);
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      from: "user",
      text: input.trim(),
      timestamp: new Date(),
      type: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Build conversation context
      const recentMessages = messages.slice(-6); // Keep last 6 messages for context
      const contextMessages = recentMessages.map(msg => ({
        role: msg.from === "user" ? "user" : "assistant",
        parts: [{ text: msg.text }]
      }));

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: CLIMATE_SYSTEM_PROMPT }]
            },
            ...contextMessages,
            {
              role: "user",
              parts: [{ text: input.trim() }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000
        }
      );

      const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                   "I'm sorry, I couldn't process that request. Please try again.";
      
      const botMessage = {
        id: messages.length + 2,
        from: "bot",
        text: reply,
        timestamp: new Date(),
        type: "response"
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        from: "bot",
        text: "I'm having trouble connecting right now. This might be due to network issues or API limits. Please try again in a moment, or you can ask me about specific climate topics like 'plastic pollution', 'carbon footprint', or 'renewable energy'.",
        timestamp: new Date(),
        type: "error"
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "How can I reduce my carbon footprint?",
    "What are the best alternatives to plastic?",
    "How does food choice affect climate change?",
    "What renewable energy options are available?",
    "How can I make my home more sustainable?",
    "What's the impact of fast fashion?",
    "How can I reduce food waste?",
    "What are the benefits of electric vehicles?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        from: "bot", 
        text: "Hello! I'm Gemini, your AI climate action assistant. I'm here to help you understand environmental impact, find sustainable alternatives, and take meaningful climate action. What would you like to know about today? 🌱", 
        timestamp: new Date(),
        type: "welcome"
      }
    ]);
  };

  if (!GEMINI_API_KEY) {
    return (
      <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-glow">
          ⚠️
        </div>
        <h3 className="text-3xl font-bold gradient-text mb-4">Gemini AI Assistant</h3>
        <p className="text-lg text-red-600 dark:text-red-400 mb-4">
          Gemini is currently unavailable. Please check your API configuration.
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Setup required:</strong> Add your Gemini API key to the <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env.gemini</code> file as <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">GEMINI_API_KEY</code> and restart the app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-glow">
            🤖
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold gradient-text mb-1">Gemini AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isConnected ? 'Connected' : 'Disconnected'} • Powered by Google's Gemini AI
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Chat
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-sm border border-white/20 dark:border-gray-600/20"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Messages Container */}
      <div className="h-96 lg:h-[500px] overflow-y-auto mb-6 border-2 border-white/20 dark:border-gray-600/20 rounded-2xl p-4 lg:p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 lg:mb-6 flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-4 lg:px-6 py-3 lg:py-4 rounded-2xl ${
                message.from === "user"
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-lg shadow-glow"
                  : message.type === "error"
                  ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-bl-lg border border-red-200 dark:border-red-800"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-lg shadow-glass dark:shadow-glass-dark backdrop-blur-sm"
              }`}
            >
              <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <div className={`flex items-center justify-between mt-2 ${
                message.from === "user" ? "text-primary-100" : "text-gray-500 dark:text-gray-400"
              }`}>
                <span className="text-xs">{formatTime(message.timestamp)}</span>
                {message.from === "bot" && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Gemini</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4 lg:mb-6">
            <div className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-lg shadow-glass dark:shadow-glass-dark backdrop-blur-sm px-4 lg:px-6 py-3 lg:py-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Gemini is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="flex gap-3 lg:gap-4">
        <div className="flex-1 relative">
          <textarea
            className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg border-2 border-white/20 dark:border-gray-600/20 rounded-2xl focus:border-primary-500 focus:outline-none resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            placeholder="Ask me about climate action, environmental impact, or sustainability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="2"
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {input.length}/500
          </div>
        </div>
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-glow disabled:hover:scale-100 flex items-center justify-center"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Chat Stats */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{messages.length - 1} messages exchanged</span>
        <span>Powered by Google Gemini AI</span>
      </div>
    </div>
  );
};

export default GeminiChatbot; 