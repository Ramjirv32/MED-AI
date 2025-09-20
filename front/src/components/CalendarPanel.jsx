import React, { useState, useEffect } from 'react';

const CalendarPanel = ({ isOpen, onClose }) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth(), 1);
    const lastDay = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 0);
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const isToday = isTodayDate(day);
      days.push(
        <div 
          key={day}
          className={`calendar-day text-gray-300 ${isToday ? 'today' : ''}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const isTodayDate = (day) => {
    const currentDate = new Date();
    return day === currentDate.getDate() && 
           currentDisplayDate.getMonth() === currentDate.getMonth() && 
           currentDisplayDate.getFullYear() === currentDate.getFullYear();
  };

  const changeMonth = (delta) => {
    setCurrentDisplayDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const selectDate = (day) => {
    const selectedDate = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth(), day);
    setShowDatePicker(false);
    loadEventsForDate(selectedDate);
  };

  const loadEventsForDate = (date) => {
    console.log('Loading events for:', date);
  };

  const formatCurrentMonth = () => {
    return currentDisplayDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const formatSelectedDate = () => {
    return currentDisplayDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <>
      <div className={`calendar-dropdown ${isOpen ? 'active' : 'hidden'}`} style={{ padding: '0.75rem' }}>
        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <i className="fas fa-arrow-left"></i>
              </button>
              <h3 className="text-white text-lg">My Calendar</h3>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">{formatSelectedDate()}</span>
              <button onClick={openDatePicker} className="text-gray-400 hover:text-white">
                <i className="far fa-calendar-alt"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Calendar Content */}
        <div className="calendar-content">
          {/* Time slots and events */}
          <div className="space-y-4">
            {/* 12:00 time slot */}
            <div className="relative">
              <div className="text-gray-400 mb-2 flex items-center">
                <i className="far fa-clock mr-2 text-xs"></i>
                <span>12:00</span>
              </div>
              <div className="event-card event-active">
                <div className="text-white mb-1">Scheduled Call</div>
                <div className="text-gray-400 text-sm mb-2">Yevhen</div>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>12:00-12:30</span>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-gray-800/50"></div>

            {/* 12:30 time slot */}
            <div className="relative">
              <div className="text-gray-400 mb-2 flex items-center">
                <i className="far fa-clock mr-2 text-xs"></i>
                <span>12:30</span>
              </div>
              <div className="event-card">
                <div className="text-white mb-1">Project Present</div>
                <div className="text-gray-400 text-sm mb-2">Behance</div>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>12:30-13:00</span>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-gray-800/50"></div>

            {/* 13:00 time slot */}
            <div className="relative">
              <div className="text-gray-400 mb-2 flex items-center">
                <i className="far fa-clock mr-2 text-xs"></i>
                <span>13:00</span>
              </div>
              <div className="event-card">
                <div className="text-white mb-1">Dribbble Shot</div>
                <div className="text-gray-400 text-sm mb-2">Behance</div>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>13:00-13:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className={`calendar-picker ${showDatePicker ? 'active' : 'hidden'}`}>
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-400 hover:text-white" onClick={() => changeMonth(-1)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-white font-medium">{formatCurrentMonth()}</span>
          <button className="text-gray-400 hover:text-white" onClick={() => changeMonth(1)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-8 mb-2">
          <span className="text-gray-400 text-xs text-center">S</span>
          <span className="text-gray-400 text-xs text-center">M</span>
          <span className="text-gray-400 text-xs text-center">T</span>
          <span className="text-gray-400 text-xs text-center">W</span>
          <span className="text-gray-400 text-xs text-center">T</span>
          <span className="text-gray-400 text-xs text-center">F</span>
          <span className="text-gray-400 text-xs text-center">S</span>
        </div>
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>
    </>
  );
};

export default CalendarPanel;
