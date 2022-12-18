const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// route to addPost page
router.get("/add", (req, res) => {
  res.render("pages/add-post.ejs", { title: "Add post - Thinkin" });
});

// create post
router.post("/add", async (req, res) => {
  const { username, topic, message } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        username: username,
        topic: topic,
        message: message,
      },
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// read single post from post id
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    // query single post

    const post = await prisma.post.findUnique({
      where: {
        postId: parseInt(postId),
      },
      include: {
        comment: true,
      },
    });

    res.render("pages/post-detail", {
      post: post,
      comments: post.comment,
      title: `${post.topic} - Thinkin`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/:postId/comment", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { message, username } = req.body;

    const comment = await prisma.comment.create({
      data: {
        username: username,
        message: message,
        postId: parseInt(postId),
      },
    });

    // refresh the page
    res.redirect(req.get("referer"));
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
