# 🌍 Vasundhara 

A modern, innovative React.js website focused on SDG 13 – Climate Action. This app features a stunning glassmorphism design, dark mode support, and AI-powered assistance to help users understand environmental impact and discover eco-friendly alternatives.

## ✨ Features

- **🎨 Modern Glassmorphism Design** - Beautiful glass-like cards with backdrop blur effects
- **🌙 Dark Mode Support** - Toggle between light and dark themes with smooth transitions
- **🔍 Advanced Item Search** - Search for any item to see its environmental impact
- **📊 Interactive Data Visualization** - Beautiful charts showing pollution data using Chart.js
- **🌱 Eco-Friendly Alternatives** - Smart suggestions for sustainable alternatives
- **🎉 Smart Compliments** - Positive reinforcement for eco-friendly choices
- **🤖 Triple AI Assistants** - Choose between Gemini AI, ChatGPT, and specialized Climate Assistant
- **📱 Fully Responsive** - Modern UI that works perfectly on all devices
- **⚡ Smooth Animations** - Micro-interactions and hover effects throughout
- **🎯 Sectioned Layout** - Organized sections for better user experience

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Google Cloud account (for Gemini AI - optional)

### Installation

1. **Clone or download the project**
   ```bash
   cd climate-action-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up AI Assistants (Optional)**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your API keys
   # Gemini AI: https://makersuite.google.com/app/apikey
   # ChatGPT: https://platform.openai.com/api-keys
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
climate-action-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ItemSearch.js          # Modern search interface
│   │   ├── ImpactInfo.js          # Environmental impact display
│   │   ├── PollutionChart.js      # Chart.js visualizations
│   │   ├── Alternatives.js        # Eco-friendly suggestions
│   │   ├── Chatbot.js             # Original climate assistant
│   │   ├── GeminiChatbot.js       # Google Gemini AI integration
│   │   ├── ChatGPTChatbot.js      # OpenAI ChatGPT integration
│   │   ├── ChatbotSelector.js     # AI assistant selector
│   │   └── DarkModeToggle.js      # Dark mode toggle
│   ├── data/
│   │   └── impactData.json        # Environmental impact data
│   ├── App.js                     # Main application with sections
│   ├── index.js                   # React entry point
│   └── index.css                  # Tailwind CSS with custom styles
├── package.json                   # Dependencies & scripts
├── tailwind.config.js             # Custom theme & dark mode
├── postcss.config.js              # PostCSS configuration
├── env.example                    # Environment variables example
├── .gitignore                     # Git ignore rules
├── README.md                      # This file
├── DEPLOYMENT.md                  # IBM Cloud deployment guide
└── setup.bat                      # Windows setup script
```

## 🎯 How to Use

1. **Search for Items**: Enter any item in the search bar (e.g., "plastic bag", "coffee cup", "bamboo")
2. **View Impact**: See detailed environmental impact information with beautiful visualizations
3. **Explore Alternatives**: Get suggestions for eco-friendly alternatives
4. **Choose AI Assistant**: Switch between Gemini AI, ChatGPT, and Climate Assistant
5. **Toggle Dark Mode**: Click the sun/moon icon in the top-right corner
6. **Get Compliments**: Receive positive feedback for eco-friendly choices

## 🤖 AI Assistants

### Gemini AI (Google's Latest AI)
- **Advanced AI Responses**: Powered by Google's Gemini model
- **Contextual Understanding**: Provides detailed, personalized responses
- **Real-time Processing**: Live AI-powered conversations
- **Setup Required**: Add your Gemini API key to `.env` file

### ChatGPT (OpenAI's AI)
- **Intelligent Conversations**: Powered by OpenAI's ChatGPT model
- **Comprehensive Knowledge**: Wide range of climate and environmental topics
- **Context-Aware Responses**: Maintains conversation context
- **Setup Required**: Add your OpenAI API key to `.env` file

### Climate Assistant (Specialized Bot)
- **Curated Responses**: Pre-programmed responses for common topics
- **Quick Suggestions**: Instant topic buttons for fast access
- **No Setup Required**: Works immediately without API keys
- **Focused Knowledge**: Specialized in climate action topics

## 🎨 Design Features

