const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.post("/",(req,res) => {
    const userId = req.session.userId || '';
    console.log("re",req.body)
     const qty = req.body.qty;
     const id = req.body.id;
    //  const cust = req.body.cust_name
     const getid = ()=> {
      return Math.floor(Math.random() * 100)

     }
    //  const ItemsQuery = `INSERT INTO items_orders(item_id) SELECT id FROM items `;
    //  db.query(ItemsQuery).then((result) =>{return result.rows });

    for ( let i =0; i <= id.length ; i++  ){

        for (let q = 0 ; q <= qty.length ; q++) {
            if(q === i){
        const orderQuery=`INSERT INTO orders(order_no,quantity)
        values($1,$2)
        RETURNING *
        `;
        db.query(orderQuery,[id[i],qty[q]])
        .then((result) => {
          //  console.log("order",result.rows)
          // const ItemsQuery=`INSERT INTO items_orders(quantity) values($1) RETURNING *`;
          // db.query(ItemsQuery,[q])
          // .then((result) => {
          //   console.log("in",result.rows,"it",ItemsQuery)
          return(result.rows);
          // })
          // .catch((err)=> {
          //   console.log(err.message);
          // })
          // }
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    }
    }
      res.render('cart');
     })
  return router;
  };
