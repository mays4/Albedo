-- Drop and recreate Users table (Example)

-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS items_orders CASCADE;
DROP TABLE IF EXISTS orders CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_name VARCHAR(50),
  phone_number VARCHAR(32),
  email VARCHAR(255)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cal INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  price decimal(3,2) NOT NULL DEFAULT 0

);
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP DEFAULT NOW() ,
  estimated_time TIMESTAMP ,
  completed_time  TIMESTAMP,
  quantity INTEGER  NOT NULL DEFAULT 0,
  complete BOOLEAN  DEFAULT TRUE,
   item_no INTEGER,
  total_cost INTEGER DEFAULT NULL
);
CREATE TABLE items_orders(
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);

