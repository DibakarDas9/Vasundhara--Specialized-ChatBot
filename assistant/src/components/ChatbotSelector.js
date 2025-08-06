import React from 'react';

const ChatbotSelector = ({ activeChatbot, onChatbotChange }) => {
  return (
    <div className="glass-card rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
      {/* <h3 className="text-2xl font-bold gradient-text mb-4 text-center">Choose Your AI Assistant</h3> */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Original Chatbot Option (Vasundhara) - moved to left */}
        <button
          onClick={() => onChatbotChange('original')}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
            activeChatbot === 'original'
              ? 'border-primary-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-glow'
              : 'border-white/20 dark:border-gray-600/20 bg-white/30 dark:bg-gray-800/30 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl mr-3 shadow-lg">
              🌱
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200">Vasundhara</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Specialized Bot</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Specialized climate action chatbot with curated responses and quick topic suggestions for environmental questions.
          </p>
          {activeChatbot === 'original' && (
            <div className="mt-3 flex items-center text-primary-600 dark:text-primary-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Active</span>
            </div>
          )}
        </button>

        {/* Gemini Option */}
        <button
          onClick={() => onChatbotChange('gemini')}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
            activeChatbot === 'gemini'
              ? 'border-primary-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 shadow-glow'
              : 'border-white/20 dark:border-gray-600/20 bg-white/30 dark:bg-gray-800/30 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-xl mr-3 shadow-lg">
              🤖
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200">Gemini AI</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Google's Latest AI</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Advanced AI assistant powered by Google's Gemini model. Provides detailed, contextual responses about climate action and sustainability.
          </p>
          {activeChatbot === 'gemini' && (
            <div className="mt-3 flex items-center text-primary-600 dark:text-primary-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Active</span>
            </div>
          )}
        </button>

        {/* ChatGPT Option */}
        <button
          onClick={() => onChatbotChange('chatgpt')}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
            activeChatbot === 'chatgpt'
              ? 'border-green-500 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 shadow-glow'
              : 'border-white/20 dark:border-gray-600/20 bg-white/30 dark:bg-gray-800/30 hover:border-green-300'
          }`}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-xl mr-3 shadow-lg">
              🤖
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200">ChatGPT</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">OpenAI's AI</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Intelligent AI assistant powered by OpenAI's ChatGPT. Offers comprehensive climate action guidance and environmental insights.
          </p>
          {activeChatbot === 'chatgpt' && (
            <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Active</span>
            </div>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Tip:</strong> {activeChatbot === 'gemini' 
            ? 'Gemini provides more detailed, AI-powered responses. Add your API key for full functionality.'
            : activeChatbot === 'chatgpt'
            ? 'ChatGPT offers intelligent, context-aware responses. Add your OpenAI API key for full functionality.'
            : 'The Climate Assistant offers quick, curated responses for common environmental topics.'
          }
        </p>
      </div>
    </div>
  );
};

export default ChatbotSelector; 