'use client';

import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatProps {
  sidebarCollapsed?: boolean;
}

// Typewriter Effect Component
const TypewriterText: React.FC<{ text: string }> = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      // Random delay between 15-35ms for more natural typing
      const randomDelay = Math.random() * 20 + 15; // 15-35ms range
      const timer = setTimeout(() => {
        setDisplayText((prev: string) => prev + text[currentIndex]);
        setCurrentIndex((prev: number) => prev + 1);
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  React.useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function AIChat({ sidebarCollapsed = false }: AIChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you access information from all your projects, lessons learned, and provide insights. What would you like to know?',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: false // Add typing state to each message
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [currentTypingMessageId, setCurrentTypingMessageId] = React.useState<string | null>(null);
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

    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setCurrentTypingMessageId(userMessageId);
    setInputValue('');
    setIsExpanded(true);

    // Complete user message typing after a short delay
    setTimeout(() => {
      setMessages((prev: Message[]) =>
        prev.map(msg =>
          msg.id === userMessageId ? { ...msg, isTyping: false } : msg
        )
      );
      setCurrentTypingMessageId(null);

      // Add AI response
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        content: 'I\'m analyzing your request across all projects. This would typically connect to CogNexus AI to provide insights from your construction documents, lessons learned, and project data.',
        sender: 'ai',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages((prev: Message[]) => [...prev, aiMessage]);
      setCurrentTypingMessageId(aiMessageId);
      setIsTyping(true);

      // Complete AI message typing
      setTimeout(() => {
        setMessages((prev: Message[]) =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, isTyping: false } : msg
          )
        );
        setCurrentTypingMessageId(null);
        setIsTyping(false);
      }, 2000);
    }, 800); // User typing delay
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
        <div className={`fixed top-16 ${sidebarCollapsed ? 'left-16' : 'left-64'} right-0 bottom-20 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 z-40 transition-all duration-500 ease-out transform ${
          isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 relative">
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

            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200 group"
              title="Collapse Chat"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages - Clean Typewriter Style */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {/* Sender Label */}
                  <div className={`text-xs font-semibold mb-1 ${
                    message.sender === 'user' ? 'text-blue-400' : 'text-orange-400'
                  }`}>
                    {message.sender === 'user' ? 'You' : 'CogNexus AI'}
                  </div>

                  {/* Message Content */}
                  <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-slate-200'
                  }`}>
                    {message.isTyping && message.id === currentTypingMessageId ? (
                      <TypewriterText text={message.content} />
                    ) : (
                      message.content
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-300/70' : 'text-slate-400/70'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <img
                      src="/brand/CogNexus_logo_blue_glow.png"
                      alt="CogNexus"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <div className="bg-slate-700/70 text-slate-100 rounded-2xl px-4 py-3 border border-slate-600/50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
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
