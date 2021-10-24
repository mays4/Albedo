-- Drop and recreate Users table (Example)

-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS items_orders CASCADE;
DROP TABLE IF EXISTS orders CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(32)  NOT NULL,
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
CREATE TABLE items_orders(
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  quantity INTEGER  NOT NULL DEFAULT 0

);
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  time  time  NOT NULL,
  estimated_time  time NOT NULL,
  completed_time   time NOT NULL,
  complete BOOLEAN NOT NULL DEFAULT TRUE

);
