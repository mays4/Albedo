/*
 * All routes for fulfillment are defined here
 * Since this file is loaded in server.js into api/fulfillment,
 *   these routes are mounted onto /fulfillment
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then(data => {
        console.log('data: ', data);
          //Step 1:  Get list of orders
          //Step 2:  Pass an array of orders into the ejs template for rendering
        const templateVars = { orders: data.rows };
        res.render('fulfillment', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};




