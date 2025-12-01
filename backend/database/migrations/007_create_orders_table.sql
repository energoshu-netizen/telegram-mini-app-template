CREATE TYPE order_status_enum AS ENUM ('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  status order_status_enum DEFAULT 'pending' NOT NULL,
  total_amount NUMERIC(10,2) DEFAULT 0 NOT NULL,
  currency CHAR(3) DEFAULT 'RUB' NOT NULL,
  note TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);
