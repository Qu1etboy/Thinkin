const express = require("express");

const db = require("../db/index");
const router = express.Router();

// route to addPost page
router.get("/add", (req, res) => {
  res.render("pages/add-post.ejs", { title: "Add post - Thinkin" });
});

// create post
router.post("/add", (req, res) => {
  try {
    const { username, topic, message } = req.body;

    db.query(
      "INSERT INTO posts (username, topic, message, postDate) VALUES (? ,? , ?, NOW())",
      [username, topic, message],
      (err, results, fields) => {
        if (err) {
          return res.status(400).send();
        }
        res.redirect("/");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// read single post from post id
router.get("/:postId", (req, res) => {
  try {
    const postId = req.params.postId;
    // query single post
    db.query(
      "SELECT * FROM posts WHERE postId = ?",
      [postId],
      (err, results, field) => {
        if (err) {
          return res.status(400).send();
        }
        // get first post
        const post = results[0];

        // query comment from that post
        db.query(
          "SELECT * FROM postComment WHERE postId = ? ORDER BY commentId DESC",
          [postId],
          (err, results, field) => {
            if (err) {
              return res.status(400).send();
            }
            // get comment post
            const comments = results;
            res.render("pages/post-detail", {
              post: post,
              comments: comments,
              title: `${post.topic} - Thinkin`,
            });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/:postId/comment", (req, res) => {
  try {
    const postId = req.params.postId;
    const { message, username } = req.body;
    db.query(
      "INSERT INTO postComment (postId, message, username, commentDate) VALUES (?, ?, ?, NOW())",
      [postId, message, username],
      (err, results, field) => {
        if (err) {
          return res.status(400).send();
        }
        console.log("comment sent");
        res.redirect(req.get("referer"));
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
