import React, { useState } from 'react';
import SleepDetailPage from './SleepDetailPage';
import StepsDetailPage from './StepsDetailPage';
import HeartRateDetailPage from './HeartRateDetailPage';
import BloodPressureDetailPage from './BloodPressureDetailPage';
import TemperatureDetailPage from './TemperatureDetailPage';
import PulseDetailPage from './PulseDetailPage';

const HealthParameters = ({ isOpen, onClose }) => {
  const [selectedMetric, setSelectedMetric] = useState('heartrate');
  const [activeDetailPage, setActiveDetailPage] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  if (!isOpen) return null;

  const healthMetrics = [
    {
      id: 'heartrate',
      name: 'Heart Rate',
      icon: 'fas fa-heartbeat',
      value: '72',
      unit: 'BPM',
      status: 'Normal',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400'
    },
    {
      id: 'steps',
      name: 'Steps',
      icon: 'fas fa-walking',
      value: '8,432',
      unit: 'steps',
      status: 'Good',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400'
    },
    {
      id: 'sleep',
      name: 'Sleep',
      icon: 'fas fa-moon',
      value: '7.5',
      unit: 'hrs',
      status: 'Good',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400'
    },
    {
      id: 'pressure',
      name: 'Pressure',
      icon: 'fas fa-tachometer-alt',
      value: '120/80',
      unit: 'mmHg',
      status: 'Normal',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: 'fas fa-thermometer-half',
      value: '98.6',
      unit: '°F',
      status: 'Normal',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400'
    },
    {
      id: 'pulse',
      name: 'Pulse Rate',
      icon: 'fas fa-pulse',
      value: '68',
      unit: 'BPM',
      status: 'Good',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400'
    }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const handleMetricClick = (metricId) => {
    console.log('Clicked metric:', metricId); // Debug log
    setSelectedMetric(metricId);
    setIsSliding(true);
    setTimeout(() => {
      setActiveDetailPage(metricId);
      setIsSliding(false);
    }, 300);
  };

  const handleBackFromDetail = () => {
    setIsSliding(true);
    setTimeout(() => {
      setActiveDetailPage(null);
      setIsSliding(false);
    }, 300);
  };

  const renderDetailPage = () => {
    switch (activeDetailPage) {
      case 'sleep':
        return <SleepDetailPage onBack={handleBackFromDetail} />;
      case 'steps':
        return <StepsDetailPage onBack={handleBackFromDetail} />;
      case 'heartrate':
        return <HeartRateDetailPage onBack={handleBackFromDetail} />;
      case 'pressure':
        return <BloodPressureDetailPage onBack={handleBackFromDetail} />;
      case 'temperature':
        return <TemperatureDetailPage onBack={handleBackFromDetail} />;
      case 'pulse':
        return <PulseDetailPage onBack={handleBackFromDetail} />;
      default:
        return null;
    }
  };

  return (
    <div className="health-parameters absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl border border-blue-400/50 z-20">
      {/* Render detail page if active */}
      {activeDetailPage && renderDetailPage()}
      
      {/* Main health parameters view */}
      <div className={`transition-transform duration-300 ${
        activeDetailPage ? 'transform translate-x-full' : 'transform translate-x-0'
      } ${isSliding ? 'opacity-50' : 'opacity-100'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <button 
            onClick={onClose}
            className="text-blue-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
          >
            <i className="fas fa-arrow-left text-lg"></i>
          </button>
          <div className="text-white text-lg font-bold">
            {getCurrentTime()}
          </div>
        </div>

      {/* Title */}
      <div className="text-center py-6">
        <h1 className="text-white text-2xl font-bold mb-2">Health</h1>
        <h2 className="text-blue-400 text-lg font-medium">Parameters</h2>
      </div>

      {/* Health Metrics Horizontal Scroll */}
      <div className="px-4 pb-4 relative">
        {/* Left scroll indicator */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-blue-400/30 rounded-full z-10"></div>
        
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {healthMetrics.map((metric, index) => (
            <div
              key={metric.id}
              onClick={() => handleMetricClick(metric.id)}
              className={`relative flex-shrink-0 w-20 h-32 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                selectedMetric === metric.id
                  ? `${metric.bgColor} ${metric.borderColor} ring-2 ring-blue-400/50`
                  : 'bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50'
              }`}
            >
              {/* Icon */}
              <div className={`text-center mb-2 ${metric.color}`}>
                <i className={`${metric.icon} text-xl`}></i>
              </div>
              
              {/* Metric Name */}
              <div className="text-center">
                <div className="text-white text-xs font-bold mb-1">{metric.name.charAt(0)}</div>
                <div className={`text-sm font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-gray-400 text-xs">{metric.unit}</div>
              </div>

              {/* Selection Indicator */}
              {selectedMetric === metric.id && (
                <div className="absolute -bottom-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Right scroll indicator */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-blue-400/30 rounded-full z-10"></div>
      </div>

      {/* Selected Metric Details */}
      <div className="px-4 pb-4">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full ${healthMetrics.find(m => m.id === selectedMetric)?.bgColor} flex items-center justify-center`}>
                <i className={`${healthMetrics.find(m => m.id === selectedMetric)?.icon} ${healthMetrics.find(m => m.id === selectedMetric)?.color} text-lg`}></i>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">
                  {healthMetrics.find(m => m.id === selectedMetric)?.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {healthMetrics.find(m => m.id === selectedMetric)?.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${healthMetrics.find(m => m.id === selectedMetric)?.color}`}>
                {healthMetrics.find(m => m.id === selectedMetric)?.value}
              </div>
              <div className="text-gray-400 text-sm">
                {healthMetrics.find(m => m.id === selectedMetric)?.unit}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 pb-4">
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
      </div>
    </div>
  );
};

export default HealthParameters;
