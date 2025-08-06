import React from "react";

const Alternatives = ({ data }) => {
  if (!data) return null;

  if (data.ecoFriendly) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl mr-4">🎉</span>
          <div>
            <h3 className="text-3xl font-bold text-green-700 mb-2">
              Well Done!
            </h3>
            <p className="text-xl text-green-600">
              You're making an eco-friendly choice!
            </p>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            🌱 <strong>Excellent choice!</strong> You're already contributing to a sustainable future. 
            Keep up the great work and encourage others to make similar eco-friendly decisions!
          </p>
          
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="text-2xl">🌍</span>
            <span className="text-2xl">♻️</span>
            <span className="text-2xl">🌿</span>
            <span className="text-2xl">💚</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mr-4">
          💡
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">
            Eco-Friendly Alternatives
          </h3>
          <p className="text-yellow-700">
            Consider these sustainable options instead:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.alternatives.map((alternative, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🌱</span>
              <h4 className="font-semibold text-gray-800 capitalize">
                {alternative}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              A sustainable alternative that's better for the environment
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white/60 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">💚</span>
          Why Switch?
        </h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Reduce your carbon footprint
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Help protect marine life and ecosystems
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Save money in the long run
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Inspire others to make sustainable choices
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Alternatives; 