import React, { useState } from 'react';
import { Menu, Sparkles, Settings } from 'lucide-react';
import { ModelSelector } from './ModelSelector';

interface HeaderProps {
  onMenuClick: () => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  selectedModel, 
  onModelChange
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="bg-slate-950 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} className="text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">CheloGPT</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <ModelSelector 
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
        
        {/* Settings Menu */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings size={20} className="text-gray-300" />
          </button>

          {showSettings && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowSettings(false)}
              />
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 border border-slate-600 rounded-xl shadow-2xl z-20 overflow-hidden">
                <div className="p-4 border-b border-slate-700">
                  <h3 className="text-white font-medium">Settings</h3>
                  <p className="text-gray-400 text-sm mt-1">Customize your experience</p>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="text-gray-200">Theme</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="text-gray-200">Language</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="text-gray-200">Export Data</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};