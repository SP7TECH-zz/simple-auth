const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = {
  name: String,
  email: String,
  password: String,
};

const User = mongoose.model("User", userSchema);

exports.getHome = (req, res, next) => {
  res.render("index");
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  var reqbody = req.body;

  User.findOne({ email: reqbody.email }, (err, result) => {
    if (result) {
      bcrypt.compare(reqbody.password, result.password, (fail, pass) => {
        if (pass) {
          res.render("list");
        }
      });
    }
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("signup");
};

exports.postSignUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    newUser.save(function (err, result) {
      if (err) {
        if (err.code == 11000) {
          res.render("signup", { errorMessage: "Email Already Exists." });
        }
      } else {
        res.redirect("/login");
      }
    });
  });

  console.log("working");
};
