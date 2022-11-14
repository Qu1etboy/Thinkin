const express = require("express");

const db = require("../db/index");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    db.query(
      `SELECT 
          posts.*,
          COUNT(postComment.commentId) AS commentCount
      FROM posts 
      LEFT JOIN postComment 
      ON posts.postId = postComment.postId 
      GROUP BY posts.postId 
      ORDER BY posts.postId DESC`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        console.log(results);
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
