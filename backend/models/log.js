const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  websiteId: {
    type: Schema.Types.ObjectId,
    ref: "Website",
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  fcp:{
    type: Number,
  },
  lcp:{
    type: Number,
  },
  message:{
    type: String,
  },
  checkedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);