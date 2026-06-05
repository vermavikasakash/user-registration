const express = require("express");
const passport = require("passport");
const {
  registerController,
  loginController,
  googleCallbackController,
  getGoogleFailureUrl,
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

// ! GOOGLE LOGIN  (METHOD GET)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// ! GOOGLE CALLBACK  (METHOD GET)
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (error, user) => {
    if (error || !user) {
      return res.redirect(getGoogleFailureUrl());
    }

    req.user = user;
    return next();
  })(req, res, next);
}, googleCallbackController);

// ! LOGIN  (METHOD POST)
router.post("/logout", logoutController);

// !protected rotes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
