import React, { useState, useRef, useEffect } from "react";
import impactData from '../data/impactData.json';

// Enhanced mock responses for demo - replace with OpenAI API calls for production
const mockResponses = {
  "wet wipes": "Wet wipes contain plastic fibers, are single-use, and often clog drains and pollute water bodies. Use cloth or biodegradable wipes for a greener choice.",
  "disposable mask": "Disposable masks are made of synthetic fibers and contribute to pandemic-related waste. Use reusable cloth masks when possible.",
  "plastic toy": "Plastic toys are often discarded and contribute to landfill waste. Choose wooden or recycled plastic toys for sustainability.",
  "balloon": "Balloons are not biodegradable and can harm wildlife if released. Use paper decorations or fabric bunting for eco-friendly celebrations.",
  "glitter": "Conventional glitter is microplastic and pollutes water bodies. Choose biodegradable glitter for a safer sparkle.",
  "chewing gum": "Most chewing gum contains plastic polymers and does not biodegrade. Look for biodegradable gum options.",
  "cigarette butt": "Cigarette butts contain plastic and toxic chemicals, polluting land and water. Dispose of them properly and consider smoke-free alternatives.",
  "styrofoam cup": "Styrofoam cups are not recyclable and persist in the environment for centuries. Use paper or reusable cups instead.",
  "takeaway container": "Plastic takeaway containers are single-use and contribute to urban waste. Use reusable or compostable containers for takeout.",
  "microfiber cloth": "Microfiber cloths shed microplastics during washing, polluting water. Use cotton cloths for cleaning to reduce microplastic pollution.",
  "disposable battery": "Disposable batteries contain toxic metals and are hazardous if not recycled. Use rechargeable batteries to reduce waste.",
  "LED bulb": "LED bulbs are energy-efficient and last longer, reducing waste compared to CFL or incandescent bulbs.",
  "solar panel": "Solar panels generate clean energy and reduce reliance on fossil fuels. Consider installing solar panels for sustainable power.",
  "compost bin": "Compost bins help recycle organic waste and enrich soil. Composting reduces landfill waste and benefits gardens.",
  "e-waste": "E-waste like old phones contains hazardous materials and should be recycled properly. Take electronics to recycling centers or donate them.",
  "fast fashion t-shirt": "Fast fashion t-shirts are often made from synthetic fibers and contribute to textile waste. Choose organic cotton or second-hand t-shirts for sustainability.",
  "leather bag": "Leather bags require animal products and chemicals for tanning, impacting the environment. Vegan leather or cloth bags are better alternatives.",
  "wool sweater": "Wool sweaters are biodegradable and last long, but wool production has a carbon footprint. Organic cotton sweaters are a greener choice.",
  "synthetic shoes": "Synthetic shoes are made from plastics and contribute to landfill waste. Choose leather or recycled material shoes for sustainability.",
  "biodegradable bag": "Biodegradable bags break down naturally and are a better alternative to plastic bags. Use cloth or paper bags for best results.",
  "what is climate change": "Climate change refers to long-term shifts in temperatures and weather patterns, mainly caused by human activities like burning fossil fuels. It leads to rising sea levels, extreme weather, and loss of biodiversity.",
  "what causes global warming": "Global warming is mainly caused by the increase of greenhouse gases like CO2, methane, and nitrous oxide from burning fossil fuels, deforestation, and industrial activities.",
  "how to stop global warming": "To help stop global warming, reduce fossil fuel use, switch to renewable energy, plant trees, eat less meat, and support climate-friendly policies.",
  "what is sustainability": "Sustainability means meeting our needs without compromising the ability of future generations to meet theirs. It involves using resources wisely and protecting the environment.",
  "what is biodiversity": "Biodiversity is the variety of all living things on Earth. It is essential for healthy ecosystems and human survival. Protecting biodiversity means protecting our future.",
  "what is renewable energy": "Renewable energy comes from natural sources that are constantly replenished, like solar, wind, hydro, and geothermal. It is clean and helps fight climate change.",
  "what is carbon neutral": "Being carbon neutral means balancing the amount of carbon dioxide emitted with an equivalent amount offset, for example by planting trees or using renewable energy.",
  "what is net zero": "Net zero means reducing greenhouse gas emissions as much as possible and offsetting the rest, so the total emissions are zero.",
  "what is the greenhouse effect": "The greenhouse effect is the process by which greenhouse gases trap heat in the Earth's atmosphere, keeping the planet warm enough to support life. Too many greenhouse gases cause global warming.",
  "what is eco-friendly": "Eco-friendly means not harmful to the environment. Eco-friendly products and actions help protect the planet.",
  "what is composting": "Composting is the process of turning organic waste like food scraps and leaves into nutrient-rich soil. It reduces landfill waste and helps gardens grow.",
  "what is fast fashion": "Fast fashion refers to cheap, trendy clothing that is produced quickly and often discarded after a few wears. It leads to waste and pollution. Choose quality, sustainable clothing instead.",
  "what is circular economy": "A circular economy is an economic system aimed at eliminating waste and reusing resources. Products are designed to last, be repaired, and recycled, reducing environmental impact.",
  "what is single-use plastic": "Single-use plastics are items used once and thrown away, like straws, bags, and bottles. They are a major source of pollution. Use reusable alternatives whenever possible.",
  "what is sustainable agriculture": "Sustainable agriculture uses farming methods that protect the environment, public health, and animal welfare. It avoids harmful chemicals and conserves water and soil.",
  "pvc": "PVC (polyvinyl chloride) is a widely used plastic in pipes, cables, and packaging. It is non-biodegradable and releases toxic chemicals like dioxins when burned. Consider alternatives like HDPE, LDPE, or bioplastics.",
  "hdpe": "HDPE (High Density Polyethylene) is used in bottles and containers. It is recyclable but still contributes to plastic pollution if not disposed of properly.",
  "ldpe": "LDPE (Low Density Polyethylene) is used in plastic bags and films. It is less recyclable and often ends up in landfills or as litter.",
  "bioplastics": "Bioplastics are made from renewable sources and are often biodegradable, making them a better alternative to conventional plastics.",
  "paper cup": "Paper cups are often lined with a thin layer of plastic to prevent leaks, making them difficult to recycle and not fully biodegradable. They contribute to both paper and plastic waste.",
  "which gases cause pollution": "Major polluting gases include Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O), Sulfur Dioxide (SO2), Nitrogen Dioxide (NO2), Ozone (O3), and Particulate Matter (PM2.5). These gases contribute to air pollution, global warming, and health problems.",
  "what is pm2.5": "PM2.5 refers to fine particulate matter less than 2.5 micrometers in diameter. These tiny particles can penetrate deep into the lungs and cause serious health issues. They come from construction, vehicles, fires, and industrial processes.",
  "what is ozone pollution": "Ozone (O3) at ground level is a harmful air pollutant formed by chemical reactions between NOx and VOCs in sunlight. It causes respiratory problems and is a major component of smog.",
  "how to reduce plastic pollution": "Reduce plastic pollution by using reusable bags, bottles, and containers, recycling properly, avoiding single-use plastics, and supporting products made from sustainable materials.",
  "how to reduce air pollution": "Reduce air pollution by using public transport, cycling, walking, conserving energy, supporting clean energy sources, and reducing waste burning.",
  "how to reduce water pollution": "Prevent water pollution by properly disposing of chemicals, reducing plastic use, avoiding littering, and supporting clean water initiatives.",
  "what is microplastic": "Microplastics are tiny plastic particles less than 5mm in size. They come from the breakdown of larger plastics and are found in oceans, rivers, and even drinking water, posing risks to wildlife and humans.",
  "what is greenwashing": "Greenwashing is when companies falsely market their products or practices as environmentally friendly. Always look for certifications and do your own research to verify eco-friendly claims.",
  "what is a carbon footprint": "A carbon footprint is the total amount of greenhouse gases, especially CO2, emitted by your activities. You can reduce it by using renewable energy, eating less meat, and minimizing waste.",
  "newspaper": "Newspapers use a lot of paper and ink, but can be recycled. Digital news is more eco-friendly.",
  "magazine": "Magazines are often glossy and harder to recycle. Digital magazines are more sustainable.",
  "receipt": "Paper receipts are often coated and not recyclable. Digital receipts are better for the environment.",
  "plastic spoon": "Plastic spoons are single-use and contribute to plastic pollution. Switch to metal, bamboo, or compostable spoons for a greener choice.",
  "plastic fork": "Plastic forks are single-use and contribute to plastic pollution. Metal, bamboo, or compostable forks are better alternatives.",
  "plastic knife": "Plastic knives are single-use and contribute to plastic pollution. Choose reusable or compostable knives for sustainability.",
  "tissue paper": "Tissue paper is often single-use and not recycled. Cloth napkins are more sustainable and reduce waste.",
  "plastic straw": "Plastic straws are often found in ocean pollution and harm marine life. Metal, bamboo, or skipping the straw are better options.",
  "environmental impact": "Discovering your environmental impact is the first step to making positive changes. You can assess your carbon footprint, waste generation, water usage, and energy consumption. Try online calculators, track your habits, and look for ways to reduce your impact in daily life.",
  "discover environmental impact": "To discover your environmental impact, start by analyzing your lifestyle: transportation, food choices, energy use, and waste habits. Use carbon footprint calculators, monitor your recycling and composting, and seek out sustainable alternatives for everyday items.",
  "measure environmental impact": "Measuring your environmental impact involves tracking your resource use and waste. Use online tools to calculate your carbon footprint, water usage, and energy consumption. Small changes, like reducing single-use plastics and conserving energy, can make a big difference.",
  "reduce environmental impact": "You can reduce your environmental impact by making sustainable choices: use reusable products, conserve energy and water, eat more plant-based foods, and support eco-friendly brands. Every small action adds up to a healthier planet.",
  "plastic cutlery": "Plastic cutlery is often used once and thrown away, contributing to landfill and ocean pollution. Switch to reusable metal, bamboo, or compostable cutlery for a more sustainable choice.",
  "metal cutlery": "Metal cutlery is durable and reusable, making it a great alternative to single-use plastic cutlery. Carry a set with you to avoid disposables.",
  "plastic plates": "Plastic plates are convenient but harmful to the environment. Use reusable ceramic, glass, or metal plates, or compostable options for events.",
  "ceramic plate": "Ceramic plates are reusable and long-lasting, reducing waste compared to single-use plastic plates.",
  "plastic cup": "Plastic cups are a major source of single-use waste. Opt for reusable glass, metal, or bamboo cups, or compostable alternatives.",
  "glass cup": "Glass cups are reusable and recyclable, making them a sustainable choice over single-use plastic cups.",
  "plastic container": "Plastic food containers can leach chemicals and contribute to pollution. Use glass, stainless steel, or silicone containers for safer, eco-friendly storage.",
  "glass container": "Glass containers are reusable, recyclable, and safe for food storage. They help reduce plastic waste and are better for your health.",
  "silicone container": "Silicone containers are flexible, reusable, and durable, making them a great alternative to single-use plastic containers.",
  "plastic wrap": "Plastic wrap is difficult to recycle and often ends up in landfills. Use beeswax wraps, silicone lids, or reusable containers to cover food sustainably.",
  "beeswax wrap": "Beeswax wraps are reusable and biodegradable, perfect for covering food and reducing plastic waste.",
  "aluminum foil": "Aluminum foil can be recycled, but it's best to use it sparingly. Consider reusable baking mats or containers for cooking and storage.",
  "plastic toothbrush": "Plastic toothbrushes contribute to landfill waste. Switch to bamboo or electric toothbrushes with replaceable heads for a greener option.",
  "bamboo toothbrush": "Bamboo toothbrushes are biodegradable and a great alternative to plastic toothbrushes.",
  "electric toothbrush": "Electric toothbrushes with replaceable heads reduce waste compared to disposable plastic toothbrushes.",
  "plastic packaging": "Plastic packaging is a major source of pollution. Choose products with minimal or compostable packaging, and support brands that use recycled materials.",
  "compostable packaging": "Compostable packaging breaks down naturally and reduces landfill waste. Look for certified compostable options when shopping.",
  "plastic food bag": "Plastic food bags are single-use and pollute the environment. Use reusable silicone, cloth, or beeswax bags for food storage.",
  "silicone food bag": "Silicone food bags are reusable, durable, and a great alternative to single-use plastic bags.",
  "plastic glove": "Plastic gloves are often used once and discarded. Use reusable rubber gloves for cleaning, or compostable gloves when possible.",
  "rubber glove": "Rubber gloves are reusable and reduce single-use plastic waste in cleaning routines.",
  "plastic water filter": "Plastic water filters can be replaced with stainless steel or ceramic filters for a more sustainable option.",
  "ceramic water filter": "Ceramic water filters are reusable and reduce plastic waste from disposable filters.",
  "reusable tote": "Reusable totes are made from durable materials like cloth, jute, or recycled plastics. They help reduce single-use plastic bag waste, can be used hundreds of times, and have a lower overall environmental impact when used regularly. Choose totes made from natural or recycled materials for the best sustainability.",
  "plastic pen": "Plastic pens are disposable and contribute to waste. Use refillable pens or pencils to reduce your impact.",
  "refillable pen": "Refillable pens and pencils are sustainable alternatives to disposable plastic pens.",
  "plastic razor": "Plastic razors are often single-use. Switch to safety razors with replaceable blades or electric razors for less waste.",
  "safety razor": "Safety razors with metal handles and replaceable blades are a sustainable alternative to disposable plastic razors.",
  "electric razor": "Electric razors are reusable and reduce the need for disposable plastic razors.",
  "plastic bag": "Plastic bags are harmful to the environment. Use reusable cloth bags, jute bags, or baskets for shopping.",
  "jute bag": "Jute bags are biodegradable and a great alternative to plastic bags for shopping.",
  "basket": "Baskets made from natural materials are reusable and sustainable for shopping and storage.",
  "plastic": "Plastic is one of the biggest environmental challenges! It takes hundreds of years to decompose and harms marine life. Try using reusable alternatives like cloth bags, metal water bottles, and bamboo products. Every piece of plastic you avoid saves marine life and reduces pollution.",
  "climate": "Climate change is a global crisis affecting everyone. Small actions like reducing plastic use, choosing renewable energy, and supporting sustainable products can make a big difference! The key is to start with one change and build from there.",
  "recycle": "Recycling is great, but reducing and reusing are even better! The best approach is: 1) Reduce consumption, 2) Reuse what you can, 3) Recycle what's left. Remember, not all plastics are recyclable, so always check local guidelines.",
  "carbon": "Carbon footprint measures your impact on climate change. You can reduce it by: using public transport, eating less meat, choosing renewable energy, and buying local products. Small changes add up to big impacts!",
  "ocean": "Our oceans are suffering from pollution, especially plastic waste. You can help by: avoiding single-use plastics, participating in beach cleanups, and supporting ocean conservation organizations. Every action counts!",
  "energy": "Renewable energy sources like solar, wind, and hydro power are crucial for fighting climate change. Consider switching to green energy providers or installing solar panels if possible. Even small solar installations can make a difference.",
  "food": "Food choices impact the environment significantly. Try eating more plant-based meals, buying local and seasonal produce, and reducing food waste to lower your environmental impact. Local food reduces transportation emissions!",
  "transport": "Transportation is a major source of emissions. Consider walking, cycling, using public transport, or carpooling. Electric vehicles are also becoming more accessible and eco-friendly! Every trip counts towards reducing your carbon footprint.",
  "water": "Water conservation is vital! Simple actions like fixing leaks, taking shorter showers, and using water-efficient appliances can save significant amounts of water. Remember, clean water is a precious resource.",
  "waste": "The best way to handle waste is to prevent it! Choose products with minimal packaging, compost organic waste, and donate items you no longer need instead of throwing them away. Zero waste living is achievable with small steps.",
  "sustainable": "Sustainable living means meeting your needs without compromising future generations. Start with small changes: use reusable items, reduce energy consumption, and support eco-friendly businesses. Every sustainable choice matters!",
  "biodiversity": "Biodiversity is essential for healthy ecosystems. You can help by: planting native species, avoiding pesticides, supporting conservation efforts, and reducing your ecological footprint. Every species plays a vital role!",
  "green": "Going green doesn't have to be overwhelming! Start with simple swaps: LED bulbs, reusable water bottles, cloth shopping bags, and natural cleaning products. Small changes create big impacts over time.",
  "pollution": "Pollution affects air, water, and soil quality. Reduce your contribution by: using public transport, avoiding single-use plastics, choosing eco-friendly products, and supporting clean energy initiatives.",
  "conservation": "Conservation protects natural resources for future generations. You can help by: reducing consumption, supporting protected areas, volunteering for environmental causes, and educating others about sustainability.",
  "renewable": "Renewable energy is the future! Solar, wind, hydro, and geothermal power provide clean, sustainable energy. Consider switching to renewable energy providers or installing solar panels on your home.",
  "compost": "Composting reduces waste and creates nutrient-rich soil. You can compost food scraps, yard waste, and paper products. It's easy to start with a simple bin in your backyard or even indoors!",
  "organic": "Organic farming reduces pesticide use and promotes soil health. Support organic farmers by buying organic products when possible. Even growing your own herbs can make a difference!",
  "local": "Buying local reduces transportation emissions and supports your community. Look for farmers markets, local businesses, and seasonal produce. Local food is often fresher and more nutritious too!",
  "zero": "Zero waste living aims to eliminate trash through mindful consumption. Start with the 5 R's: Refuse, Reduce, Reuse, Recycle, and Rot. Every step towards zero waste helps the planet!"
};

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

