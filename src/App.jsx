import React, { useState, useEffect } from 'react';
import CRMSystem from './components/CRMSystem';
import ChatInterface from './components/ChatInterface';
import KPIMonitor from './components/KPIMonitor';
import ClientGenerator from './services/ClientGenerator';
import TemplateManager from './services/TemplateManager';
import KPISystem from './services/KPISystem';
import './App.css';

const App = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [kpiData, setKpiData] = useState({
    correctness: 100,
    compliance: 100,
    responseTime: 0,
    escalations: 0,
    satisfaction: 100,
    totalChats: 0,
    errors: 0,
    avgResponseTime: 0
  });
  const [activeTab, setActiveTab] = useState('chat');

  // Initialize template manager
  useEffect(() => {
    TemplateManager.loadTemplates();
  }, []);

  // Generate initial chats
  useEffect(() => {
    const initialChats = [];
    for (let i = 0; i < 3; i++) {
      initialChats.push(ClientGenerator.generateClient());
    }
    setChats(initialChats);
    if (initialChats.length > 0) {
      setCurrentChat(initialChats[0]);
    }
  }, []);

  const handleSendMessage = (message, templateId = null) => {
    if (!currentChat) return;

    // Update KPI based on message sent
    const updatedKpi = KPISystem.evaluateResponse(message, templateId, currentChat.context);
    
    // Add message to chat
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, { text: message, sender: 'operator', timestamp: Date.now() }]
    };

    setCurrentChat(updatedChat);
    setKpiData(prev => ({
      ...prev,
      ...updatedKpi,
      totalChats: prev.totalChats + (updatedKpi.newChat ? 1 : 0)
    }));

    // Simulate client response after delay
    setTimeout(() => {
      const clientResponse = ClientGenerator.generateResponse(currentChat.context, message);
      const finalUpdatedChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, { text: clientResponse, sender: 'client', timestamp: Date.now() }]
      };
      setCurrentChat(finalUpdatedChat);
      
      // Update chat in the list
      setChats(prev => prev.map(chat => 
        chat.id === finalUpdatedChat.id ? finalUpdatedChat : chat
      ));
    }, 1000 + Math.random() * 2000);
  };

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
  };

  const handleEscalateToSupervisor = () => {
    if (!currentChat) return;

    // Add escalation message
    const escalationMessage = "Передаю ваш вопрос супервайзеру для дополнительной проверки.";
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, { text: escalationMessage, sender: 'operator', timestamp: Date.now() }],
      escalated: true
    };

    setCurrentChat(updatedChat);
    setChats(prev => prev.map(chat => 
      chat.id === updatedChat.id ? updatedChat : chat
    ));

    // Update KPI for escalation
    setKpiData(prev => ({
      ...prev,
      escalations: prev.escalations + 1
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Симулятор поддержки Wildberries</h1>
        <div className="header-stats">
          <span>Чатов обработано: {kpiData.totalChats}</span>
          <span>Ошибки: {kpiData.errors}</span>
          <span>Эскалации: {kpiData.escalations}</span>
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar">
          <div className="tabs">
            <button 
              className={activeTab === 'chat' ? 'active' : ''} 
              onClick={() => setActiveTab('chat')}
            >
              Чаты
            </button>
            <button 
              className={activeTab === 'crm' ? 'active' : ''} 
              onClick={() => setActiveTab('crm')}
            >
              CRM
            </button>
          </div>
          
          <div className="chat-list">
            {chats.map(chat => (
              <div 
                key={chat.id}
                className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="chat-preview">
                  <strong>{chat.client.name}</strong>
                  <span className="chat-status">{chat.status}</span>
                </div>
                <div className="chat-summary">
                  {chat.summary.substring(0, 50)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          {activeTab === 'chat' && currentChat && (
            <ChatInterface 
              chat={currentChat}
              onSendMessage={handleSendMessage}
              onEscalate={handleEscalateToSupervisor}
            />
          )}
          
          {activeTab === 'crm' && currentChat && (
            <CRMSystem clientData={currentChat.client} />
          )}
        </div>

        <KPIMonitor kpiData={kpiData} />
      </div>
    </div>
  );
};

export default App;