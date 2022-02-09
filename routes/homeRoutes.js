const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");

router.get("/", homeController.getHome);

router.get("/login", homeController.getLogin);
router.get("/signup", homeController.getSignUp);
router.post("/signup", homeController.postSignUp);
router.post("/login", homeController.postLogin);

router.post("/logout", homeController.getLogout);

module.exports = router;