const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trafficSchema = new Schema({
    websiteId:{
        type:Schema.Types.ObjectId,
        ref:"Website",
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    requestCount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Traffic", trafficSchema);