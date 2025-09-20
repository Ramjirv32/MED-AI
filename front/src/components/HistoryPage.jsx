import React from 'react';

const HistoryPage = ({ onClose }) => {
  const historyData = [
    {
      id: 1,
      title: "Health Check Discussion",
      preview: "How are you feeling today?",
      timestamp: "2 hours ago",
      type: "health"
    },
    {
      id: 2,
      title: "Medication Reminder",
      preview: "Don't forget to take your vitamins",
      timestamp: "1 day ago",
      type: "reminder"
    },
    {
      id: 3,
      title: "Symptom Analysis",
      preview: "Let's discuss your symptoms",
      timestamp: "2 days ago",
      type: "analysis"
    },
    {
      id: 4,
      title: "Appointment Follow-up",
      preview: "How was your doctor visit?",
      timestamp: "3 days ago",
      type: "appointment"
    },
    {
      id: 5,
      title: "Wellness Tips",
      preview: "Here are some health tips for you",
      timestamp: "1 week ago",
      type: "tips"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'health': return 'fas fa-heartbeat';
      case 'reminder': return 'fas fa-bell';
      case 'analysis': return 'fas fa-search';
      case 'appointment': return 'fas fa-calendar-check';
      case 'tips': return 'fas fa-lightbulb';
      default: return 'fas fa-comment';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'health': return 'text-red-400';
      case 'reminder': return 'text-yellow-400';
      case 'analysis': return 'text-green-400';
      case 'appointment': return 'text-purple-400';
      case 'tips': return 'text-orange-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="history-page absolute inset-0 bg-black backdrop-blur-lg rounded-3xl border border-gray-700/50 z-20">
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
            <span className="text-blue-400 text-lg font-bold">Chat History</span>
            <span className="text-gray-400 text-xs font-medium">Your conversation history</span>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-3">
        {historyData.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center ${getTypeColor(item.type)}`}>
                <i className={`${getTypeIcon(item.type)} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-bold mb-1 truncate">{item.title}</h3>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.preview}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{item.timestamp}</span>
                  <i className="fas fa-chevron-right text-gray-500 text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
