import mongoose from "mongoose";

export const sessionShcema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntill: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntill: {
    type: Date,
    required: true,
  },
});

const Session = mongoose.model("Session", sessionShcema);

export default Session;
