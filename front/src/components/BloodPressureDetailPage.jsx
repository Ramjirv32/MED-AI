import React from 'react';

const BloodPressureDetailPage = ({ onBack }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const recentReadings = [
    { time: '09:00', systolic: 118, diastolic: 78, status: 'Normal' },
    { time: '12:30', systolic: 122, diastolic: 82, status: 'Normal' },
    { time: '18:15', systolic: 125, diastolic: 85, status: 'Normal' },
    { time: 'Now', systolic: 120, diastolic: 80, status: 'Normal', current: true }
  ];

  const pressureCategories = [
    { name: 'Normal', range: '<120/80', color: 'text-green-400', active: true },
    { name: 'Elevated', range: '120-129/<80', color: 'text-yellow-400', active: false },
    { name: 'High Stage 1', range: '130-139/80-89', color: 'text-orange-400', active: false },
    { name: 'High Stage 2', range: '≥140/≥90', color: 'text-red-400', active: false }
  ];

  return (
    <div className="pressure-detail absolute inset-0 bg-gradient-to-br from-orange-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-orange-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-orange-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Current Reading */}
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-tachometer-alt text-orange-400 text-3xl"></i>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-white text-4xl font-bold">120</span>
            <span className="text-gray-400 text-2xl">/</span>
            <span className="text-white text-4xl font-bold">80</span>
          </div>
          <div className="text-orange-400 text-lg font-medium mb-2">mmHg</div>
          <div className="inline-block bg-green-500/20 border border-green-400 rounded-full px-3 py-1">
            <span className="text-green-400 text-sm font-medium">Normal</span>
          </div>
        </div>

        {/* Pressure Categories */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Blood Pressure Categories</h3>
          <div className="space-y-2">
            {pressureCategories.map((category, index) => (
              <div key={index} className={`p-3 rounded-lg transition-all duration-200 ${
                category.active 
                  ? 'bg-orange-500/20 border border-orange-400' 
                  : 'bg-gray-800/50 border border-gray-600'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${category.active ? 'text-white' : 'text-gray-300'}`}>
                    {category.name}
                  </span>
                  <span className={category.color}>{category.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Readings */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Readings</h3>
          <div className="space-y-2">
            {recentReadings.map((reading, index) => (
              <div key={index} className={`p-3 rounded-lg transition-all duration-200 ${
                reading.current 
                  ? 'bg-orange-500/20 border border-orange-400' 
                  : 'bg-gray-800/50 border border-gray-600'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${reading.current ? 'text-orange-400' : 'text-gray-400'}`}>
                      {reading.time}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-bold">{reading.systolic}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-white font-bold">{reading.diastolic}</span>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm">{reading.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="flex-1">
          <h3 className="text-white text-lg font-semibold mb-4">7-Day Trend</h3>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 h-full">
            <div className="relative h-24">
              <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="pressureGrid" width="30" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(251, 146, 60, 0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pressureGrid)" />
                
                {/* Systolic line */}
                <path
                  d="M 0 40 L 50 35 L 100 38 L 150 32 L 200 36 L 250 30 L 300 34"
                  fill="none"
                  stroke="#FB923C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                {/* Diastolic line */}
                <path
                  d="M 0 55 L 50 52 L 100 54 L 150 48 L 200 51 L 250 46 L 300 50"
                  fill="none"
                  stroke="#FCD34D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureDetailPage;