const JWT = require("jsonwebtoken");
const userModal = require("../models/userModel");

//! protected routes 1st token base for login
const requireSignIn = async (req, res, next) => {
  try {
    const keyDecode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = keyDecode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// !  protected middleware for admin login
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized access for admin" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: " Error in admin", error });
  }
};

module.exports = { requireSignIn, isAdmin };
