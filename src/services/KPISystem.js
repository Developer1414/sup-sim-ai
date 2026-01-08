class KPISystem {
  constructor() {
    this.weights = {
      correctness: 0.3,     // 30% weight
      compliance: 0.25,     // 25% weight
      responseTime: 0.2,    // 20% weight
      satisfaction: 0.15,   // 15% weight
      escalations: 0.1      // 10% weight (negative impact)
    };
    
    this.penalties = {
      wrongTemplate: 10,      // Points deducted for wrong template
      outOfRegulation: 15,    // Points deducted for non-regulation response
      slowResponse: 5,        // Points deducted for slow response
      unnecessaryEscalation: 8 // Points deducted for unnecessary escalation
    };
    
    this.bonuses = {
      correctTemplate: 5,     // Points added for correct template
      quickResponse: 3,       // Points added for quick response
      satisfiedCustomer: 7    // Points added for satisfied customer
    };
  }

  evaluateResponse(message, templateId, context) {
    const evaluation = {
      correctness: 0,
      compliance: 0,
      responseTime: 0,
      satisfaction: 0,
      errors: 0,
      newChat: false
    };

    // Check if response matches template (simplified check)
    const isCorrectTemplate = this.checkTemplateMatch(message, templateId, context);
    if (isCorrectTemplate) {
      evaluation.correctness = 100;
    } else {
      evaluation.correctness = 30; // Lower score for non-template response
      evaluation.errors += 1;
    }

    // Check if response follows regulation
    const isCompliant = this.checkRegulationCompliance(message, context);
    if (isCompliant) {
      evaluation.compliance = 100;
    } else {
      evaluation.compliance = 40; // Lower score for non-compliant response
      evaluation.errors += 1;
    }

    // Calculate satisfaction based on various factors
    evaluation.satisfaction = this.calculateSatisfaction(message, context);

    // For now, we'll consider this a standard response time
    evaluation.responseTime = 0; // 0 means good response time

    return evaluation;
  }

  checkTemplateMatch(message, templateId, context) {
    // In a real implementation, this would compare against actual templates
    // For now, we'll return true if a templateId was provided (meaning user selected a template)
    return !!templateId;
  }

  checkRegulationCompliance(message, context) {
    // Check if the message contains any phrases that violate regulations
    // For simplicity, we'll consider it compliant if it follows template pattern
    const nonCompliantPhrases = [
      'я сам подумал',
      'по-моему мнению',
      'думаю что',
      'мое личное мнение',
      'сделаю исключение',
      'лично для вас'
    ];

    const lowerMsg = message.toLowerCase();
    for (const phrase of nonCompliantPhrases) {
      if (lowerMsg.includes(phrase)) {
        return false;
      }
    }

    return true;
  }

  calculateSatisfaction(message, context) {
    // Calculate satisfaction based on various factors
    // This is a simplified model
    let satisfaction = 70; // Base satisfaction

    // Adjust based on message length and politeness indicators
    if (message.length < 10) {
      satisfaction -= 10; // Too short might seem rude
    } else if (message.length > 200) {
      satisfaction -= 5; // Too long might be overwhelming
    }

    // Check for polite phrases
    const politePhrases = ['спасибо', 'пожалуйста', 'извините', 'понимаю'];
    for (const phrase of politePhrases) {
      if (message.toLowerCase().includes(phrase)) {
        satisfaction += 5;
        break;
      }
    }

    // Check for negative indicators
    const negativePhrases = ['не могу', 'не вправе', 'не имею возможности'];
    for (const phrase of negativePhrases) {
      if (message.toLowerCase().includes(phrase)) {
        satisfaction -= 10;
      }
    }

    // Cap satisfaction between 0 and 100
    return Math.max(0, Math.min(100, satisfaction));
  }

  updateKPI(kpiData, evaluation) {
    // Calculate weighted average for overall KPI
    const weightedScore = (
      evaluation.correctness * this.weights.correctness +
      evaluation.compliance * this.weights.compliance +
      (100 - evaluation.responseTime) * this.weights.responseTime + // Inverted because lower is better
      evaluation.satisfaction * this.weights.satisfaction
    );

    return {
      ...kpiData,
      correctness: this.updateMetric(kpiData.correctness, evaluation.correctness),
      compliance: this.updateMetric(kpiData.compliance, evaluation.compliance),
      satisfaction: this.updateMetric(kpiData.satisfaction, evaluation.satisfaction),
      responseTime: this.updateMetric(kpiData.responseTime, evaluation.responseTime),
      errors: kpiData.errors + evaluation.errors
    };
  }

  updateMetric(current, newValue) {
    // Simple moving average - adjust previous value with new value
    return Math.round((current * 0.7) + (newValue * 0.3));
  }
}

// Create a singleton instance
const kpiSystem = new KPISystem();
export default kpiSystem;