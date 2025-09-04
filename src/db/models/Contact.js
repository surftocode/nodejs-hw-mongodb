import mongoose from "mongoose";
export const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLenght: [50, "Name cant be more than 500 letters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "You cannot pass the number"],
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collections: "contacts",
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
