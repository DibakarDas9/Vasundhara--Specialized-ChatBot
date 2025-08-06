import React from "react";

const ImpactInfo = ({ item, data }) => {
  if (!data) return null;

  return (
    <div className="glass-card rounded-3xl p-8 slide-up">
      <div className="flex items-center mb-8">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mr-6 shadow-lg ${
          data.ecoFriendly 
            ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-glow' 
            : 'bg-gradient-to-br from-red-500 to-red-600 shadow-glow'
        }`}>
          {data.ecoFriendly ? '🌱' : '⚠️'}
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 capitalize mb-2">{item}</h2>
          <p className={`text-xl font-semibold ${
            data.ecoFriendly ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {data.ecoFriendly ? '✅ Eco-Friendly Choice!' : '❌ Environmental Concern'}
          </p>
        </div>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        {data.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🌡️</div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-lg">CO₂ Emission</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{data.co2} kg</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">per use</p>
        </div>

        <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🗑️</div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-lg">Annual Pollution</h3>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{data.annualPollutionKg} kg</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">if used regularly</p>
        </div>

        <div className={`glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 ${
          data.nonBiodegradable ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
        }`}>
          <div className="text-4xl mb-4">
            {data.nonBiodegradable ? '⏰' : '♻️'}
          </div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-lg">Biodegradable</h3>
          <p className={`text-3xl font-bold mb-1 ${
            data.nonBiodegradable ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {data.nonBiodegradable ? 'No' : 'Yes'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.nonBiodegradable ? 'Takes years to decompose' : 'Natural decomposition'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactInfo; 