import React from 'react';

const StepsDetailPage = ({ onBack }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const monthlyData = [
    { month: 'JAN', value: 8500, height: '40%' },
    { month: 'FEB', value: 9200, height: '55%' },
    { month: 'MAR', value: 7800, height: '35%' },
    { month: 'APR', value: 12432, height: '90%', active: true }
  ];

  return (
    <div className="steps-detail absolute inset-0 bg-gradient-to-br from-green-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-green-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-green-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Steps Count */}
        <div className="text-center mb-8 mt-4">
          <div className="text-white text-4xl font-bold mb-2">12,432</div>
          <div className="text-green-400 text-lg font-medium">Steps</div>
        </div>

        {/* Progress Graph */}
        <div className="flex-1 flex flex-col justify-center mb-8">
          {/* Goal line */}
          <div className="relative mb-4">
            <div className="absolute right-0 top-0 text-green-400 text-sm font-medium">12,000</div>
            <div className="w-full h-px bg-green-400/50 mt-4"></div>
          </div>

          {/* Wave Chart */}
          <div className="relative h-32 mb-8">
            <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Wave path */}
              <path
                d="M 0 80 Q 50 20 100 60 Q 150 100 200 40 Q 250 80 300 60"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Fill area under curve */}
              <path
                d="M 0 80 Q 50 20 100 60 Q 150 100 200 40 Q 250 80 300 60 L 300 120 L 0 120 Z"
                fill="url(#gradient)"
                opacity="0.3"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              {/* Peak indicator */}
              <circle cx="200" cy="40" r="4" fill="#22C55E"/>
              <circle cx="200" cy="40" r="8" fill="none" stroke="#22C55E" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>

          {/* Monthly Chart */}
          <div className="flex items-end justify-center space-x-8 h-24 mb-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center">
                <div 
                  className={`w-6 rounded-t-lg transition-all duration-1000 ${
                    data.active ? 'bg-green-400' : 'bg-green-400/50'
                  }`}
                  style={{ height: data.height }}
                />
                <div className={`text-xs mt-2 font-medium ${
                  data.active ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-green-400 text-xl font-bold">2.1</div>
              <div className="text-gray-400 text-sm">km</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 text-xl font-bold">186</div>
              <div className="text-gray-400 text-sm">kcal</div>
            </div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Daily Goal</span>
            <span className="text-green-400 text-sm font-medium">103%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full transition-all duration-1000" style={{ width: '103%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsDetailPage;