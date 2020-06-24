const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl").default;

router.get("/signup", ctrl.showSignupPage);
router.post("/signup", ctrl.signup);

module.exports = router;
