import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import WeatherPanel from './WeatherPanel';
import CalendarPanel from './CalendarPanel';
import BatteryPanel from './BatteryPanel';
import HealthParameters from './HealthParameters';

const WatchWidget = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [currentDate, setCurrentDate] = useState('Loading...');
  const [dayIcon, setDayIcon] = useState('fas fa-sun text-orange-400 text-sm');
  const [batteryPercent, setBatteryPercent] = useState('---%');
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [networkStatus, setNetworkStatus] = useState('--');
  const [weatherPanelOpen, setWeatherPanelOpen] = useState(false);
  const [calendarPanelOpen, setCalendarPanelOpen] = useState(false);
  const [batteryPanelOpen, setBatteryPanelOpen] = useState(false);
  const [healthPanelOpen, setHealthPanelOpen] = useState(false);

  // Time and Date functions
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    setCurrentTime(timeString);
    
    // Update date
    const dateString = now.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      weekday: 'long' 
    });
    setCurrentDate(dateString);
    
    // Update day/night icon
    const hour = now.getHours();
    if (hour >= 6 && hour < 18) {
      setDayIcon('fas fa-sun text-orange-400 text-sm');
    } else {
      setDayIcon('fas fa-moon text-blue-300 text-sm');
    }
  };

  // Battery functions
  const updateBattery = () => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const level = Math.round(battery.level * 100);
        setBatteryPercent(`${level}%`);
        setBatteryLevel(level);
      });
    }
  };

  const updateNetwork = () => {
    const statuses = ['Connected', 'Online', 'Synced'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    setConnectionStatus(status);
    setNetworkStatus('WiFi');
  };

  // Panel toggle functions
  const toggleWeather = () => {
    setWeatherPanelOpen(!weatherPanelOpen);
  };

  const toggleCalendar = () => {
    setCalendarPanelOpen(!calendarPanelOpen);
  };

  const toggleBattery = () => {
    setBatteryPanelOpen(!batteryPanelOpen);
  };

  const toggleHealth = () => {
    setHealthPanelOpen(!healthPanelOpen);
  };

  // Navigation functions
  const openChat = () => {
    navigate('/chat');
  };

  const openHealth = () => {
    toggleHealth();
  };

  // Effects
  useEffect(() => {
    updateTime();
    updateBattery();
    updateNetwork();
    
    const timeInterval = setInterval(updateTime, 1000);
    const batteryInterval = setInterval(updateBattery, 30000);
    const networkInterval = setInterval(updateNetwork, 10000);

    return () => {
      // clearInterval(timeInterval);
      clearInterval(batteryInterval);
      clearInterval(networkInterval);
    };
  }, []);

  return (
    <>
      <div className="w-80 h-[480px] relative">
        <div className="bg-black/95 backdrop-blur-lg rounded-3xl p-4 w-80 h-[480px] flex flex-col justify-between border border-gray-700/50 widget-glow">
          {/* Header with dynamic status icons */}
          <div className="flex justify-between items-center mb-3">
              {/* Dynamic Battery Icon */}
              <div className="flex items-center space-x-2 cursor-pointer battery-icon ripple" onClick={toggleBattery}>
                <div className="relative">
                  <div className="w-8 h-4 border border-blue-400 rounded-sm bg-gray-800">
                    <div 
                      className="battery-fill h-full rounded-sm" 
                      style={{ 
                        width: `${batteryLevel}%`,
                        backgroundColor: batteryLevel <= 20 ? '#ef4444' : 
                                      batteryLevel <= 50 ? '#f59e0b' : '#3b82f6'
                      }}
                    ></div>
                  </div>
                  <div className="w-1 h-2 bg-blue-400 rounded-r absolute -right-1 top-1"></div>
                </div>
                <span className="text-blue-400 text-xs font-medium">{batteryPercent}</span>
              </div>
            
            {/* Weather Icon with dropdown */}
            <div className="relative">
              <div className="weather-icon flex items-center space-x-1 bg-blue-500/20 px-3 py-1 rounded-full ripple" onClick={toggleWeather}>
                <i className="fas fa-cloud-sun text-blue-400 text-sm" id="weatherIcon"></i>
                <span className="text-blue-400 text-xs font-medium" id="temperature">--°</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic Date and Day */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <i className={dayIcon}></i>
              <span className="text-gray-300 text-sm font-medium">{currentDate}</span>
              <FaCalendarAlt className="text-blue-400 text-sm cursor-pointer calendar-icon ripple" onClick={toggleCalendar} />
              <i className="fas fa-clock text-blue-400 text-sm pulse-slow"></i>
            </div>
          </div>
          
          {/* Enhanced timer display */}
          <div className="text-center mb-6">
            <div className="text-5xl font-light text-white timer-glow mb-4 tracking-wider">
              {currentTime}
            </div>
          </div>
          
          {/* Larger chat and health icons */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            {/* Chat Icon */}
            <div className="bg-blue-500/20 p-3 rounded-2xl icon-glow-blue cursor-pointer chat-icon ripple" onClick={openChat}>
              <i className="fas fa-comment text-blue-400 text-xl"></i>
            </div>
            
            {/* Health Icon */}
            <div className="bg-blue-500/20 p-3 rounded-2xl icon-glow-blue cursor-pointer health-icon ripple" onClick={openHealth}>
              <i className="fas fa-heartbeat text-blue-400 text-xl"></i>
            </div>
          </div>
          
            {/* Dynamic bottom status */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full pulse-slow"></div>
                <span className="text-blue-400 text-xs">{connectionStatus}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <i className="fas fa-wifi text-blue-400 text-sm"></i>
                <span className="text-gray-400 text-xs">{networkStatus}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weather Panel */}
        <WeatherPanel isOpen={weatherPanelOpen} onClose={toggleWeather} />
        
        {/* Calendar Panel */}
        <CalendarPanel isOpen={calendarPanelOpen} onClose={toggleCalendar} />
        
        {/* Battery Panel */}
        <BatteryPanel isOpen={batteryPanelOpen} onClose={toggleBattery} batteryLevel={batteryLevel} />
        
        {/* Health Parameters Panel */}
        {healthPanelOpen && <HealthParameters isOpen={healthPanelOpen} onClose={toggleHealth} />}
    </>
  );
};

export default WatchWidget;
