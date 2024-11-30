const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  websiteId: {
    type: Schema.Types.ObjectId,
    ref: "Website",
  },
  type: {
    type: String,
    enum: ["email", "sms"],
    default: "email",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notify", notifySchema);
