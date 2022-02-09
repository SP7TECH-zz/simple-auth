const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

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
app.use(cookieParser());
app.use(
  session({
    name: "sid",
    secret: "session secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
      sameSite: true,
    },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://simpleAuth:simpleAuth@cluster0.ueiyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" }),
  })
);

app.use(homeRoutes);

app.listen(5000 || process.env.PORT, () => {
  console.log("Server started");
});
