import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import impactData from '../data/impactData.json';

const BACKEND_API_URL = '/api/chatgpt';

// Enhanced climate-focused system prompt for ChatGPT with comparison capabilities
const CLIMATE_SYSTEM_PROMPT = `You are an expert climate action assistant powered by OpenAI's ChatGPT. Your role is to help users understand environmental impact, sustainability, and climate change.

Key areas of expertise:
- Environmental impact analysis of products and activities
- Sustainable living tips and alternatives
- Climate change science and solutions
- Carbon footprint reduction strategies
- Renewable energy and green technology
- Waste reduction and circular economy
- Biodiversity and ecosystem protection
- Environmental policy and advocacy
- Product comparisons and alternatives

When users ask for comparisons (using words like "compare", "difference", "vs", "versus", "better", "worse"), provide detailed comparisons including:
- Carbon footprint differences
- Environmental impact analysis
- Cost-benefit analysis
- Practical recommendations
- Specific alternatives

Always provide:
- Accurate, science-based information
- Practical, actionable advice
- Positive, encouraging tone
- Specific examples when possible
- Links to further resources when relevant

Keep responses concise but informative, and always encourage sustainable choices.`;

// Comparison keywords to detect comparison requests
const COMPARISON_KEYWORDS = [
  'compare', 'comparison', 'difference', 'vs', 'versus', 'better', 'worse',
  'which is', 'what is the difference', 'how does', 'environmental impact',
  'carbon footprint', 'eco-friendly', 'sustainable', 'green'
];

// Function to detect if user is asking for a comparison
const isComparisonRequest = (text) => {
  const lowerText = text.toLowerCase();
  return COMPARISON_KEYWORDS.some(keyword => lowerText.includes(keyword));
};

// Function to find relevant data for comparison
const findComparisonData = (text) => {
  const lowerText = text.toLowerCase();
  const foundItems = [];
  
  // Search through impact data for items mentioned in the text
  Object.keys(impactData).forEach(item => {
    if (lowerText.includes(item.toLowerCase())) {
      foundItems.push({
        name: item,
        data: impactData[item]
      });
    }
  });
  
  return foundItems;
};

// Function to create comparison response
const createComparisonResponse = (items) => {
  if (items.length < 2) {
    return null; // Need at least 2 items to compare
  }
  
  let response = "🌱 **Environmental Impact Comparison**\n\n";
  
  items.forEach((item, index) => {
    const data = item.data;
    response += `**${item.name.toUpperCase()}**\n`;
    response += `• Carbon Footprint: ${data.co2} kg CO2\n`;
    response += `• Annual Pollution: ${data.annualPollutionKg} kg\n`;
    response += `• Eco-friendly: ${data.ecoFriendly ? '✅ Yes' : '❌ No'}\n`;
    response += `• Biodegradable: ${data.nonBiodegradable ? '❌ No' : '✅ Yes'}\n`;
    response += `• Description: ${data.description}\n`;
    
    if (data.alternatives && data.alternatives.length > 0) {
      response += `• Better Alternatives: ${data.alternatives.join(', ')}\n`;
    }
    response += '\n';
  });
  
  // Add comparison summary
  const ecoFriendlyItems = items.filter(item => item.data.ecoFriendly);
  const bestOption = items.reduce((best, current) => 
    current.data.co2 < best.data.co2 ? current : best
  );
  
  response += `**💡 Recommendation:** ${bestOption.name} has the lowest carbon footprint (${bestOption.data.co2} kg CO2).\n`;
  response += `**🌿 Eco-friendly options:** ${ecoFriendlyItems.map(item => item.name).join(', ')}\n`;
  
  return response;
};

const ChatGPTChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: "bot", 
      text: "Hello! I'm ChatGPT, your AI climate action assistant. I'm here to help you understand environmental impact, find sustainable alternatives, and take meaningful climate action. You can ask me to compare products, analyze environmental impact, or get sustainability tips! 🌱", 
      timestamp: new Date(),
      type: "welcome"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

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
      // Check if this is a comparison request
      const isComparison = isComparisonRequest(input.trim());
      let comparisonData = null;
      
      if (isComparison) {
        comparisonData = findComparisonData(input.trim());
      }

      // Build conversation context for ChatGPT
      const recentMessages = messages.slice(-8); // Keep last 8 messages for context
      const contextMessages = recentMessages.map(msg => ({
        role: msg.from === "user" ? "user" : "assistant",
        content: msg.text
      }));

      let systemPrompt = CLIMATE_SYSTEM_PROMPT;
      
      // If we have comparison data, enhance the system prompt
      if (comparisonData && comparisonData.length >= 2) {
        systemPrompt += `\n\nIMPORTANT: The user is asking for a comparison. Use the following data to provide a detailed comparison:
        ${comparisonData.map(item => 
          `${item.name}: CO2=${item.data.co2}kg, Pollution=${item.data.annualPollutionKg}kg, Eco-friendly=${item.data.ecoFriendly}, Description=${item.data.description}`
        ).join('\n')}
        
        Provide a structured comparison with clear recommendations.`;
      }

      const response = await axios.post(
        BACKEND_API_URL,
        {
          messages: [
            ...contextMessages,
            { role: "user", content: input.trim() }
          ],
          systemPrompt: systemPrompt
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      let reply = response.data.reply || "I'm sorry, I couldn't process that request. Please try again.";
      
      // If we have comparison data and the AI response is generic, enhance it
      if (comparisonData && comparisonData.length >= 2) {
        const comparisonResponse = createComparisonResponse(comparisonData);
        if (comparisonResponse) {
          reply = comparisonResponse + "\n\n" + reply;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        from: "bot",
        text: reply,
        timestamp: new Date(),
        type: "response"
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('OpenAI API Error:', error);
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
    "Compare plastic bags vs cloth bags",
    "What's the difference between plastic and metal straws?",
    "Compare paper vs plastic bags",
    "Which is better: plastic or glass bottles?",
    "How do coffee cups compare to reusable cups?",
    "Compare bamboo vs plastic cutlery",
    "What's the environmental impact of fast fashion?",
    "Compare electric vs gas vehicles"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        from: "bot", 
        text: "Hello! I'm ChatGPT, your AI climate action assistant. I'm here to help you understand environmental impact, find sustainable alternatives, and take meaningful climate action. You can ask me to compare products, analyze environmental impact, or get sustainability tips! 🌱", 
        timestamp: new Date(),
        type: "welcome"
      }
    ]);
  };

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-glow">
            🤖
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold gradient-text mb-1">Climate AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connected • Powered by OpenAI's ChatGPT
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
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick comparisons & questions:</p>
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
                  ? "bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-br-lg shadow-glow"
                  : message.type === "error"
                  ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-bl-lg border border-red-200 dark:border-red-800"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-lg shadow-glass dark:shadow-glass-dark backdrop-blur-sm"
              }`}
            >
              <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <div className={`flex items-center justify-between mt-2 ${
                message.from === "user" ? "text-green-100" : "text-gray-500 dark:text-gray-400"
              }`}>
                <span className="text-xs">{formatTime(message.timestamp)}</span>
                {message.from === "bot" && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Climate AI</span>
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
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Climate AI is analyzing...</span>
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
            className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg border-2 border-white/20 dark:border-gray-600/20 rounded-2xl focus:border-green-500 focus:outline-none resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            placeholder="Compare products, ask about environmental impact, or get sustainability tips..."
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
          className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-glow disabled:hover:scale-100 flex items-center justify-center"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Chat Stats */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{messages.length - 1} messages exchanged</span>
        <span>Powered by OpenAI ChatGPT + Climate Data</span>
      </div>
    </div>
  );
};

export default ChatGPTChatbot; 