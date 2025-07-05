import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
}

export const MainInterface: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [selectedModel, setSelectedModel] = useState('chelo-pro');
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'New conversation',
      timestamp: 'Just now',
      messages: [],
    },
    {
      id: '2',
      title: 'Help with React project',
      timestamp: '2 hours ago',
      messages: [
        {
          id: '1',
          content: 'Can you help me with React hooks?',
          isUser: true,
          timestamp: '2:30 PM',
        },
        {
          id: '2',
          content: 'Of course! React hooks are functions that let you use state and other React features in functional components. The most commonly used hooks are useState for managing state and useEffect for handling side effects.\n\nHere are some key points about React hooks:\n\n• They must be called at the top level of React functions\n• They can\'t be called inside loops, conditions, or nested functions\n• Custom hooks can be created to share stateful logic between components\n\nWhat specific aspect of React hooks would you like to learn more about?',
          isUser: false,
          timestamp: '2:31 PM',
        },
      ],
    },
    {
      id: '3',
      title: 'JavaScript best practices',
      timestamp: 'Yesterday',
      messages: [],
    },
  ]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSendMessage = async (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update conversation with user message
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            title: conv.messages.length === 0 ? content.slice(0, 50) + (content.length > 50 ? '...' : '') : conv.title,
            timestamp: 'Just now'
          }
        : conv
    ));

    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content, selectedModel),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, messages: [...conv.messages, aiResponse] }
          : conv
      ));
      
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage: string, model: string): string => {
    const responses = [
      "I understand what you're asking about. Let me help you with that!\n\nThis is a great question that touches on several important concepts. Here are some key points to consider:\n\n• First, it's important to understand the context\n• Second, we should look at best practices\n• Finally, let's consider practical applications\n\nWould you like me to elaborate on any of these points?",
      "That's an interesting question! Based on what you've shared, I can provide some helpful insights.\n\nHere's my perspective on this topic:\n\n1. The approach you're considering has both advantages and potential challenges\n2. There are several alternative methods worth exploring\n3. The best solution often depends on your specific requirements\n\nWhat specific aspect would you like to dive deeper into?",
      "Excellent question! Let me provide you with a comprehensive analysis of this topic.\n\n**Deep Analysis:**\nThis question involves multiple layers of complexity that I can help you navigate. Based on current best practices and emerging trends, here's what I recommend:\n\n• **Strategic Approach:** Consider the long-term implications\n• **Technical Implementation:** Focus on scalable solutions\n• **Performance Optimization:** Balance efficiency with maintainability\n\n**Advanced Considerations:**\nThe solution should account for edge cases and future extensibility. Would you like me to dive deeper into any specific aspect or provide code examples?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New conversation',
      timestamp: 'Just now',
      messages: [],
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setSidebarOpen(false);
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          conversations={conversations}
          activeConversation={activeConversationId}
          onConversationSelect={handleConversationSelect}
          onNewChat={handleNewChat}
        />
        
        <ChatArea
          messages={activeConversation?.messages || []}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};