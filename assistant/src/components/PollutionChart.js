import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PollutionChart = ({ item, data }) => {
  const [chartType, setChartType] = useState("bar");
  
  if (!data) return null;

  // Calculate annual impact breakdown
  const annualCO2 = data.co2 * 365; // Daily CO2 * 365 days
  const annualWaste = data.annualPollutionKg;
  const annualWater = data.ecoFriendly ? 0 : data.annualPollutionKg * 0.3; // Estimate water pollution
  const annualEnergy = data.ecoFriendly ? data.annualPollutionKg * 0.2 : data.annualPollutionKg * 0.5; // Estimate energy impact

  const barChartData = {
    labels: [item.charAt(0).toUpperCase() + item.slice(1)],
    datasets: [
      {
        label: "Annual Pollution (kg)",
        data: [data.annualPollutionKg],
        backgroundColor: data.ecoFriendly 
          ? "rgba(34, 197, 94, 0.8)" 
          : "rgba(239, 68, 68, 0.8)",
        borderColor: data.ecoFriendly 
          ? "rgba(34, 197, 94, 1)" 
          : "rgba(239, 68, 68, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const pieChartData = {
    labels: [
      "CO₂ Emissions",
      "Waste Generation", 
      "Water Pollution",
      "Energy Impact"
    ],
    datasets: [
      {
        data: [annualCO2, annualWaste, annualWater, annualEnergy],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",    // Red for CO2
          "rgba(245, 158, 11, 0.8)",   // Orange for waste
          "rgba(59, 130, 246, 0.8)",   // Blue for water
          "rgba(139, 92, 246, 0.8)",   // Purple for energy
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(245, 158, 11, 1)", 
          "rgba(59, 130, 246, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Annual Environmental Impact",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#374151",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: data.ecoFriendly ? "#22c55e" : "#ef4444",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Annual pollution: ${context.parsed.y.toFixed(2)} kg`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#6b7280",
          font: {
            weight: "500",
          },
        },
        title: {
          display: true,
          text: "Pollution (kg)",
          color: "#374151",
          font: {
            weight: "600",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            weight: "500",
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: "500",
          },
          color: "#374151",
        },
      },
      title: {
        display: true,
        text: "Annual Impact Breakdown",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#374151",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: data.ecoFriendly ? "#22c55e" : "#ef4444",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toFixed(2)} kg (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <h3 className="text-2xl lg:text-3xl font-bold gradient-text mb-4 lg:mb-0">
          📊 Environmental Impact Visualization
        </h3>
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            data.ecoFriendly 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
          }`}>
            {data.ecoFriendly ? '🌱 Low Impact' : '⚠️ High Impact'}
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                chartType === "bar"
                  ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                chartType === "pie"
                  ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              Pie Chart
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-80 lg:h-96 mb-6">
        {chartType === "bar" ? (
          <Bar data={barChartData} options={barOptions} />
        ) : (
          <Pie data={pieChartData} options={pieOptions} />
        )}
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">CO₂ Emissions</p>
              <p className="text-lg font-bold text-red-800 dark:text-red-200">
                {annualCO2.toFixed(2)} kg
              </p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
              🌡️
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Waste Generation</p>
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">
                {annualWaste.toFixed(2)} kg
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
              🗑️
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Water Pollution</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                {annualWater.toFixed(2)} kg
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              💧
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Energy Impact</p>
              <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
                {annualEnergy.toFixed(2)} kg
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
              ⚡
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
            💡
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Understanding Your Impact
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <strong>CO₂ Emissions:</strong> Greenhouse gas contribution to climate change<br/>
              <strong>Waste Generation:</strong> Physical waste that ends up in landfills or oceans<br/>
              <strong>Water Pollution:</strong> Contamination of water resources during production/use<br/>
              <strong>Energy Impact:</strong> Energy consumption throughout the item's lifecycle
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
              <strong>💚 Tip:</strong> Consider switching to eco-friendly alternatives to significantly reduce your environmental footprint!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutionChart; 