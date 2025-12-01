#!/bin/bash

echo "📊 Checking database data..."

docker-compose exec postgres psql -U admin -d coffeecode -c "
SELECT 'Categories:' as table, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Products:', COUNT(*) FROM products
UNION ALL  
SELECT 'Users:', COUNT(*) FROM users
UNION ALL
SELECT 'Orders:', COUNT(*) FROM orders;
"

echo ""
echo "Sample data:"
docker-compose exec postgres psql -U admin -d coffeecode -c "
SELECT name, price FROM products LIMIT 5;
"
