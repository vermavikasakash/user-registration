const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
// ! REGISTER  (METHOD POST)
router.post("/register", registerController);

// ! LOGIN  (METHOD POST)
router.post("/login", loginController);

// ! LOGIN  (METHOD POST)
router.post("/logout", logoutController);

// !protected rotes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
