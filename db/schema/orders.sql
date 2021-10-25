DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  order_no VARCHAR(32),
  order_time time NOT NULL,
  order_note VARCHAR(255),
  complete BOOLEAN NOT NULL DEFAULT TRUE,
  completed_time time NOT NULL,
  estimated_time time NOT NULL
);
