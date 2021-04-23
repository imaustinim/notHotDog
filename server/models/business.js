const mongoose = require("mongoose");
const isEmail = require("validator").isEmail;

const businessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    avatar: String,
    nodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node",
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
businessSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("Business", businessSchema);
