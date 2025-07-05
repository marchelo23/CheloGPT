import React from 'react';
import { Message } from './Message';
import { MessageInput } from './MessageInput';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatAreaProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  onSendMessage,
  isTyping,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-3xl font-bold text-white">C</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hello, I'm CheloGPT
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                I'm an advanced AI assistant, built to be helpful, intelligent, and reliable. 
                I can assist you with a wide range of tasks from answering questions to helping with creative projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => onSendMessage("What can you help me with today?")}
                  className="group p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 text-left shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">?</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Get started</h3>
                  <p className="text-sm text-gray-400">What can you help me with today?</p>
                </button>
                <button
                  onClick={() => onSendMessage("Tell me about your capabilities and features")}
                  className="group p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 text-left shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">✨</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Explore features</h3>
                  <p className="text-sm text-gray-400">Learn about my capabilities</p>
                </button>
                <button
                  onClick={() => onSendMessage("Help me write a creative story")}
                  className="group p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 text-left shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-pink-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">✍️</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Creative writing</h3>
                  <p className="text-sm text-gray-400">Help me write a creative story</p>
                </button>
                <button
                  onClick={() => onSendMessage("Explain a complex topic in simple terms")}
                  className="group p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 text-left shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">🧠</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Learn something</h3>
                  <p className="text-sm text-gray-400">Explain complex topics simply</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && (
              <Message
                id="typing"
                content=""
                isUser={false}
                timestamp=""
                isTyping={true}
              />
            )}
          </div>
        )}
      </div>
      
      <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
};