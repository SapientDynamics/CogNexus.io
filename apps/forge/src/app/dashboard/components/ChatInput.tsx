'use client';

import React from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  sidebarCollapsed?: boolean;
}

export default function ChatInput({ onSendMessage, placeholder = "Ask me anything about your project...", disabled = false, sidebarCollapsed = false }: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div 
        className={`mx-auto transition-all duration-300 ${
          sidebarCollapsed 
            ? 'max-w-none ml-16' // Account for collapsed sidebar (64px/4rem)
            : 'max-w-none ml-64' // Account for expanded sidebar (256px/16rem)
        }`}
      >
        <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl p-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-4">
            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="w-full resize-none rounded-xl border border-slate-600 bg-slate-700/50 backdrop-blur-sm px-4 py-3 pr-12 text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-sm max-h-32 overflow-y-auto"
                style={{
                  minHeight: '48px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />

              {/* Character count indicator */}
              {message.length > 0 && (
                <div className="absolute bottom-2 right-3 text-xs text-slate-500">
                  {message.length}
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="flex-shrink-0 w-12 h-12 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 group shadow-lg hover:shadow-orange-500/25"
            >
              {disabled ? (
                <svg className="w-5 h-5 text-slate-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>

          {/* Status indicators */}
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI Online</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Project Context Loaded</span>
              </div>
            </div>
            <div className="text-slate-600">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent rounded-2xl blur-xl -z-10"></div>
      </div>
    </div>
  );
}
