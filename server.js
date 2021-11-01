// load .env data into process.env
require("dotenv").config();
//  const {createOrderElement} = require("./public/scripts/menu");
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
const KEY_ONE = process.env.KEY_ONE;
const KEY_TWO = process.env.KEY_TWO;
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'userSession',
  keys: [KEY_ONE, KEY_TWO]
}));


app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const orders = require("./routes/orders");
 const category = require("./routes/category");
const cart = require("./routes/cart");
const confirm = require("./routes/confirm");
// const main = require("./routes/main");
// const review = require("./routes/review");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/menu", orders(db));
app.use("/api/menu",category(db));
app.use("/api/cart", cart(db));
app.use("/api/confirm", confirm(db));
// app.use("/api/main", main(db));
// app.use("/api/review", review(db));
// Note: mount other resources here, using the same pattern above
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("main");
// });
app.get("/api/menu/", (req, res) => {
  // console.log("api/menu")
  res.render("menu");
});
// app.get("/", (req, res) => {
//   // console.log("api/menu",res.json)
//   res.render("main");
// });
app.get("/", (req, res) => {
  res.render("main");
});
app.get("/:category_id", (req, res) => {
  res.render("menu");
});
// app.get("/api/main",(req,res) =>{

//   const getItem = function() {
//     const list ={}
//     return db
//       .query(`SELECT image_url FROM items`)
//       .then((result) => {
//         list.image_url = result.rows
//         res.json(list.image_url);
//         console.log(list.image_url)
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }
//   getItem()
// });



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
