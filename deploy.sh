#!/bin/bash

echo "🚀 Starting Coffee & Code deployment..."

if [ ! -f .env ]; then
    echo "❌ .env file not found! Please create it from .env.example"
    exit 1
fi

echo "🛑 Stopping existing containers..."
docker-compose down

echo "🔨 Building Docker images..."
docker-compose build --no-cache

echo "▶️ Starting services..."
docker-compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

echo "🔍 Checking services status..."
docker-compose ps

echo "📦 Running database migrations..."
docker-compose exec backend npm run migrate

echo "🌱 Seeding initial data..."
docker-compose exec backend npm run seed

echo "✅ Deployment completed!"
echo ""
echo "📊 Services are running on:"
echo "   Frontend (Mini App): http://localhost:80"
echo "   Backend API: http://localhost:3000"
echo "   Admin Panel: http://localhost:3001"
echo "   PostgreSQL: localhost:5432"
echo ""
echo "📝 Check logs with: docker-compose logs -f"
