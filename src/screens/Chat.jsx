import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineChevronLeft, HiOutlinePaperAirplane } from 'react-icons/hi2';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Chat() {
  const { expertName, initials, color } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const decodedName = decodeURIComponent(expertName);

  // Initial greeting from AI
  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        text: `Hello, I'm ${decodedName}. I'm here to support you. How are you feeling today?`,
        isMe: false
      }]);
    }, 600);
  }, [decodedName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isMe: true }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: userMsg,
        expert: decodedName
      }, {
        timeout: 10000 // 10 second timeout
      });

      setMessages(prev => [...prev, { text: res.data.reply, isMe: false }]);
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Connection error.';
      
      if (!API_URL && !window.location.hostname.includes('localhost')) {
          errorMessage = 'API Configuration missing. Please set VITE_API_URL in your environment.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = `Network error. Could not connect to backend at ${API_URL || 'http://localhost:8000'}`;
      }
      
      setError(errorMessage);
      // Show error to user
      setMessages(prev => [...prev, { 
        text: '❌ ' + errorMessage,
        isMe: false,
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAFAF8] dark:bg-[#111110]">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/experts')} 
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Go back to experts"
        >
          <HiOutlineChevronLeft className="w-6 h-6" />
        </button>
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0
          ${color === 'teal' ? 'bg-teal-100 text-teal-800' : ''}
          ${color === 'amber' ? 'bg-amber-100 text-amber-700' : ''}
          ${color === 'coral' ? 'bg-coral-100 text-coral-700' : ''}
          ${color === 'green' ? 'bg-green-100 text-green-800' : ''}`}>
          {initials}
        </div>

        <div className="flex-1">
          <div className="font-medium">{decodedName}</div>
          <div className="text-xs text-teal-600 flex items-center gap-1">
            <span className="text-green-500">●</span> Online · Trauma specialist
          </div>
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-1">
          Anonymous
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAFAF8] dark:bg-[#111110]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[78%] ${msg.isMe ? 'ml-auto' : 'mr-auto'}`}
          >
            <div className={`px-4 py-3 rounded-3xl text-[13px] leading-relaxed
              ${msg.isMe 
                ? 'bg-teal-600 text-white rounded-tr-sm' 
                : msg.isError
                ? 'bg-red-100 text-red-800 border border-red-300 rounded-tl-sm'
                : 'bg-white border border-gray-200 dark:bg-zinc-800 dark:border-gray-700 rounded-tl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 pl-4">
            <div className="bg-white border border-gray-200 dark:bg-zinc-800 px-4 py-3 rounded-3xl rounded-tl-sm flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-zinc-900 border-t p-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-teal-400"
          aria-label="Chat message input"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 active:scale-95 transition-all hover:bg-teal-700"
          aria-label="Send message"
        >
          <HiOutlinePaperAirplane className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}