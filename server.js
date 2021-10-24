// load .env data into process.env
require("dotenv").config();
//  const {createOrderElement} = require("./public/scripts/menu");

// Web server config
const PORT = process.env.PORT || 3000;
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
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("menu");
});
app.get("/:category_id", (req, res) => {
  res.render("menu");
});

app.get("/api/menu",(req,res) =>{

  const getItem = function() {
    return db
      .query(`SELECT * FROM items`)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getItem()
});

app.get("/api/menu2",(req,res) =>{

  const getItem = function() {
    const menus = {};
    return db
      .query(`SELECT * FROM items`)
      .then((result) => {
        menus.menus = result.rows
        db.query(`SELECT * FROM categories
    `)
    .then((result) => {
      // console.log("re",result.rows)
      menus.categories = result.rows
      res.json(menus);
    })
        // res.json(result.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getItem()
});

app.get("/api/menu2/:category_id",(req,res) =>{

  const category_id = req.params.category_id
  const getItem = function() {
    const menus = {};
    return db
      .query(`SELECT * FROM items where category_id = $1`, [category_id])
      .then((result) => {
        menus.menus = result.rows
        // console.log("res++++",result.rows)
        db.query(`SELECT * FROM categories
    `)
    .then((result) => {
      // console.log("re",result.rows)
      menus.categories = result.rows
      res.json(menus);
    })
        // res.json(result.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getItem()
});

app.get("/api/catacories",(req,res) =>{

  const getCatogories=function (){
    return db.query(`SELECT * FROM categories
    `)
    .then((result) => {
      // console.log("re",result.rows)
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
   }
   getCatogories();
  });


  app.post("/api/cart",(req,res) => {
    // console.log("req.body",req.body);
    // console.log("req.parms",req.params);
    // console.log("body",res.json)
    // const order = createOrderElement(item);
     const qty = req.body.qty;
     const name = req.body.name;
     const price = req.body.price;
     const id = req.body.id;
    // res.send(JSON.stringify(req.body));

    res.render('cart');
    console.log("qty",qty);
    console.log("id",id)
    const addOrder=function (){
      const orderList=`INSERT INTO items_orders(quantity) values($1) RETURNING *`;
      return db.query(orderList,[qty])

      .then((result) => {
        // console.log("re",result.rows)
        return(result.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
     }
     addOrder()
    });



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
