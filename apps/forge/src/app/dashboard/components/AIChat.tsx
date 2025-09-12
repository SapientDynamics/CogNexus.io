'use client';

import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  sidebarCollapsed?: boolean;
}

export default function AIChat({ sidebarCollapsed = false }: AIChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you access information from all your projects, lessons learned, and provide insights. What would you like to know?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsExpanded(true); // Expand the chat when user sends a message
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m analyzing your request across all projects. This would typically connect to CogNexus AI to provide insights from your construction documents, lessons learned, and project data.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Expanded Chat Messages - Only when expanded */}
      {isExpanded && (
        <div className={`fixed top-20 ${sidebarCollapsed ? 'left-16' : 'left-64'} right-0 bottom-20 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 z-40 transition-all duration-300`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src="/brand/CogNexus_logo_blue_glow.png"
                alt="CogNexus Logo"
                className="h-8 w-auto opacity-90"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">Intelligent Construction Assistant</h3>
                <p className="text-slate-400 text-xs">Powered by CogNexus AI</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Ask CogNexus about all projects, lessons learned, and insights</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700/50 text-slate-300 p-3 rounded-lg max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Field - Always at bottom */}
      <div className={`fixed bottom-0 ${sidebarCollapsed ? 'left-16' : 'left-64'} right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 z-50 transition-all duration-300 ${
        isExpanded ? 'h-20' : 'h-28'
      }`}>
        {/* Collapsed View - Just Input */}
        {!isExpanded && (
          <div className="p-3">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src="/brand/CogNexus_logo_blue_glow.png"
                alt="CogNexus Logo"
                className="h-6 w-auto opacity-80"
              />
              <span className="text-slate-300 text-sm font-medium">Ask CogNexus</span>
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask CogNexus about project specs, lessons learned, RFIs..."
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:border-orange-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-2 text-center">
              CogNexus AI may provide incomplete or inaccurate information. Please verify important details.
            </div>
          </div>
        )}

        {/* Expanded View - Just Input at bottom */}
        {isExpanded && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-800/95">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask CogNexus about project specs, lessons learned, RFIs..."
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:border-orange-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
