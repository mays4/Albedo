--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.widgets DROP CONSTRAINT widgets_user_id_fkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
ALTER TABLE ONLY public.items_orders DROP CONSTRAINT items_orders_order_id_fkey;
ALTER TABLE ONLY public.items_orders DROP CONSTRAINT items_orders_item_id_fkey;
ALTER TABLE ONLY public.items DROP CONSTRAINT items_category_id_fkey;
ALTER TABLE ONLY public.widgets DROP CONSTRAINT widgets_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
ALTER TABLE ONLY public.items_orders DROP CONSTRAINT items_orders_pkey;
ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
ALTER TABLE public.widgets ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.items_orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.widgets_id_seq;
DROP TABLE public.widgets;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.orders_id_seq;
DROP TABLE public.orders;
DROP SEQUENCE public.items_orders_id_seq;
DROP TABLE public.items_orders;
DROP SEQUENCE public.items_id_seq;
DROP TABLE public.items;
DROP SEQUENCE public.customers_id_seq;
DROP TABLE public.customers;
DROP SEQUENCE public.categories_id_seq;
DROP TABLE public.categories;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE categories OWNER TO labber;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categories_id_seq OWNER TO labber;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE categories_id_seq OWNED BY categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(32) NOT NULL,
    email character varying(255)
);


ALTER TABLE customers OWNER TO labber;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers_id_seq OWNER TO labber;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE customers_id_seq OWNED BY customers.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category_id integer,
    url character varying(255) NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    cal integer
);


ALTER TABLE items OWNER TO labber;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_id_seq OWNER TO labber;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE items_id_seq OWNED BY items.id;


--
-- Name: items_orders; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE items_orders (
    id integer NOT NULL,
    item_id integer,
    order_id integer,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE items_orders OWNER TO labber;

--
-- Name: items_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE items_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_orders_id_seq OWNER TO labber;

--
-- Name: items_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE items_orders_id_seq OWNED BY items_orders.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE orders (
    id integer NOT NULL,
    user_id integer,
    "time" date NOT NULL,
    estimated_time time without time zone NOT NULL,
    completed_time time without time zone NOT NULL,
    complete boolean DEFAULT true NOT NULL
);


ALTER TABLE orders OWNER TO labber;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders_id_seq OWNER TO labber;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE orders_id_seq OWNED BY orders.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE users OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: widgets; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE widgets (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL
);


ALTER TABLE widgets OWNER TO labber;

--
-- Name: widgets_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE widgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE widgets_id_seq OWNER TO labber;

--
-- Name: widgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE widgets_id_seq OWNED BY widgets.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY customers ALTER COLUMN id SET DEFAULT nextval('customers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items_orders ALTER COLUMN id SET DEFAULT nextval('items_orders_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY orders ALTER COLUMN id SET DEFAULT nextval('orders_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets ALTER COLUMN id SET DEFAULT nextval('widgets_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY categories (id, name) FROM stdin;
1	appetizer
2	soup
3	salad
4	beef
5	poultry
6	kids
7	deserts
8	drinks
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('categories_id_seq', 8, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY customers (id, name, phone, email) FROM stdin;
1	Labber	123-456-7890	abc@123.com
2	Labber	123-456-7890	abc@123.com
3	Labber	4167679612	abc@123.com
4	Labber	4167679612	abc@123.com
5	Labber	+14167679612	abc@123.com
6	Labber	+14167679612	abc@123.com
7	Labber	+14167679612	abc@123.com
8	Labber	+14167679612	abc@123.com
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('customers_id_seq', 8, true);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY items (id, name, description, category_id, url, price, cal) FROM stdin;
1	mushroom soup	basic roux is thinned with cream or milk and then mushrooms and/or mushroom broth are added	1	/images/mushroom.jpg	399	39
2	lentil soup	is a soup based on lentils; it may be vegetarian or include meat, and may use brown, red, yellow, green or black lentils	1	/images/lentil.jpg	499	56
3	caeser salad	 romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper	1	/images/Caeser.jpg	599	44
4	Fattoush salad	 Levantine salad made from toasted or fried pieces of khubz combined with mixed greens and other vegetables, such as radishes and tomatoes	2	/images/fattoush.jpg	399	159
5	kabab	 cooked meat dish, with its origins in Middle Eastern cuisine.	3	/images/kabab.jpg	899	145
6	burger	  ground meat, typically beef—placed inside a sliced bread roll or bun.	3	/images/kabab.jpg	799	225
7	pizza	 Dough, sauce (usually tomato sauce), cheese 	4	/images/pizza.jpg	699	309
8	chicken scallop	fried chicken breast	4	/images/chicken.jpg	799	344
9	tea	 black tea 	5	/images/tea.jpg	299	1
10	coffee	coffee with milk 	5	/images/coffee.jpg	345	31
11	food item 1	description for item1	3	/images/photo-1546069901-ba9599a7e63c.jpeg	3123	765
12	food item 2	description for item1	3	/images/photo-1546069901-d5bfd2cbfb1f.jpeg	1214	1511
13	food item 3	description for item1	3	/images/photo-1580013759032-c96505e24c1f.jpeg	1515	1211
14	food item 4	description for item1	1	/images/photo-1625536059909-84924b9899ea.jpeg	1899	1311
15	food item 5	description for item1	3	/images/photo-1553183733-81edd1223a95.jpeg	2299	1321
16	food item 6	description for item1	2	/images/photo-1632935254449-e777adc9addf.jpeg	1199	1851
17	food item 7	description for item1	4	/images/photo-1499969942143-ad2a66bc72dc.jpeg	299	1112
18	food item 8	description for item1	1	/images/photo-1544510806-e28d3cd4d4e6.jpeg	799	1654
19	food item 9	description for item1	1	/images/photo-1516714435131-44d6b64dc6a2.jpeg	1199	1112
20	food item 11	description for item1	5	/images/photo-1512152272829-e3139592d56f.jpeg	1799	151
21	food item 11	description for item1	1	/images/photo-1605851868183-7a4de52117fa.jpeg	2399	1842
22	food item 12	description for item1	1	/images/photo-1546069901-ba9599a7e63c.jpeg	2677	1112
23	food item 13	description for item1	1	/images/photo-1557748362-4e95f0de4f6f.jpeg	799	1521
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('items_id_seq', 23, true);


--
-- Data for Name: items_orders; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY items_orders (id, item_id, order_id, quantity) FROM stdin;
\.


--
-- Name: items_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('items_orders_id_seq', 1, false);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY orders (id, user_id, "time", estimated_time, completed_time, complete) FROM stdin;
\.


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('orders_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY users (id, name) FROM stdin;
1	Alice
2	Kira
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('users_id_seq', 2, true);


--
-- Data for Name: widgets; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY widgets (id, user_id, name) FROM stdin;
1	1	Sprockets
2	2	Chains
3	2	Bearings
\.


--
-- Name: widgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('widgets_id_seq', 3, true);


--
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: items_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items_orders
    ADD CONSTRAINT items_orders_pkey PRIMARY KEY (id);


--
-- Name: items_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: orders_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: widgets_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (id);


--
-- Name: items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;


--
-- Name: items_orders_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items_orders
    ADD CONSTRAINT items_orders_item_id_fkey FOREIGN KEY (item_id) REFERENCES categories(id) ON DELETE CASCADE;


--
-- Name: items_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY items_orders
    ADD CONSTRAINT items_orders_order_id_fkey FOREIGN KEY (order_id) REFERENCES categories(id) ON DELETE CASCADE;


--
-- Name: orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES categories(id) ON DELETE CASCADE;


--
-- Name: widgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT widgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

