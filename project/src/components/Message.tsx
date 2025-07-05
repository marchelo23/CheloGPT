import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Share, Sparkles } from 'lucide-react';

interface MessageProps {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  content,
  isUser,
  timestamp,
  isTyping = false,
}) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-8">
        <div className="max-w-3xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl rounded-br-lg px-6 py-4 shadow-xl">
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">{timestamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-8">
      <div className="flex gap-4 max-w-4xl w-full">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl rounded-tl-lg px-6 py-5 shadow-xl">
            {isTyping ? (
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-400 ml-2">CheloGPT is thinking...</span>
              </div>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">{content}</p>
                <div className="flex items-center gap-1 mt-5 pt-4 border-t border-slate-700/50">
                  <button className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group">
                    <Copy size={16} className="text-gray-400 group-hover:text-gray-200" />
                  </button>
                  <button className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group">
                    <ThumbsUp size={16} className="text-gray-400 group-hover:text-green-400" />
                  </button>
                  <button className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group">
                    <ThumbsDown size={16} className="text-gray-400 group-hover:text-red-400" />
                  </button>
                  <button className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group">
                    <RotateCcw size={16} className="text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <button className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group">
                    <Share size={16} className="text-gray-400 group-hover:text-cyan-400" />
                  </button>
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};