INSERT INTO users (telegram_id, first_name, last_name, username, phone, loyalty_balance) VALUES
  (10001, 'Иван', 'Иванов', 'ivan', '+70000000001', 0),
  (10002, 'Анна', 'Петрова', 'anna', '+70000000002', 10);

INSERT INTO categories (name, sort_order) VALUES
  ('Кофе', 1),
  ('Чай', 2),
  ('Десерты', 3);

INSERT INTO products (category_id, name, description, price, is_available) VALUES
  ((SELECT id FROM categories WHERE name='Кофе'), 'Капучино', 'Классический капучино', 210.00, TRUE),
  ((SELECT id FROM categories WHERE name='Кофе'), 'Латте', 'Нежный латте', 220.00, TRUE),
  ((SELECT id FROM categories WHERE name='Чай'), 'Матча', 'Матча латте', 230.00, TRUE);

INSERT INTO product_options (product_id, name, price_delta, is_required, max_quantity) VALUES
  ((SELECT id FROM products WHERE name='Капучино'), 'Молоко миндальное', 30.00, FALSE, 1),
  ((SELECT id FROM products WHERE name='Капучино'), 'Сироп ванильный', 20.00, FALSE, 3);

INSERT INTO tables (label, capacity, location) VALUES
  ('A1', 2, 'Зал'),
  ('A2', 2, 'Зал'),
  ('B1', 4, 'Окно');

INSERT INTO bookings (table_id, user_id, status, start_time, end_time, guests, note) VALUES
  ((SELECT id FROM tables WHERE label='A1'), (SELECT id FROM users WHERE telegram_id=10001), 'confirmed', NOW() + INTERVAL '1 hour', NOW() + INTERVAL '2 hours', 2, 'Тест бронирование');

INSERT INTO orders (user_id, status, total_amount, currency, note) VALUES
  ((SELECT id FROM users WHERE telegram_id=10002), 'paid', 220.00, 'RUB', 'Тест заказ');

INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
  ((SELECT id FROM orders ORDER BY id DESC LIMIT 1), (SELECT id FROM products WHERE name='Латте'), 1, 220.00, 220.00);

INSERT INTO loyalty_points (user_id, points_change, reason) VALUES
  ((SELECT id FROM users WHERE telegram_id=10002), 10, 'Покупка');
