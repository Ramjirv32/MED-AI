import React, { useState, useEffect } from 'react';

const BatteryPanel = ({ isOpen, onClose, batteryLevel }) => {
  const [batteryHistory, setBatteryHistory] = useState([]);

  // Dummy battery history data
  const generateBatteryHistory = () => {
    return [85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52, 47];
  };

  useEffect(() => {
    if (isOpen) {
      setBatteryHistory(generateBatteryHistory());
    }
  }, [isOpen]);

  return (
    <div className={`battery-dropdown ${isOpen ? 'active' : 'hidden'}`} style={{ padding: '0.75rem' }}>
      <div className="battery-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <i className="fas fa-arrow-left"></i>
            </button>
            <h3 className="text-white text-lg">Battery</h3>
          </div>
        </div>
      </div>

      <div className="battery-percentage" style={{ fontSize: '3rem', margin: '1rem 0', fontWeight: 'bold' }}>{batteryLevel}%</div>
      <div className="battery-label" style={{ fontWeight: 'bold' }}>Charge Level</div>
      
      <div className="battery-info flex justify-between text-gray-400 text-sm mb-3" style={{ fontWeight: 'bold' }}>
        <span>Usage</span>
        <span>Last 12 hours</span>
      </div>

      {/* Battery usage graph */}
      <div className="battery-graph">
        <div className="grid grid-cols-12 gap-1 h-24 items-end mb-2">
          {batteryHistory.map((level, index) => (
            <div key={index} className="battery-bar flex flex-col justify-end h-full">
              <div 
                className="battery-bar-fill transition-all duration-300"
                style={{ 
                  height: `${(level / 100) * 96}px`,
                  backgroundColor: level >= 80 ? '#3b82f6' : 
                                 level >= 60 ? '#60a5fa' : 
                                 level >= 40 ? '#93c5fd' : 
                                 level >= 20 ? '#dbeafe' : '#fecaca'
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2" style={{ fontWeight: 'bold' }}>
          <span>12pm</span>
          <span>7am</span>
          <span>3pm</span>
        </div>
      </div>
    </div>
  );
};

export default BatteryPanel;
