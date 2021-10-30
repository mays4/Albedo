const express = require("express");
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    const getItem = function () {
      const menus = {};
      return db
        .query(`SELECT * FROM items`)
        .then((result) => {
          menus.menus = result.rows;
          db.query(
            `SELECT * FROM categories
      `
          ).then((result) => {
            // console.log("re",result.rows)
            menus.categories = result.rows;
            res.json(menus);
          });
          // res.json(result.rows);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getItem();
  });

  router.get("/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    const getItem = function () {
      const menus = {};
      return db
        .query(`SELECT * FROM items where category_id = $1`, [category_id])
        .then((result) => {
          menus.menus = result.rows;
          db.query(
            `SELECT * FROM categories
                          `
          ).then((result) => {
            menus.categories = result.rows;
            res.json(menus);
          });
          // res.json(result.rows);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getItem();
  });

  return router;
};