const getBotResponse = async (message) => {
  // Check if this is a comparison request
  const isComparison = isComparisonRequest(message);
  let comparisonData = null;
  
  if (isComparison) {
    comparisonData = findComparisonData(message);
  }

  // If we have comparison data, create a detailed comparison response
  if (comparisonData && comparisonData.length >= 2) {
    const comparisonResponse = createComparisonResponse(comparisonData);
    if (comparisonResponse) {
      return comparisonResponse;
    }
  }

  const lowerMessage = message.toLowerCase();

  // Improved matching: only match if keyword is a whole word or exact match
  for (const [keyword, response] of Object.entries(mockResponses)) {
    const keywordLower = keyword.toLowerCase();
    // Exact match
    if (lowerMessage.trim() === keywordLower) {
      return response;
    }
    // Whole word match (e.g., "carbon" only matches as a word, not as part of "afadcarbonxyz")
    const regex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(lowerMessage)) {
      return response;
    }
  }

  // If not found, try Google search via backend API
  try {
    const res = await fetch(`/api/google-search?q=${encodeURIComponent(message)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.answer) {
        return `🔎 (Google) ${data.answer}`;
      } else if (data && data.snippet) {
        return `🔎 (Google) ${data.snippet}`;
      }
    }
  } catch (e) {
    // ignore error, fallback to default
  }

  // Default responses with more variety
  const defaultResponses = [
    "I'm here to help you with climate action questions! Try asking about plastic, climate change, recycling, carbon footprint, oceans, energy, food, transport, water, waste, sustainable living, biodiversity, or green alternatives.",
    "Great question! I can help you learn about environmental topics. What specific aspect of climate action would you like to know more about? I'm knowledgeable about sustainability, conservation, and eco-friendly living.",
    "I'm passionate about helping people make eco-friendly choices! Ask me about reducing your environmental impact, sustainable living tips, or any climate-related concerns you have.",
    "Climate action starts with awareness! I'd be happy to discuss any environmental concerns you have or help you find ways to live more sustainably. Every question is a step towards positive change.",
    "I love helping people discover sustainable solutions! Whether it's about reducing waste, saving energy, or protecting our planet, I'm here to provide practical advice and encouragement.",
    "Environmental awareness is the first step to positive change! I can help you understand the impact of your choices and find sustainable alternatives. What would you like to learn about today?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: "bot", 
      text: "Hi! I'm Vasundhara, your climate action bot. I'm here to help you understand environmental impact, find sustainable alternatives, and make eco-friendly choices. You can ask me to compare products, analyze environmental impact, or get sustainability tips! 🌱", 
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

    // Simulate typing delay
    setTimeout(async () => {
      let botResponse = "";
      try {
        botResponse = await getBotResponse(input);
      } catch (e) {
        botResponse = "Sorry, I couldn't fetch an answer right now.";
      }
      const botMessage = {
        id: messages.length + 2,
        from: "bot",
        text: botResponse,
        timestamp: new Date(),
        type: "response"
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
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
        text: "Hi! I'm Vasundhara, your climate action bot. I'm here to help you understand environmental impact, find sustainable alternatives, and make eco-friendly choices. You can ask me to compare products, analyze environmental impact, or get sustainability tips! 🌱", 
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-glow">
            🌱
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold gradient-text mb-1">Vasundhara</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connected • Specialized Climate Bot
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
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-lg shadow-glow"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-lg shadow-glass dark:shadow-glass-dark backdrop-blur-sm"
              }`}
            >
              <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <div className={`flex items-center justify-between mt-2 ${
                message.from === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
              }`}>
                <span className="text-xs">{formatTime(message.timestamp)}</span>
                {message.from === "bot" && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Climate Bot</span>
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
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Climate Assistant is thinking...</span>
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
            className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg border-2 border-white/20 dark:border-gray-600/20 rounded-2xl focus:border-blue-500 focus:outline-none resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            placeholder="Type your climate action question..."
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
          className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-glow disabled:hover:scale-100 flex items-center justify-center"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Chat Stats */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{messages.length - 1} messages exchanged</span>
        <span>Specialized Climate Action Bot</span>
      </div>
    </div>
  );
};

export default Chatbot; 