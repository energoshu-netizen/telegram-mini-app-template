# First Start Guide

## Prerequisites
- Docker & Docker Compose installed
- Telegram Bot created via @BotFather

## Quick Start

1. Setup environment:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. Run deployment:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. Verify deployment:
   ```bash
   chmod +x health-check.sh
   ./health-check.sh
   ```

4. Configure Telegram Bot:
- Set webhook URL: `http://your-domain.com/bot-webhook`
- Set Mini App URL: `http://your-domain.com`

5. Access Points
- Mini App: http://localhost:80
- Admin Panel: http://localhost:3001
- API Documentation: http://localhost:3000/api/docs

6. Запусти сборку выполнив команды:
```bash
# Даем права на выполнение
chmod +x deploy.sh health-check.sh

# Запускаем деплой
./deploy.sh
```
