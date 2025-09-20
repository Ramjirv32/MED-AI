import React from 'react';

const SleepDetailPage = ({ onBack }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="sleep-detail absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-blue-400/50 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <button 
          onClick={onBack}
          className="text-blue-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
        >
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="text-white text-lg font-bold">
          {getCurrentTime()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full pb-20">
        {/* Time indicator at top */}
        <div className="absolute top-20 text-blue-400 text-2xl font-bold mb-4">
          12
        </div>

        {/* Main sleep circle */}
        <div className="relative w-48 h-48 mb-8">
          {/* Outer circle with dots */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-600">
            {/* Clock dots */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-500 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translateY(-90px) rotate(${i * 30}deg) translateY(90px) rotate(-${i * 30}deg)`
                }}
              />
            ))}
          </div>

          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(7.5 / 8) * 534} 534`}
              className="transition-all duration-1000"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-lg font-medium mb-1">Sleep</div>
            <div className="text-white text-3xl font-bold">8h 46m</div>
          </div>

          {/* Moon icon */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <i className="fas fa-moon text-white text-sm"></i>
          </div>

          {/* Target icon */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-bullseye text-white text-sm"></i>
          </div>
        </div>

        {/* Time indicators */}
        <div className="absolute bottom-32 left-8 text-blue-400 text-xl font-bold">
          9
        </div>
        <div className="absolute bottom-32 right-8 text-blue-400 text-xl font-bold">
          3
        </div>
        <div className="absolute bottom-16 text-blue-400 text-xl font-bold">
          6
        </div>

        {/* Sleep stats */}
        <div className="mt-8 px-6 w-full">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-blue-400 text-2xl font-bold">22:30</div>
                <div className="text-gray-400 text-sm">Bedtime</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 text-2xl font-bold">7:16</div>
                <div className="text-gray-400 text-sm">Wake up</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality indicator */}
        <div className="mt-4 px-6 w-full">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Sleep Quality</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-full ${
                      i < 4 ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepDetailPage;