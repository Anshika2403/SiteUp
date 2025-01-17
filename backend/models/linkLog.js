const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    websiteId: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },
    link:{
        type: String,
        required: true
    },
    
        responseTime: {
            type: Number,
            required: true
        },
    message: {
        type: String,
    },
    fcp: {
        type: Number,
        required: true
    },
    lcp: {
        type: Number,
    },
    checkedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LinkLog', linkSchema);