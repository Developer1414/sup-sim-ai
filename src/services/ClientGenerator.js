class ClientGenerator {
  constructor() {
    this.clientProfiles = [
      {
        name: 'Иван Петров',
        phone: '+7 (912) 345-67-89',
        email: 'ivan.petrov@example.com',
        profileId: 'PROF-12345',
        registrationDate: '2022-03-15',
        walletStatus: 'Стандартный',
        balance: 1500,
        bonuses: 250,
        creditLimit: 0,
        orders: [
          {
            id: 'ORD-001',
            status: 'Доставлен',
            date: '2024-12-01',
            amount: 3490,
            items: [{ name: 'Кроссовки мужские', price: 2990 }, { name: 'Носки спортивные', price: 500 }]
          },
          {
            id: 'ORD-002',
            status: 'В пути',
            date: '2024-12-15',
            amount: 4200,
            items: [{ name: 'Куртка зимняя', price: 4200 }]
          }
        ],
        returnHistory: [
          { id: 'RET-001', date: '2024-11-10', reason: 'Брак', amount: 1990 }
        ],
        supportHistory: [
          { id: 'SUP-001', date: '2024-11-15', category: 'Возврат', status: 'Закрыт', result: 'Возврат средств' },
          { id: 'SUP-002', date: '2024-12-05', category: 'Доставка', status: 'Закрыт', result: 'Объяснение статуса' }
        ],
        notes: 'Частый покупатель, лояльный',
        loyaltyLevel: 'Золотой',
        preferences: ['Бесплатная доставка', 'Уведомления о скидках']
      },
      {
        name: 'Мария Сидорова',
        phone: '+7 (921) 456-78-90',
        email: 'maria.sidorova@example.com',
        profileId: 'PROF-67890',
        registrationDate: '2023-07-22',
        walletStatus: 'Улучшенный',
        balance: 3200,
        bonuses: 420,
        creditLimit: 50000,
        orders: [
          {
            id: 'ORD-003',
            status: 'Отменен',
            date: '2024-12-10',
            amount: 5600,
            items: [{ name: 'Платье вечернее', price: 3600 }, { name: 'Туфли на каблуке', price: 2000 }]
          }
        ],
        returnHistory: [],
        supportHistory: [
          { id: 'SUP-003', date: '2024-12-12', category: 'Отмена заказа', status: 'Закрыт', result: 'Объяснение причины отмены' }
        ],
        notes: 'Недавний клиент, часто задает вопросы',
        loyaltyLevel: 'Серебряный',
        preferences: ['Рассрочка', 'Экспресс доставка']
      },
      {
        name: 'Алексей Козлов',
        phone: '+7 (905) 567-89-01',
        email: 'alex.kozlov@example.com',
        profileId: 'PROF-54321',
        registrationDate: '2021-11-05',
        walletStatus: 'Минимальный',
        balance: 0,
        bonuses: 0,
        creditLimit: 0,
        orders: [
          {
            id: 'ORD-004',
            status: 'Ожидает оплаты',
            date: '2024-12-18',
            amount: 8900,
            items: [{ name: 'Смартфон Samsung', price: 6900 }, { name: 'Чехол', price: 500 }, { name: 'Защита экрана', price: 1500 }]
          },
          {
            id: 'ORD-005',
            status: 'Задерживается',
            date: '2024-12-08',
            amount: 12500,
            items: [{ name: 'Ноутбук Dell', price: 12500 }]
          }
        ],
        returnHistory: [
          { id: 'RET-002', date: '2024-10-20', reason: 'Некачественный товар', amount: 2490 }
        ],
        supportHistory: [
          { id: 'SUP-004', date: '2024-10-25', category: 'Возврат', status: 'Закрыт', result: 'Возврат средств' },
          { id: 'SUP-005', date: '2024-12-08', category: 'Задержка доставки', status: 'Открыт', result: 'Ожидание решения' }
        ],
        notes: 'Требовательный клиент, часто недоволен сервисом',
        loyaltyLevel: 'Бронзовый',
        preferences: ['Проверка статуса заказа', 'Поддержка 24/7']
      }
    ];

    this.issueTypes = [
      'Возврат',
      'Доставка',
      'Оплата',
      'Качество товара',
      'Отмена заказа',
      'Кошелек',
      'Приложение',
      'Другое'
    ];

    this.clientBehaviors = [
      'aggressive', 
      'confused', 
      'patient', 
      'demanding', 
      'polite', 
      'frustrated',
      'angry',
      'desperate'
    ];
  }

  generateClient() {
    const randomProfile = this.clientProfiles[Math.floor(Math.random() * this.clientProfiles.length)];
    const issueType = this.issueTypes[Math.floor(Math.random() * this.issueTypes.length)];
    const behavior = this.clientBehaviors[Math.floor(Math.random() * this.clientBehaviors.length)];
    
    // Generate a random initial message based on issue type
    const initialMessages = {
      'Возврат': [
        'Здравствуйте! Я хочу вернуть товар, потому что он мне не подошёл.',
        'Товар оказался с браком, хочу оформить возврат.',
        'Получил товар, но он не соответствует описанию на сайте.'
      ],
      'Доставка': [
        'Заказ долго не доставляется, уже неделю жду!',
        'Не пришло посылка, хотя в трекинге стоит статус "доставлено".',
        'Забирал товар в ПВЗ, а там его нет.'
      ],
      'Оплата': [
        'С моей карты списали деньги, но заказ не оформлялся.',
        'Не могу оплатить заказ, постоянно выходит ошибка.',
        'Хочу вернуть деньги за заказ, который отменили.'
      ],
      'Качество товара': [
        'Товар пришёл испорченный, что делать?',
        'Купил вещь, а она сразу порвалась после первой носки.',
        'Заказал товар, а получил совсем не то.'
      ],
      'Отмена заказа': [
        'Хочу отменить заказ, как это сделать?',
        'Пытался отменить заказ, но не получается.',
        'Заказ отменили, а деньги не вернулись.'
      ],
      'Кошелек': [
        'Не могу пополнить кошелёк, в чём проблема?',
        'Кошелёк не открывается, выдаёт ошибку.',
        'Забыл пароль от кошелька, как восстановить?'
      ],
      'Приложение': [
        'Приложение постоянно вылетает, не могу ничего сделать.',
        'Не могу авторизоваться в приложении, помогите.',
        'Пропали все мои заказы из приложения.'
      ],
      'Другое': [
        'У меня вопрос по поводу акции.',
        'Не могу найти чек по заказу.',
        'Хочу связаться с продавцом напрямую.'
      ]
    };

    const messages = [
      {
        text: initialMessages[issueType][Math.floor(Math.random() * initialMessages[issueType].length)],
        sender: 'client',
        timestamp: Date.now()
      }
    ];

    return {
      id: `CHAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      client: randomProfile,
      status: 'Открыт',
      category: issueType,
      behavior: behavior,
      context: {
        issueType,
        behavior,
        clientProfile: randomProfile
      },
      messages,
      summary: messages[0].text.substring(0, 100) + '...',
      escalated: false
    };
  }

  generateResponse(context, operatorMessage) {
    // Based on the client behavior and issue, generate a realistic response
    const { behavior, issueType } = context;
    
    // Different response patterns based on behavior
    const responsePatterns = {
      'aggressive': [
        'Да понял уже, только сделайте что-нибудь быстрее!',
        'Это всё ерунда, мне нужен реальный ответ!',
        'Я уже час жду, когда вы наконец что-то сделаете!',
        'Опять те же слова, а дело не двигается!'
      ],
      'confused': [
        'Простите, не совсем понял, что нужно сделать.',
        'Можно чуть подробнее объяснить?',
        'Я не уверен, что это то, что я имел в виду.',
        'Не понимаю, как это поможет.'
      ],
      'patient': [
        'Хорошо, спасибо за информацию.',
        'Понимаю, подожду.',
        'Спасибо за помощь.',
        'Хорошо, буду следить за статусом.'
      ],
      'demanding': [
        'Когда наконец будет решение?',
        'Мне нужно всё сделать сегодня, никаких отлагательств!',
        'Это мой последний заказ у вас, если не решите быстро!',
        'Только гарантируйте, что это сработает.'
      ],
      'polite': [
        'Спасибо за помощь.',
        'Понял, буду ждать.',
        'Хорошо, спасибо за разъяснение.',
        'Спасибо за оперативность.'
      ],
      'frustrated': [
        'Опять всё сложно, почему нельзя просто решить?',
        'Уже не впервые сталкиваюсь с этим.',
        'Почему так сложно сделать простую вещь?',
        'Мне кажется, никто не хочет помогать.'
      ],
      'angry': [
        'Это возмутительно, такое обслуживание!',
        'Я требую компенсации за вашу бездарность!',
        'Пожалуюсь вашему начальству!',
        'Такое отношение к клиентам недопустимо!'
      ],
      'desperate': [
        'Пожалуйста, помогите, это очень важно!',
        'У меня нет времени на всё это, срочно нужно решение!',
        'Пожалуйста, сделайте что-нибудь, я уже не знаю что делать.',
        'Это критично, прошу отнестись серьезно.'
      ]
    };

    // Select a response based on behavior
    const responses = responsePatterns[behavior] || responsePatterns['polite'];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Create a singleton instance
const clientGenerator = new ClientGenerator();
export default clientGenerator;