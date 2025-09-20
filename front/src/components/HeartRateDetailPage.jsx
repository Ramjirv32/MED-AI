import React, { useState, useEffect } from 'react';

const HeartRateDetailPage = ({ onBack }) => {
  const [currentBPM, setCurrentBPM] = useState(72);
  const [isAnimating, setIsAnimating] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  // Simulate heartbeat animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 100);
      // Slight BPM variation for realism
      setCurrentBPM(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const heartRateZones = [
    { name: 'Resting', range: '60-70', color: 'bg-blue-400', active: true },
    { name: 'Fat Burn', range: '70-85', color: 'bg-green-400', active: false },
    { name: 'Cardio', range: '85-120', color: 'bg-yellow-400', active: false },
    { name: 'Peak', range: '120+', color: 'bg-red-400', active: false },
  ];

  return (
    <div className="heartrate-detail absolute inset-0 bg-gradient-to-br from-red-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-red-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-red-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Heart Rate Display */}
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center mb-4">
            <i className={`fas fa-heartbeat text-red-400 text-3xl transition-transform duration-100 ${
              isAnimating ? 'scale-125' : 'scale-100'
            }`}></i>
          </div>
          <div className="text-white text-5xl font-bold mb-2">{currentBPM}</div>
          <div className="text-red-400 text-lg font-medium">BPM</div>
        </div>

        {/* Heart Rate Zones */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Heart Rate Zones</h3>
          <div className="space-y-3">
            {heartRateZones.map((zone, index) => (
              <div key={index} className={`p-3 rounded-lg border transition-all duration-200 ${
                zone.active 
                  ? 'border-red-400 bg-red-500/20' 
                  : 'border-gray-600 bg-gray-800/50'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                    <span className="text-white font-medium">{zone.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{zone.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Chart */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Live Reading</h3>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
            <div className="relative h-16">
              <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                {/* ECG-like waveform */}
                <path
                  d="M 0 30 L 60 30 L 70 10 L 80 50 L 90 30 L 150 30 L 160 10 L 170 50 L 180 30 L 240 30 L 250 10 L 260 50 L 270 30 L 300 30"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,1000;1000,0;1000,0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <h3 className="text-white text-lg font-semibold mb-4">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-red-400 text-xl font-bold">68</div>
              <div className="text-gray-400 text-sm">Avg BPM</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 text-xl font-bold">85</div>
              <div className="text-gray-400 text-sm">Max BPM</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 text-xl font-bold">58</div>
              <div className="text-gray-400 text-sm">Min BPM</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 text-xl font-bold">62</div>
              <div className="text-gray-400 text-sm">Resting</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateDetailPage;