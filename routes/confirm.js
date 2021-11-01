const express = require('express');
const router  = express.Router();
module.exports = (db) => {
    router.post("/",(req,res) => {
      console.log("body",req.body)
       const name = req.body.name;
       const phone= req.body.phone_number;
      //  console.log("what",req.body)
      // res.send(JSON.stringify(req.body));
      //  const addOrder=function () {
        const orderQuery=`INSERT INTO users(customer_name,phone_number) values($1,$2) RETURNING *`;
        db.query(orderQuery,[name,phone])
        .then((result) => {
          // for ( let i of id){
        //   const ItemsQuery=`INSERT INTO orders(user_id)
        //       SELECT id FROM users
        //       RETURNING *
        //    `
        //   db.query(ItemsQuery)
        //   .then((result) => {
        //     console.log("rows",result.rows);
        //   return(result.rows);
        //   })
        //   .catch((err)=> {
        //     console.log(err.message);
        //   })
        //   // console.log("re",result.rows)
        //   //INSERT INTO items_orders(quantity) values($1),
        //   return(result.rows);
        // // }
        })
        .catch((err) => {
          console.log(err.message);
        })

        //  addOrder()
        res.render('confirm');
      });
      return router;
    };
