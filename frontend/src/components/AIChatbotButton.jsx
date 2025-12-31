import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

const AIChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsOpen(!isOpen);
    // This is just a UI demo - no backend integration
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={handleChatbotClick}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
        aria-label="AI Chatbot Assistant"
        title="AI Chatbot Assistant"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <MessageCircle size={24} className="transition-transform duration-300 group-hover:scale-110" />
        )}
        
        {/* Animated ring effect */}
        <span className="absolute inset-0 rounded-full bg-purple-400 opacity-20 animate-ping"></span>
      </button>

      {/* Chatbot Window (Demo UI) */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-purple-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-100">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    👋 Hello! I'm your AI assistant. I can help you with:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Finding the right internships</li>
                    <li>• Application guidance</li>
                    <li>• Resume optimization</li>
                    <li>• Interview preparation</li>
                    <li>• Career advice</li>
                  </ul>
                  <p className="mt-3 text-xs text-gray-500 italic">
                    This is a demo UI. Backend integration coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message... (Demo Mode)"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                disabled
              />
              <button
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                disabled
                title="Backend integration coming soon"
              >
                <MessageCircle size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              💡 AI Chatbot feature coming soon
            </p>
          </div>
        </div>
      )}

    </>
  );
};

export default AIChatbotButton;

