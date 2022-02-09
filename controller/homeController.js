const mongoose = require("mongoose");

const userSchema = {
    name: String,
    email: String,
    password: String
}

const User = mongoose.model("User", userSchema);

exports.getHome = (req, res, next) => {
    res.render("index");
}

exports.getLogin = (req, res, next) => {
    res.render("login");
}

exports.getSignUp = (req, res, next) => {
    res.render("signup");
}

exports.postSignUp = (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login")
        }
    })

    console.log("working");
}