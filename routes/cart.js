const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.post("/",(req,res) => {
     const qty = req.body.qty;
        const orderQuery=`INSERT INTO items_orders(order_id)
        SELECT user_id FROM orders
        `;
        db.query(orderQuery)
        .then((result) => {
          for (let q of qty) {
          const ItemsQuery=`INSERT INTO items_orders(quantity) values($1) RETURNING *`;
          db.query(ItemsQuery,[q])
          .then((result) => {
          return(result.rows);
          })
          .catch((err)=> {
            console.log(err.message);
          })
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      res.render('cart');
     })
  return router;
  };
