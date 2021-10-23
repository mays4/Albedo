

INSERT INTO users (name,phone)VALUES ('mary','647-322-5656');
INSERT INTO users (name,phone)VALUES ('ali',4169232121);
INSERT INTO users (name,phone)VALUES ('rose',416233211);
INSERT INTO categories (name) VALUES ('appetizer');
INSERT INTO categories (name) VALUES ('soup');
INSERT INTO categories (name) VALUES ('salad');
INSERT INTO categories (name) VALUES ('beef');
INSERT INTO categories (name) VALUES ('poultry');
INSERT INTO categories (name) VALUES ('kids');
INSERT INTO categories (name) VALUES ('deserts');
INSERT INTO categories (name) VALUES ('drinks');


INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('mushroom soup','basic roux is thinned with cream or milk and then mushrooms and/or mushroom broth are added',39,1,'images/mushroom.jpg',3.99);
INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('lentil soup','is a soup based on lentils; it may be vegetarian or include meat, and may use brown, red, yellow, green or black lentils',56,1,'images/lentil.jpg',4.99);

INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('caeser salad',' romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper',44,1,'images/Caeser.jpg',5.99);
INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('Fattoush salad',' Levantine salad made from toasted or fried pieces of khubz combined with mixed greens and other vegetables, such as radishes and tomatoes',159,2,'images/fattoush.jpg',3.99);

INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('kabab',' cooked meat dish, with its origins in Middle Eastern cuisine.',145,3,'images/kabab.jpg',8.99);
INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('burger','  ground meat, typically beef—placed inside a sliced bread roll or bun.',225,3,'images/burger.jpg',7.99);

INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('pizza',' Dough, sauce (usually tomato sauce), cheese ',309,4,'images/pizza.jpg',6.99);
INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('chicken scallop','fried chicken breast',344,4,'images/chicken.jpg',7.99);

INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('tea',' black tea ',1,5,'images/tea.jpg',2.99);
INSERT INTO items (name,description,cal,category_id,image_url,price) VALUES ('coffee','coffee with milk ',31,5,'images/coffee.jpg',3.45);



-- INSERT INTO orders (user_id,time,estimated_time,completed_time,complete) VALUES (2,'13:30','00:15','14:15',TRUE);
-- INSERT INTO orders (user_id,time,estimated_time,completed_time,complete) VALUES (2,'12:30','00:30','01:01',TRUE);



