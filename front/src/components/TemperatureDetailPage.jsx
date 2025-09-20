import React from 'react';

const TemperatureDetailPage = ({ onBack }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const temperatureRanges = [
    { name: 'Hypothermia', range: '<95°F', color: 'text-blue-400', status: 'Low' },
    { name: 'Normal', range: '97-99°F', color: 'text-green-400', status: 'Normal', active: true },
    { name: 'Low Fever', range: '99-101°F', color: 'text-yellow-400', status: 'Elevated' },
    { name: 'High Fever', range: '>101°F', color: 'text-red-400', status: 'High' }
  ];

  const recentReadings = [
    { time: '06:00', temp: 97.8, status: 'Normal' },
    { time: '12:00', temp: 98.4, status: 'Normal' },
    { time: '18:00', temp: 98.7, status: 'Normal' },
    { time: 'Now', temp: 98.6, status: 'Normal', current: true }
  ];

  return (
    <div className="temperature-detail absolute inset-0 bg-gradient-to-br from-yellow-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-yellow-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-yellow-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Current Temperature */}
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-thermometer-half text-yellow-400 text-3xl"></i>
          </div>
          <div className="text-white text-5xl font-bold mb-2">98.6</div>
          <div className="text-yellow-400 text-lg font-medium mb-4">°F</div>
          <div className="inline-block bg-green-500/20 border border-green-400 rounded-full px-4 py-2">
            <span className="text-green-400 text-sm font-medium">Normal</span>
          </div>
        </div>

        {/* Temperature Gauge */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-64">
            {/* Thermometer background */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-56 bg-gray-700 rounded-full">
              {/* Temperature fill */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000"
                   style={{ height: '45%' }}>
              </div>
            </div>
            
            {/* Thermometer bulb */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full"></div>
            
            {/* Temperature scale */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
              <span>104°</span>
              <span>102°</span>
              <span>100°</span>
              <span className="text-yellow-400 font-bold">98.6°</span>
              <span>96°</span>
              <span>94°</span>
            </div>
          </div>
        </div>

        {/* Temperature Ranges */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Temperature Ranges</h3>
          <div className="space-y-2">
            {temperatureRanges.map((range, index) => (
              <div key={index} className={`p-3 rounded-lg transition-all duration-200 ${
                range.active 
                  ? 'bg-yellow-500/20 border border-yellow-400' 
                  : 'bg-gray-800/50 border border-gray-600'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${range.active ? 'text-white' : 'text-gray-300'}`}>
                    {range.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={range.color}>{range.range}</span>
                    <span className="text-gray-400 text-sm">({range.status})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Readings */}
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Readings</h3>
          <div className="space-y-2">
            {recentReadings.map((reading, index) => (
              <div key={index} className={`p-3 rounded-lg transition-all duration-200 ${
                reading.current 
                  ? 'bg-yellow-500/20 border border-yellow-400' 
                  : 'bg-gray-800/50 border border-gray-600'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${reading.current ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {reading.time}
                    </span>
                    <span className="text-white font-bold">{reading.temp}°F</span>
                  </div>
                  <span className="text-green-400 text-sm">{reading.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-yellow-400 text-xl font-bold">98.2°F</div>
              <div className="text-gray-400 text-sm">Average</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-xl font-bold">0.9°F</div>
              <div className="text-gray-400 text-sm">Variation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureDetailPage;