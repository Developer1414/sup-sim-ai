import React from 'react';

const CRMSystem = ({ clientData }) => {
  if (!clientData) {
    return (
      <div className="crm-section">
        <p>Выберите чат для просмотра CRM-информации</p>
      </div>
    );
  }

  return (
    <div className="crm-section">
      <div className="crm-card">
        <h3 className="crm-title">Информация о клиенте</h3>
        <div className="crm-field">
          <strong>Имя:</strong> <span>{clientData.name}</span>
        </div>
        <div className="crm-field">
          <strong>Телефон:</strong> <span>{clientData.phone}</span>
        </div>
        <div className="crm-field">
          <strong>Email:</strong> <span>{clientData.email}</span>
        </div>
        <div className="crm-field">
          <strong>ID профиля:</strong> <span>{clientData.profileId}</span>
        </div>
        <div className="crm-field">
          <strong>Дата регистрации:</strong> <span>{clientData.registrationDate}</span>
        </div>
        <div className="crm-field">
          <strong>Статус кошелька:</strong> <span>{clientData.walletStatus}</span>
        </div>
      </div>

      <div className="crm-card">
        <h3 className="crm-title">История заказов</h3>
        {clientData.orders && clientData.orders.length > 0 ? (
          <div>
            {clientData.orders.map((order, index) => (
              <div key={index} className="crm-field">
                <div><strong>Заказ #{order.id}</strong></div>
                <div>Статус: {order.status}</div>
                <div>Дата: {order.date}</div>
                <div>Сумма: {order.amount} ₽</div>
                <div>Товары: {order.items.map(item => item.name).join(', ')}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>Нет истории заказов</p>
        )}
      </div>

      <div className="crm-card">
        <h3 className="crm-title">Финансовая информация</h3>
        <div className="crm-field">
          <strong>Баланс:</strong> <span>{clientData.balance} ₽</span>
        </div>
        <div className="crm-field">
          <strong>Бонусы:</strong> <span>{clientData.bonuses} ₽</span>
        </div>
        <div className="crm-field">
          <strong>История возвратов:</strong> <span>{clientData.returnHistory.length} возвратов</span>
        </div>
        <div className="crm-field">
          <strong>Кредитный лимит:</strong> <span>{clientData.creditLimit} ₽</span>
        </div>
      </div>

      <div className="crm-card">
        <h3 className="crm-title">История обращений</h3>
        {clientData.supportHistory && clientData.supportHistory.length > 0 ? (
          <div>
            {clientData.supportHistory.map((ticket, index) => (
              <div key={index} className="crm-field">
                <div><strong>Тикет #{ticket.id}</strong></div>
                <div>Дата: {ticket.date}</div>
                <div>Категория: {ticket.category}</div>
                <div>Статус: {ticket.status}</div>
                <div>Результат: {ticket.result}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>Нет истории обращений</p>
        )}
      </div>

      <div className="crm-card">
        <h3 className="crm-title">Примечания</h3>
        <div className="crm-field">
          <strong>Особые пометки:</strong> <span>{clientData.notes}</span>
        </div>
        <div className="crm-field">
          <strong>Уровень лояльности:</strong> <span>{clientData.loyaltyLevel}</span>
        </div>
        <div className="crm-field">
          <strong>Предпочтения:</strong> <span>{clientData.preferences.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default CRMSystem;