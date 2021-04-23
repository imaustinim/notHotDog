const mongoose = require("mongoose");
const isEmail = require("validator").isEmail;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    tokens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Token",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);
userSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);
