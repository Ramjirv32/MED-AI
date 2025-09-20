import React, { useState } from 'react';

const NewChatPage = ({ onClose, onStartNewChat }) => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  
  const categories = [
    {
      id: 'general',
      name: 'General Health',
      icon: 'fas fa-heartbeat',
      description: 'General health questions and advice'
    },
    {
      id: 'medication',
      name: 'Medication',
      icon: 'fas fa-pills',
      description: 'Medication reminders and questions'
    },
    {
      id: 'symptoms',
      name: 'Symptom Check',
      icon: 'fas fa-search',
      description: 'Analyze your symptoms'
    },
    {
      id: 'appointment',
      name: 'Appointment',
      icon: 'fas fa-calendar-check',
      description: 'Schedule and manage appointments'
    },
    {
      id: 'wellness',
      name: 'Wellness Tips',
      icon: 'fas fa-lightbulb',
      description: 'Get wellness and lifestyle tips'
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: 'fas fa-exclamation-triangle',
      description: 'Urgent health concerns'
    }
  ];

  const handleStartChat = () => {
    onStartNewChat(selectedCategory);
    onClose();
  };

  return (
    <div className="new-chat-page absolute inset-0 bg-black backdrop-blur-lg rounded-3xl border border-gray-700/50 z-20">
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
            <span className="text-blue-400 text-lg font-bold">New Chat</span>
            <span className="text-gray-400 text-xs font-medium">Choose a category to start</span>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="h-[400px] overflow-y-auto p-4">
        <div className="space-y-3">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-gray-800/50 rounded-xl p-4 border transition-all duration-200 cursor-pointer ${
                selectedCategory === category.id 
                  ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30' 
                  : 'border-gray-700/30 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedCategory === category.id ? 'bg-blue-500/20' : 'bg-gray-700/50'
                }`}>
                  <i className={`${category.icon} text-lg ${
                    selectedCategory === category.id ? 'text-blue-400' : 'text-gray-400'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-bold mb-1 ${
                    selectedCategory === category.id ? 'text-blue-400' : 'text-white'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{category.description}</p>
                </div>
                {selectedCategory === category.id && (
                  <i className="fas fa-check-circle text-blue-400"></i>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Start Chat Button */}
        <div className="mt-6">
          <button
            onClick={handleStartChat}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-comment text-sm"></i>
            <span>Start New Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatPage;
