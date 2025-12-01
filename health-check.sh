#!/bin/bash

echo "🏥 Health check for Coffee & Code services..."

services=(
    "http://localhost:80"
    "http://localhost:3000/api/health"
    "http://localhost:3001"
)

for service in "${services[@]}"; do
    echo "Checking $service ..."
    if curl -s --head --request GET $service | grep "200\|301\|302" > /dev/null; then
        echo "✅ $service is OK"
    else
        echo "❌ $service is DOWN"
    fi
done

echo ""
echo "🐳 Container status:"
docker-compose ps

echo ""
echo "📋 Recent errors in logs:"
docker-compose logs --tail=20 | grep -i error || echo "No errors found"
