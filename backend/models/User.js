
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter a valid email address",
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message:
          "Password must include uppercase and lowercase letters, a number, and a symbol",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving a user document.
userSchema.pre("save", async function () {
  // Do not hash the password again unless it has changed.
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Create and export the Mongoose model.
const User = mongoose.model("User", userSchema);

export default User;
