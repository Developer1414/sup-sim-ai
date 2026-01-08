import React, { useState, useEffect, useRef } from 'react';
import TemplateManager from '../services/TemplateManager';

const ChatInterface = ({ chat, onSendMessage, onEscalate }) => {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleTemplateSelect = (templateText) => {
    onSendMessage(templateText);
  };

  const handleUtochnenieSelect = (utochnenieText) => {
    onSendMessage(utochnenieText);
  };

  const categories = TemplateManager.getCategories();

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {chat?.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div>{msg.text}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="chat-controls">
          <div className="template-selector">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="template-btn"
            >
              <option value="">Выберите категорию для шаблонов</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {selectedCategory && (
              <>
                {TemplateManager.getTemplatesByCategory(selectedCategory).map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="template-btn"
                    onClick={() => handleTemplateSelect(template.text)}
                    title={template.text.length > 100 ? template.text : ''}
                  >
                    {template.text.substring(0, 60)}...
                  </button>
                ))}
              </>
            )}
            
            {/* Utochneniya templates - always available */}
            <details>
              <summary className="template-btn">Уточнения</summary>
              {TemplateManager.getUtochneniyaTemplates().map((template, idx) => (
                <button
                  key={`utochnenie-${idx}`}
                  type="button"
                  className="template-btn"
                  onClick={() => handleUtochnenieSelect(template.text)}
                >
                  {template.text.substring(0, 60)}...
                </button>
              ))}
            </details>
          </div>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение..."
            rows="3"
            className="chat-input"
          />
          
          <div className="chat-actions">
            <button 
              type="submit" 
              className="send-btn"
              disabled={!message.trim()}
            >
              Отправить
            </button>
            <button 
              type="button" 
              className="escalate-btn"
              onClick={onEscalate}
            >
              Передать супервайзеру
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;