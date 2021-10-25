const express = require('express');
const router  = express.Router();
module.exports = (db) => {
    router.post("/",(req,res) => {
       const qty = req.body.qty;
      //const id = Number(req.body.id);
      // console.log("id",typeof(id)) ;
      //  const addOrder=function () {
        for (let q of qty){
         console.log("type of q",q)
          const orderQuery=`INSERT INTO items_orders(quantity) values($1) RETURNING *`;
          db.query(orderQuery,[q])
          .then((result) => {
            // console.log("re",result.rows)
            //INSERT INTO items_orders(quantity) values($1),
            return(result.rows);
          })
          .catch((err) => {
            console.log(err.message);
          });
        }
        //  }
        //  addOrder()
        res.render('cart');
      });
      return router;
    };
