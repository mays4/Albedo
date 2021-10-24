const express = require('express');
const router  = express.Router();
module.exports = (db) => {
    router.post("/",(req,res) => {
      // console.log("req.body",req.body);
      // console.log("req.parms",req.params);
      // console.log("body",res.json)
      // const order = createOrderElement(item);
        console.log("regq",req.body)
       const name = req.body.name;
       const phone= req.body.phone_number;

      // res.send(JSON.stringify(req.body));

      console.log("name222",name);
      console.log("phone11",Number(phone)) ;
      //  const addOrder=function () {
        const orderQuery=`INSERT INTO orders(name) values($2) RETURNING *`;
        db.query(orderQuery,[name])
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
