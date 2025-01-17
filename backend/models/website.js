const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  notifyType:{
    type: String,
    enum: ["email", "sms", "both"],
    default: "email",
  },
  status: {
    type: String,
    enum: ["online", "offline", "unknown"],
    default: "unknown",
  },
  interval: {
    type: Number,
    default: 2,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  monitoringActive: {
    type: Boolean,
    default: true,
  },
  analyticsId:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Website", websiteSchema);
