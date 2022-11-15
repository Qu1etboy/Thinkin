require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "scripts")));

const homeRoutes = require("./routes/general");
const postRoutes = require("./routes/posts");

app.use("/", homeRoutes);
app.use("/posts", postRoutes);

// error 404 page not found
app.get("*", (req, res) => {
  res.status(404);

  res.render("pages/404.ejs", {
    title: "Page Not Found - Thinkin",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
