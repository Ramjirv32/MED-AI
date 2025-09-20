import React from 'react';

const AlertsPage = ({ onClose }) => {
  const alertsData = [
    {
      id: 1,
      title: "Medication Reminder",
      message: "Time to take your morning vitamins",
      time: "9:00 AM",
      type: "medication",
      priority: "high",
      isRead: false
    },
    {
      id: 2,
      title: "Appointment Alert",
      message: "Doctor appointment in 2 hours",
      time: "2:00 PM",
      type: "appointment",
      priority: "high",
      isRead: false
    },
    {
      id: 3,
      title: "Health Check",
      message: "Daily health check reminder",
      time: "6:00 PM",
      type: "health",
      priority: "medium",
      isRead: true
    },
    {
      id: 4,
      title: "Water Intake",
      message: "Remember to stay hydrated",
      time: "Every 2 hours",
      type: "wellness",
      priority: "low",
      isRead: true
    },
    {
      id: 5,
      title: "Exercise Reminder",
      message: "Time for your daily walk",
      time: "7:00 PM",
      type: "exercise",
      priority: "medium",
      isRead: true
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medication': return 'fas fa-pills';
      case 'appointment': return 'fas fa-calendar-check';
      case 'health': return 'fas fa-heartbeat';
      case 'wellness': return 'fas fa-tint';
      case 'exercise': return 'fas fa-running';
      default: return 'fas fa-bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'medication': return 'text-blue-400';
      case 'appointment': return 'text-purple-400';
      case 'health': return 'text-red-400';
      case 'wellness': return 'text-cyan-400';
      case 'exercise': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="alerts-page absolute inset-0 bg-black backdrop-blur-lg rounded-3xl border border-gray-700/50 z-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
          >
            <i className="fas fa-arrow-left text-lg"></i>
          </button>
          <div className="flex flex-col">
            <span className="text-blue-400 text-lg font-bold">Health Alerts</span>
            <span className="text-gray-400 text-xs font-medium">Your health notifications</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 text-xs font-medium">
            {alertsData.filter(alert => !alert.isRead).length} unread
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-3">
        {alertsData.map((alert) => (
          <div 
            key={alert.id}
            className={`bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer ${
              !alert.isRead ? 'ring-2 ring-blue-500/30' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(alert.type)}`}>
                <i className={`${getTypeIcon(alert.type)} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white text-sm font-bold truncate">{alert.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{alert.time}</span>
                  {!alert.isRead && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
