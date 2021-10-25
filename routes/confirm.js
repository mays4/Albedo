const express = require('express');
const router  = express.Router();
module.exports = (db) => {
    router.post("/",(req,res) => {
       const name = req.body.name;
       const phone= req.body.phone_number;
      // res.send(JSON.stringify(req.body));
      //  const addOrder=function () {
        const orderQuery=`INSERT INTO orders(customer_name,phone_number) values($1,$2) RETURNING *`;
        db.query(orderQuery,[name,phone])
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
        res.render('confirm');
      });
      return router;
    };
