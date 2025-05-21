import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
      unique: [true, "Phone number already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
