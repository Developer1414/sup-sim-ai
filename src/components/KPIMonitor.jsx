import React from 'react';

const KPIMonitor = ({ kpiData }) => {
  const getProgressClass = (value) => {
    if (value >= 80) return 'high';
    if (value >= 60) return 'medium';
    return 'low';
  };

  const kpiItems = [
    { id: 'correctness', label: 'Корректность', value: kpiData.correctness },
    { id: 'compliance', label: 'Соответствие регламенту', value: kpiData.compliance },
    { id: 'responseTime', label: 'Время реакции', value: 100 - kpiData.responseTime }, // Invert since lower is better
    { id: 'satisfaction', label: 'Удовлетворенность', value: kpiData.satisfaction },
  ];

  return (
    <div className="kpi-monitor">
      <h3 className="kpi-title">Показатели эффективности</h3>
      
      {kpiItems.map(item => (
        <div key={item.id} className="kpi-item">
          <div className="kpi-label">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="kpi-bar">
            <div 
              className={`kpi-progress ${getProgressClass(item.value)}`}
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}

      <div className="kpi-item">
        <div className="kpi-label">
          <span>Обработано чатов</span>
          <span>{kpiData.totalChats}</span>
        </div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span>Ошибки</span>
          <span>{kpiData.errors}</span>
        </div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span>Эскалации</span>
          <span>{kpiData.escalations}</span>
        </div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span>Среднее время ответа</span>
          <span>{kpiData.avgResponseTime.toFixed(1)}с</span>
        </div>
      </div>
    </div>
  );
};

export default KPIMonitor;