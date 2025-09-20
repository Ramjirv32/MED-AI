import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryPage from './HistoryPage';
import AlertsPage from './AlertsPage';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState('chat'); // 'chat', 'history', 'alerts', 'newchat'
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        const results = Array.from(event.results);
        const transcript = results
          .map(result => result[0].transcript)
          .join('');
        
        setMessageInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const addMessage = (text, isUser = true) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = () => {
    const message = messageInput.trim();
    
    if (message) {
      addMessage(message, true);
      // Simulate response after 1 second
      setTimeout(() => {
        addMessage('Message received!', false);
      }, 1000);
      setMessageInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleVoiceRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);

        recorder.ondataavailable = (event) => {
          setAudioChunks(prev => [...prev, event.data]);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          addAudioMessage(audioUrl);
        };

        recorder.start();
        setIsRecording(true);
        
        // Start speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('Could not access microphone');
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(false);
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const addAudioMessage = (audioUrl) => {
    const newMessage = {
      id: Date.now(),
      audioUrl,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const goBack = () => {
    navigate('/');
  };

  // New functions for enhanced features
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const undoLastMessage = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setDeletedMessages([...deletedMessages, lastMessage]);
      setMessages(messages.slice(0, -1));
      setShowMenu(false);
    }
  };

  const restoreMessage = () => {
    if (deletedMessages.length > 0) {
      const messageToRestore = deletedMessages[deletedMessages.length - 1];
      setMessages([...messages, messageToRestore]);
      setDeletedMessages(deletedMessages.slice(0, -1));
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setDeletedMessages([]);
    setCurrentPage('chat');
    setShowMenu(false);
    // Add a welcome message for new chat
    addMessage("Starting new chat. How can I help you today?", false);
  };

  const showHistory = () => {
    setCurrentPage('history');
    setShowMenu(false);
  };

  const showAlerts = () => {
    setCurrentPage('alerts');
    setShowMenu(false);
  };

  const backToChat = () => {
    setCurrentPage('chat');
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.menu-container')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="w-80 h-[480px]">
      <div className="chat-container bg-black backdrop-blur-lg rounded-3xl border border-gray-700/50 overflow-hidden w-80 h-[480px] shadow-2xl relative chat-slide-in">
        {/* Enhanced Header */}
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
            <div className="flex flex-col">
              <span className="text-blue-400 text-sm font-bold">MedCare</span>
              <span className="text-gray-400 text-xs font-medium">Your health assistant</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Three dots menu */}
            <div className="relative menu-container">
              <button 
                onClick={toggleMenu} 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50"
              >
                <i className="fas fa-ellipsis-v text-lg"></i>
              </button>
              
              {/* Dropdown menu */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50 z-50">
                  <div className="py-2">
                    <button 
                      onClick={undoLastMessage}
                      className="w-full px-4 py-2 text-left text-sm text-blue-300 hover:bg-blue-900/30 flex items-center space-x-2"
                    >
                      <i className="fas fa-undo text-blue-400"></i>
                      <span>Undo Last Message</span>
                    </button>
                    <button 
                      onClick={restoreMessage}
                      className="w-full px-4 py-2 text-left text-sm text-blue-300 hover:bg-blue-900/30 flex items-center space-x-2"
                    >
                      <i className="fas fa-redo text-blue-400"></i>
                      <span>Restore Message</span>
                    </button>
                    <div className="border-t border-blue-700/50 my-1"></div>
                    <button 
                      onClick={showHistory}
                      className="w-full px-4 py-2 text-left text-sm text-blue-300 hover:bg-blue-900/30 flex items-center space-x-2"
                    >
                      <i className="fas fa-history text-blue-400"></i>
                      <span>Chat History</span>
                    </button>
                    <button 
                      onClick={showAlerts}
                      className="w-full px-4 py-2 text-left text-sm text-blue-300 hover:bg-blue-900/30 flex items-center space-x-2"
                    >
                      <i className="fas fa-bell text-blue-400"></i>
                      <span>Alerts</span>
                    </button>
                    <button 
                      onClick={startNewChat}
                      className="w-full px-4 py-2 text-left text-sm text-blue-300 hover:bg-blue-900/30 flex items-center space-x-2"
                    >
                      <i className="fas fa-plus text-blue-400"></i>
                      <span>New Chat</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button onClick={goBack} className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700/50">
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Enhanced Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="messages-container h-[320px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/30 to-gray-800/30"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-heartbeat text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Welcome to MedCare</h3>
              <p className="text-gray-400 text-sm font-medium">Your personal health assistant is ready to help</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                    message.isUser
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 border border-gray-600/50'
                  }`}
                >
                  {message.audioUrl ? (
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-volume-up text-blue-300"></i>
                      <audio controls src={message.audioUrl} className="w-full"></audio>
                    </div>
                  ) : (
                    <p className="text-sm font-medium leading-relaxed">{message.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-2 font-medium">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full bg-gray-800/70 text-white text-sm rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 border border-gray-600/50 font-medium placeholder-gray-400"
                placeholder="Type your message here..."
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-paper-plane text-gray-400 text-sm"></i>
              </div>
            </div>
            
            <button 
              onClick={toggleVoiceRecording} 
              className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg flex items-center justify-center ${
                isRecording
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25 pulse-recording'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-300 shadow-gray-500/25'
              }`}
            >
              <i className="fas fa-microphone text-sm"></i>
            </button>
            
            <button 
              onClick={sendMessage} 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
            >
              <i className="fas fa-paper-plane text-xs"></i>
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Conditional Pages */}
        {currentPage === 'history' && (
          <HistoryPage onClose={backToChat} />
        )}
        
        {currentPage === 'alerts' && (
          <AlertsPage onClose={backToChat} />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
