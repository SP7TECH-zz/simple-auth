const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/homeRoutes");

const app = express();

// mongoose.connect("")

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(homeRoutes);

app.listen(3000 || process.env.PORT, () => {
    console.log("Server started");
})