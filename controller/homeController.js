const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const lnks = [];

const userSchema = {
    name: String,
    email: String,
    password: String,
    links: lnks
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

    User.findOne({
            email: reqbody.email,
        },
        (err, result) => {
            if (result) {
                bcrypt.compare(reqbody.password, result.password, (fail, pass) => {
                    if (pass) {
                        req.session.userId = result._id;
                        req.session.email = result.email;
                        req.session.name = result.name;
                        res.redirect("/lists");
                    }
                });
            }
        }
    );
};

exports.getSignUp = (req, res, next) => {
    res.render("signup", {
        errorMessage: "Register Yourself!"
    });
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
                    res.render("signup", {
                        errorMessage: "Email Already Exists.",
                    });
                }
            } else {
                res.redirect("/lists");
            }
        });
    });
};

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Session detroy error.");
        } else {
            res.redirect("/");
        }
    });
};

exports.postLink = (req, res, next) => {

    lnks.push(req.body.link);

    User.findOneAndUpdate({
        email: req.session.email
    }, {
        links: lnks
    }, (err, result) => {
        if (result) {
            console.log(lnks);
        } else {
            console.log("error--> ", err);
        }
    });

    res.redirect("/lists");
};

exports.getLists = (req, res, next) => {
    res.render("list", {
        links: lnks
    });
};