import mongoose from "mongoose";
export const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxLenght: [50, "Name cant be more than 500 letters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Yo cannot pass the number"],
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
    timestamp: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
      immutable: true,
      required: true,
    },
  },
  updatedAt: {
    timestamp: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
      immutable: true,
      required: true,
    },
  },
});

export const contact = mongoose.model("contact", contactSchema);
