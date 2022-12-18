const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comment: true,
      },
      orderBy: {
        postId: "desc",
      },
    });

    res.render("pages/index", { posts: posts, title: "Thinkin" });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/about", (req, res) => {
  res.render("pages/about.ejs", { title: "about - Thinkin" });
});

module.exports = router;
