const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; // Используем другой порт для теста

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'real-backend',
    timestamp: new Date().toISOString(),
    message: '🎉 Настоящий Express бэкенд работает!'
  });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Александр', role: 'admin' },
    { id: 2, name: 'Тестовый пользователь', role: 'user' }
  ]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Real Express backend on port ${PORT}`);
});
