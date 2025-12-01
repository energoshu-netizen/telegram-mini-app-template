CREATE TABLE IF NOT EXISTS product_options (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price_delta NUMERIC(10,2) DEFAULT 0 NOT NULL,
  is_required BOOLEAN DEFAULT FALSE NOT NULL,
  max_quantity INTEGER DEFAULT 1 NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_options_product_id ON product_options (product_id);
CREATE UNIQUE INDEX IF NOT EXISTS ux_product_options_product_name_active ON product_options (product_id, name) WHERE deleted_at IS NULL;
