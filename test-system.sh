#!/bin/bash

echo "🧪 Starting comprehensive system test..."
echo "==========================================="

echo "1. Testing basic endpoints..."
curl -f http://localhost:3000/api/health || echo "❌ Backend health check FAILED"
curl -f http://localhost:80 || echo "❌ Frontend FAILED"
curl -f http://localhost:3001 || echo "❌ Admin panel FAILED"

echo ""
echo "2. Testing menu API..."
MENU_RESPONSE=$(curl -s http://localhost:3000/api/menu)
if echo "$MENU_RESPONSE" | grep -q "\["; then
    echo "✅ Menu API is working"
else
    echo "❌ Menu API returned unexpected response"
fi

echo ""
echo "3. Testing database connection..."
docker-compose exec backend node --input-type=module -e "
  import { pool } from './dist/db/pool.js';
  pool.query('SELECT COUNT(*) as count FROM categories')
    .then(result => { console.log('✅ Database OK - categories:', result.rows[0].count); process.exit(0); })
    .catch(err => { console.log('❌ Database ERROR:', err.message); process.exit(1); });
"

echo ""
echo "4. Testing order creation..."
ORDER_TEST=$(curl -s -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [ { "productId": 1, "quantity": 2, "optionIds": [] } ],
    "currency": "RUB",
    "note": "QA order"
  }')

if echo "$ORDER_TEST" | grep -q "orderId"; then
    echo "✅ Order creation is working"
elif echo "$ORDER_TEST" | grep -q "error"; then
    echo "⚠️ Order creation returned error (might be expected): $ORDER_TEST"
else
    echo "❌ Order creation FAILED"
fi

echo ""
echo "5. Checking service logs for errors..."
echo "Backend logs:"
docker-compose logs backend --tail=5 | grep -i error || echo "No backend errors"
echo "Frontend logs:"
docker-compose logs frontend --tail=5 | grep -i error || echo "No frontend errors"
echo "Database logs:"
docker-compose logs postgres --tail=5 | grep -i error || echo "No database errors"

echo ""
echo "6. System resources:"
docker-compose ps
echo ""
echo "Container resource usage:"
docker stats --no-stream $(docker ps -q) | head -5

echo ""
echo "==========================================="
echo "🎉 System testing completed!"
