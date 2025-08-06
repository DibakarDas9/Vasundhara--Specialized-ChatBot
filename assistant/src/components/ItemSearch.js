import React, { useState } from "react";

const ItemSearch = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toLowerCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 relative group">
        <input
          type="text"
          className="w-full px-8 py-6 text-xl border-2 border-white/20 dark:border-gray-600/20 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-glass dark:shadow-glass-dark bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 group-hover:shadow-glow dark:group-hover:shadow-glow-blue"
          placeholder="Enter an item (e.g., plastic bag, coffee cup)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-2xl">
        </div>
      </div>
      <button
        type="submit"
        className="px-10 py-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-xl rounded-2xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-glow hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={!input.trim()}
      >
        <span className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Impact
        </span>
      </button>
    </form>
  );
};

export default ItemSearch; 