// const express = require('express');
// const router  = express.Router();
// module.exports = (db) => {
// router.get("/", (req, res) => {
//   const menus = {};
//   return db
//   .query(`SELECT  image_url FROM items`)
//   .then((result) => {
//     menus.image_url= result.rows
//     console.log('main',menus.image_url)
//     res.json(menus);
//   // console.log("api/menu",res.json)
//       // res.render();

// })
// .catch((err) => {
//   console.log(err.message);
// });
// })
// // res.render("main");
// return router
// }