### Glassmorphism
- Translucent glass-like cards with backdrop blur
- Subtle borders and shadows
- Smooth hover effects and transitions

### Dark Mode
- Automatic theme detection
- Persistent theme preference
- Smooth transitions between themes
- Optimized colors for both modes

### Animations
- Floating elements with CSS animations
- Hover effects and micro-interactions
- Smooth page transitions
- Loading states and feedback

### Typography
- Inter font family for modern readability
- Gradient text effects
- Responsive font sizing
- Optimized for accessibility

## 📊 Sample Data

The app includes comprehensive data for various items:
- **Plastic Items**: bags, bottles, straws, cups
- **Eco-Friendly Items**: cloth bags, reusable bottles, metal straws
- **Natural Materials**: bamboo, paper products
- **Each item includes**:
  - CO₂ emission data
  - Biodegradability information
  - Annual pollution estimates
  - Eco-friendly alternatives
  - Detailed descriptions


## 🔧 Environment Variables & Backend Setup

Create a `.env` file in the root directory:

```env
# Required for Gemini AI functionality (frontend)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here

# Required for ChatGPT functionality (backend)
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000

# Optional: Analytics (frontend)
REACT_APP_GA_TRACKING_ID=your_google_analytics_id_here
```

### Backend Setup for ChatGPT

To securely use ChatGPT, you need to run a backend server:

1. **Install backend dependencies**
   ```bash
   npm install express axios cors dotenv
   ```

2. **Start the backend server**
   ```bash
   node server.js
   ```
   You should see: `Server running on port 5000`

3. **Start the React frontend in a separate terminal**
   ```bash
   npm start
   ```

Your React app will now communicate with the backend for ChatGPT requests.

### Getting API Keys

#### Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in with your OpenAI account
3. Create a new API key
4. Copy the key to your `.env` file as `OPENAI_API_KEY`

## 🌐 Deployment


### IBM Cloud Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to IBM Cloud Object Storage**
   - Upload the `build/` folder contents
   - Configure static website hosting
   - Set up custom domain (optional)

3. **Environment Variables in Production**
   - Add your Gemini API key to your hosting platform's environment variables
   - Ensure the key is accessible as `REACT_APP_GEMINI_API_KEY`
   - For ChatGPT, deploy your backend server and set `OPENAI_API_KEY` securely

### Other Deployment Options

- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload to S3 with static website hosting

## 🎨 Customization

### Adding New Items
Edit `src/data/impactData.json` to add new items:

```json
{
  "your item": {
    "co2": 0.1,
    "nonBiodegradable": true,
    "annualPollutionKg": 5,
    "alternatives": ["eco-friendly option 1", "eco-friendly option 2"],
    "ecoFriendly": false,
    "description": "Description of the item's environmental impact"
  }
}
```

### Styling
The app uses a custom Tailwind configuration with:
- Custom color palette
- Dark mode support
- Glassmorphism utilities
- Animation classes
- Custom gradients and shadows

### Chatbot Responses
- **Gemini**: Edit the prompt in `GeminiChatbot.js`
- **ChatGPT**: Edit the prompt in `ChatGPTChatbot.js`
- **Climate Assistant**: Edit the `mockResponses` object in `Chatbot.js`

## 🔒 Security

- API keys are stored in environment variables
- No sensitive data is exposed in the client-side code
- Gemini API calls are made server-side (when deployed with backend)
- Demo mode available when no API key is provided

## 📈 Performance

- Optimized bundle size with code splitting
- Lazy loading for components
- Efficient re-renders with React hooks
- Optimized images and assets
- Fast loading with modern build tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including dark mode)
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **SDG 13**: United Nations Sustainable Development Goal for Climate Action
- **React.js**: For the amazing frontend framework
- **Tailwind CSS**: For the beautiful styling system
- **Chart.js**: For the data visualizations
- **Google Gemini AI**: For advanced AI capabilities
- **OpenAI ChatGPT**: For intelligent conversations
- **Inter Font**: For modern typography

## 📞 Support

If you have any questions or need help with:
- **Setup**: Check the installation steps above
- **AI Integration**: See the environment variables section
- **Deployment**: Refer to the deployment guide
- **Customization**: Check the customization section

**🌱 Together, we can make a difference for our planet! Every small action counts towards a sustainable future.** 
