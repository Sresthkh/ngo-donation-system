import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🔽 NEW OPTIONAL FIELDS
    phone: {
      type: String,
    },

    city: {
      type: String,
    },

    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;
