import React, { useState, useEffect } from 'react';

const PulseDetailPage = ({ onBack }) => {
  const [currentPulse, setCurrentPulse] = useState(68);
  const [isAnimating, setIsAnimating] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  // Simulate pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 150);
      // Slight pulse variation for realism
      setCurrentPulse(prev => Math.max(60, Math.min(75, prev + Math.floor(Math.random() * 3) - 1)));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const pulseZones = [
    { name: 'Resting', range: '60-70 BPM', color: 'bg-purple-400', active: true },
    { name: 'Light Activity', range: '70-85 BPM', color: 'bg-blue-400', active: false },
    { name: 'Moderate', range: '85-110 BPM', color: 'bg-green-400', active: false },
    { name: 'Vigorous', range: '110+ BPM', color: 'bg-red-400', active: false },
  ];

  const recentReadings = [
    { time: '08:00', pulse: 65, status: 'Resting' },
    { time: '14:30', pulse: 82, status: 'Light Activity' },
    { time: '19:45', pulse: 71, status: 'Resting' },
    { time: 'Now', pulse: 68, status: 'Resting', current: true }
  ];

  return (
    <div className="pulse-detail absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-purple-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-purple-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Pulse Display */}
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center mb-4">
            <div className={`relative transition-transform duration-150 ${
              isAnimating ? 'scale-110' : 'scale-100'
            }`}>
              <i className="fas fa-circle text-purple-400 text-4xl"></i>
              <div className={`absolute inset-0 rounded-full border-2 border-purple-400 transition-transform duration-150 ${
                isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
              }`}></div>
            </div>
          </div>
          <div className="text-white text-5xl font-bold mb-2">{currentPulse}</div>
          <div className="text-purple-400 text-lg font-medium">BPM</div>
        </div>

        {/* Pulse Wave Visualization */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Pulse Wave</h3>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
            <div className="relative h-20">
              <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                {/* Pulse waveform */}
                <path
                  d="M 0 40 L 40 40 L 50 20 L 60 60 L 70 40 L 110 40 L 120 20 L 130 60 L 140 40 L 180 40 L 190 20 L 200 60 L 210 40 L 250 40 L 260 20 L 270 60 L 280 40 L 300 40"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,1000;1000,0;1000,0"
                    dur="2.7s"
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Pulse dots */}
                <circle cx="50" cy="20" r="3" fill="#A855F7">
                  <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite"/>
                </circle>
                <circle cx="120" cy="20" r="3" fill="#A855F7">
                  <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0.3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="190" cy="20" r="3" fill="#A855F7">
                  <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0.6s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Pulse Zones */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">Pulse Zones</h3>
          <div className="space-y-3">
            {pulseZones.map((zone, index) => (
              <div key={index} className={`p-3 rounded-lg border transition-all duration-200 ${
                zone.active 
                  ? 'border-purple-400 bg-purple-500/20' 
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

        {/* Recent Readings */}
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Readings</h3>
          <div className="space-y-2">
            {recentReadings.map((reading, index) => (
              <div key={index} className={`p-3 rounded-lg transition-all duration-200 ${
                reading.current 
                  ? 'bg-purple-500/20 border border-purple-400' 
                  : 'bg-gray-800/50 border border-gray-600'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${reading.current ? 'text-purple-400' : 'text-gray-400'}`}>
                      {reading.time}
                    </span>
                    <span className="text-white font-bold">{reading.pulse} BPM</span>
                  </div>
                  <span className="text-purple-400 text-sm">{reading.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-purple-400 text-xl font-bold">72</div>
              <div className="text-gray-400 text-sm">Avg Pulse</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-xl font-bold">95%</div>
              <div className="text-gray-400 text-sm">Regularity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseDetailPage;