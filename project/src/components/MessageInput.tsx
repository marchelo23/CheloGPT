import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Image, Code, FileText } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const attachmentOptions = [
    { icon: <Image size={18} />, label: 'Image', color: 'text-green-400' },
    { icon: <FileText size={18} />, label: 'Document', color: 'text-blue-400' },
    { icon: <Code size={18} />, label: 'Code', color: 'text-cyan-400' },
  ];

  return (
    <div className="border-t border-slate-700/50 bg-slate-950/50 backdrop-blur-sm p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Attachment Menu */}
          {showAttachments && (
            <div className="absolute bottom-full left-0 mb-2 bg-slate-900 border border-slate-600 rounded-xl shadow-2xl p-2 min-w-48">
              {attachmentOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
                >
                  <div className={option.color}>{option.icon}</div>
                  <span className="text-gray-200">{option.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3 bg-slate-900/60 backdrop-blur-sm border border-slate-600/50 rounded-3xl p-4 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all shadow-xl">
            <button
              type="button"
              onClick={() => setShowAttachments(!showAttachments)}
              className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                showAttachments 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800/50 text-gray-400'
              }`}
            >
              <Paperclip size={18} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message CheloGPT..."
              disabled={disabled}
              className="flex-1 bg-transparent resize-none outline-none placeholder-gray-400 text-gray-100 max-h-32 min-h-[24px] py-2 text-base"
              rows={1}
            />
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all"
              >
                <Mic size={18} className="text-gray-400" />
              </button>
              
              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className={`p-2.5 rounded-xl transition-all ${
                  message.trim() && !disabled
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl scale-100 hover:scale-105'
                    : 'bg-slate-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          CheloGPT may display inaccurate info, including about people, so double-check its responses.{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">
            Your privacy & CheloGPT Apps
          </a>
        </p>
      </form>
    </div>
  );
};