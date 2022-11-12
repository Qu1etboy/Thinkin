const express = require("express");

const db = require("../db/index");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    db.query(
      "SELECT * FROM posts ORDER BY postId DESC",
      (err, results, fields) => {
        if (err) {
          return res.status(400).send();
        }
        res.render("pages/index", { posts: results, title: "Thinkin" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/about", (req, res) => {
  res.render("pages/about.ejs", { title: "about - Thinkin" });
});

module.exports = router;
