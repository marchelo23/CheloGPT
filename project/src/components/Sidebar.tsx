import React from 'react';
import { Plus, MessageSquare, Search, Settings, X, History, Bookmark } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Array<{ id: string; title: string; timestamp: string }>;
  activeConversation: string;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversation,
  onConversationSelect,
  onNewChat,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-slate-950 border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Sidebar header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Conversations</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded lg:hidden"
            >
              <X size={18} className="text-gray-300" />
            </button>
          </div>
          
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg"
          >
            <Plus size={18} className="text-white" />
            <span className="text-white font-medium">New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-slate-700">
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              <History size={16} className="text-gray-400" />
              <span className="text-gray-300 text-sm">History</span>
            </button>
            <button className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              <Bookmark size={16} className="text-gray-400" />
              <span className="text-gray-300 text-sm">Saved</span>
            </button>
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`
                  w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all group
                  ${activeConversation === conversation.id
                    ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/30 border border-blue-600/50 shadow-lg'
                    : 'hover:bg-slate-900 border border-transparent'
                  }
                `}
              >
                <MessageSquare size={18} className={`mt-0.5 ${
                  activeConversation === conversation.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${
                    activeConversation === conversation.id ? 'text-blue-200' : 'text-gray-200 group-hover:text-white'
                  }`}>
                    {conversation.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{conversation.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-slate-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-900 rounded-lg transition-colors">
            <Settings size={18} className="text-gray-300" />
            <span className="text-gray-200">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};