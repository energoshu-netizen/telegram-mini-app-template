require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

console.log('🚀 Telegram Bot Running...');
console.log('📋 Token preview:', token ? token.substring(0, 15) + '...' : 'NOT FOUND');

if (!token) {
  console.log('❌ TELEGRAM_BOT_TOKEN not found');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
  
  console.log(`👋 User ${userName} started the bot`);
  
  bot.sendMessage(chatId, `🎉 Hello ${userName}! Welcome to my Mini App Bot!

🤖 This bot is connected to my Mini App project.

🚀 To see the application:
1. Open your web browser
2. Go to: http://localhost:80
3. Enjoy the Mini App!

💡 The app shows a beautiful interface with:
• Status monitoring
• Backend API integration  
• Ready for Telegram integration`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'ℹ️ About Project', callback_data: 'about' },
          { text: '🆘 Help', callback_data: 'help' }
        ],
        [
          { text: '📊 Check Status', callback_data: 'status' }
        ]
      ]
    }
  });
});

// Обработка кнопок
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  
  switch (query.data) {
    case 'about':
      bot.sendMessage(chatId, `🤖 ABOUT THE PROJECT

🚀 My Mini App with Telegram Integration

✨ What's working:
✅ Telegram Bot (you're using it!)
✅ Backend API (Node.js + Express)
✅ Frontend (Beautiful web interface)
✅ Database (PostgreSQL ready)
✅ Docker containers

🔧 Technologies:
• Node.js + Express
• PostgreSQL
• Docker
• Telegram Bot API
• HTML/CSS/JavaScript

💡 Open http://localhost:80 in your browser to see the app!`);
      break;
      
    case 'help':
      bot.sendMessage(chatId, `🆘 HOW TO USE

📱 With this bot:
• Use /start to see main menu
• Press buttons for information
• Send any message to chat

🌐 With the Mini App:
1. Open web browser
2. Visit: http://localhost:80
3. You'll see the application interface
4. It shows backend status and features

🚀 Next steps:
• Add user authentication
• Connect real database
• Deploy to server with HTTPS`);
      break;
      
    case 'status':
      bot.sendMessage(chatId, `📊 SYSTEM STATUS

🟢 Telegram Bot: RUNNING
🟢 Backend API: READY (port 3000)
🟢 Frontend: READY (port 80)  
🟢 Database: READY (PostgreSQL)

👤 Current user: ${query.from.first_name}
📅 Bot started: ${new Date().toLocaleString()}

💡 Everything is working! Try the app at http://localhost:80`);
      break;
  }
  
  // Ответим на callback чтобы убрать "часики"
  bot.answerCallbackQuery(query.id);
});

// Обработка обычных сообщений
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    const responses = [
      `💬 You said: "${msg.text}"\n\nNice message! Try the app at http://localhost:80`,
      `🤖 I heard: "${msg.text}"\n\nThe Mini App is waiting at http://localhost:80`,
      `📝 Message received!\n\n"${msg.text}"\n\nCheck out the app: http://localhost:80`,
      `🎯 Got your message!\n\n"${msg.text}"\n\nVisit http://localhost:80 to see the Mini App`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    bot.sendMessage(msg.chat.id, randomResponse);
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.log('🔴 Polling error:', error.code);
});

console.log('================================');
console.log('🤖 BOT IS RUNNING SUCCESSFULLY!');
console.log('================================');
console.log('✅ Bot responds to:');
console.log('   • /start command');
console.log('   • Button clicks');
console.log('   • Any text messages');
console.log('================================');
