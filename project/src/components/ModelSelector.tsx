import React, { useState } from 'react';
import { ChevronDown, Zap, Brain, Sparkles, Cpu } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: 'free' | 'pro' | 'premium';
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const models: Model[] = [
  {
    id: 'chelo-pro',
    name: 'Chelo Pro',
    description: 'Most capable model for complex tasks',
    icon: <Brain size={16} />,
    tier: 'pro'
  },
  {
    id: 'chelo-vision',
    name: 'Chelo Vision',
    description: 'Multimodal model for text and images',
    icon: <Sparkles size={16} />,
    tier: 'premium'
  },
  {
    id: 'chelo-ultra',
    name: 'Chelo Ultra',
    description: 'Most advanced model with enhanced reasoning',
    icon: <Zap size={16} />,
    tier: 'premium'
  },
  {
    id: 'chelo-code',
    name: 'Chelo Code',
    description: 'Specialized for programming tasks',
    icon: <Cpu size={16} />,
    tier: 'pro'
  }
];

const tierColors = {
  free: 'text-green-400',
  pro: 'text-blue-400',
  premium: 'text-cyan-400'
};

const tierBadges = {
  free: 'bg-green-900/30 text-green-400 border-green-700',
  pro: 'bg-blue-900/30 text-blue-400 border-blue-700',
  premium: 'bg-cyan-900/30 text-cyan-400 border-cyan-700'
};

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={tierColors[currentModel.tier]}>
            {currentModel.icon}
          </div>
          <span className="text-gray-200 text-sm font-medium hidden sm:block">
            {currentModel.name}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-slate-600 rounded-xl shadow-2xl z-20 overflow-hidden">
            <div className="p-3 border-b border-slate-700">
              <h3 className="text-white font-semibold text-sm">Select Model</h3>
              <p className="text-gray-400 text-xs mt-1">Choose the AI model for your conversation</p>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-slate-800 transition-colors border-l-2 ${
                    selectedModel === model.id 
                      ? 'bg-slate-800/50 border-l-blue-500' 
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${tierColors[model.tier]}`}>
                      {model.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{model.name}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${tierBadges[model.tier]}`}>
                          {model.tier.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{model.description}</p>
                    </div>
                    {selectedModel === model.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-slate-700 bg-slate-950/50">
              <p className="text-xs text-gray-400 text-center">
                Model capabilities may vary. Choose based on your needs.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};