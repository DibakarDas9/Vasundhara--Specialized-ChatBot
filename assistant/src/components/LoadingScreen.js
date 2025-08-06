import React from "react";

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-green-400 to-green-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-100 dark:border-green-500 mb-6 shadow-2xl flex items-center justify-center text-5xl">
        <span role="img" aria-label="Earth">🌍</span>
      </div>
      <h1 className="text-4xl font-extrabold text-green-900 dark:text-green-200 drop-shadow-lg mb-2 tracking-wide">
        Vasundhara
      </h1>
      <p className="text-lg text-green-800 dark:text-green-100 font-medium animate-pulse">
        Empowering Climate Action...
      </p>
    </div>
  </div>
);

export default LoadingScreen;
