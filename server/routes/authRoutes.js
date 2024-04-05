const express = require("express");
const { signup, login } = require("../controllers/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello jee kaise ho sarre!");
});

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
