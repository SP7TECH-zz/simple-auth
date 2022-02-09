const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/homeRoutes");

const app = express();

mongoose.connect("mongodb+srv://simpleAuth:simpleAuth@cluster0.ueiyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(homeRoutes);

app.listen(5000 || process.env.PORT, () => {
  console.log("Server started");
});
