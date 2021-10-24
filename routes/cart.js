const express = require('express');
const router  = express.Router();
module.exports = (db) => {
    router.post("/",(req,res) => {
      // console.log("req.body",req.body);
      // console.log("req.parms",req.params);
      // console.log("body",res.json)
      // const order = createOrderElement(item);
       const qty = req.body.qty;
       const name = req.body.name;
       const price = req.body.price;
       const id = Number(req.body.id);
      // res.send(JSON.stringify(req.body));

      console.log("qty",qty);
      console.log("id",typeof(id)) ;
      //  const addOrder=function () {
        const orderQuery=`INSERT INTO orders(name) values($2) RETURNING *`;
        db.query(orderQuery,[name,qty])
        .then((result) => {
          // console.log("re",result.rows)
          //INSERT INTO items_orders(quantity) values($1),
          return(result.rows);
        })
        .catch((err) => {
          console.log(err.message);
        });
        //  }
        //  addOrder()
        res.render('cart');
      });
      return router;
    };
