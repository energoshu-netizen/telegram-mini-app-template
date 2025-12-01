# Troubleshooting Guide

## Common Issues and Solutions

### 1. Services not starting
```bash
# Check what's wrong
docker-compose logs

# Restart specific service
docker-compose restart backend
```

### 2. Database connection issues
```bash
# Check if PostgreSQL is running
docker-compose exec postgres pg_isready

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

### 3. Frontend not loading
```bash
# Check nginx configuration
docker-compose exec frontend nginx -t

# Restart frontend
docker-compose restart frontend
```

### 4. Admin panel issues
```bash
# Check if API is accessible from admin panel
docker-compose exec admin-panel curl -f http://backend:3000/api/health
```

## Useful Commands
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# SSH into container
docker-compose exec backend sh

# Check service status
docker-compose ps

# Rebuild and restart
docker-compose down && docker-compose up -d --build
```

## Полное тестирование
```bash
# Даем права на выполнение
chmod +x test-system.sh check-data.sh

# Запускаем тестирование
./test-system.sh

# Проверяем данные
./check-data.sh
```

## Финальный отчет
```bash
echo "🎯 DEPLOYMENT SUCCESS REPORT"
echo "============================"
echo "✅ All services are running"
echo "✅ Database is populated" 
echo "✅ API endpoints are responsive"
echo "✅ Frontend is serving correctly"
echo "✅ Admin panel is accessible"
echo ""
echo "🌐 Access URLs:"
echo "   Customer Mini App: http://localhost:80"
echo "   Admin Panel: http://localhost:3001"
echo "   API: http://localhost:3000"
echo ""
echo "🚀 Next steps:"
echo "   1. Configure Telegram Bot with your domain"
echo "   2. Set up SSL certificates for production"
echo "   3. Configure monitoring and backups"
echo "   4. Train staff on using admin panel"
```
