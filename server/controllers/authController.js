const { hashPassword, comparePassword } = require("../helpers/authHelper");
const { User, Task } = require("../models/userModel");
const JWT = require("jsonwebtoken");

const createToken = (userId) =>
  JWT.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const getAuthResponse = (user, message) => ({
  status: true,
  success: true,
  message,
  user: {
    name: user.name,
    email: user.email,
    role: user.role,
    authProvider: user.authProvider,
    avatar: user.avatar,
  },
  token: createToken(user._id),
});

const getClientUrl = () => process.env.CLIENT_URL || "http://localhost:3000";

const getGoogleFailureUrl = () =>
  `${getClientUrl()}/?googleLogin=failed`;

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //! validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }

    if (!password) {
      return res.send({ error: "password is required" });
    }

    //   ! check user if already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //   !  if new user then register and save
    const hashPass = await hashPassword(password);
    //   ? save
    const user = await new User({
      name,
      email,
      password: hashPass,
    }).save();
    res
      .status(200)
      .send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// ! LOGIN (Post) CONTROLLER
const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    // ? validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    // check user is registered
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "Email is not registered ",
      });
    }
    if (!user.password) {
      return res.status(200).send({
        status: false,
        success: false,
        message: "This account uses Google sign-in. Please continue with Google.",
      });
    }
    // if registered check password
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(200).send({
        status: false,
        message: "Invalid Password",
      });
    }
    res.status(200).send(getAuthResponse(user, "Successfully Login"));
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// ! GOOGLE CALLBACK CONTROLLER
const googleCallbackController = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(getGoogleFailureUrl());
    }

    const authResponse = getAuthResponse(
      req.user,
      "Successfully signed in with Google"
    );
    const authData = encodeURIComponent(JSON.stringify(authResponse));

    return res.redirect(`${getClientUrl()}/google-auth-success?auth=${authData}`);
  } catch (error) {
    console.log(error);
    return res.redirect(getGoogleFailureUrl());
  }
};

//? TEST TOKEN
const testController = (req, res) => {
  res.send("Token working");
};

// ? LOGOUT CONTROLLER
const logoutController = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully", token: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout error", error });
  }
};

// ! EXPORTS
module.exports = {
  registerController,
  loginController,
  googleCallbackController,
  getGoogleFailureUrl,
  logoutController,
  testController,
};
