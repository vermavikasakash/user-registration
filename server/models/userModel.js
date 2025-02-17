const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = { User };

//timestamps is used to get details when user is created
