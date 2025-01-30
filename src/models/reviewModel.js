const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({
    book: {
        type: ObjectId,
        ref: "book",
        required: true
    },
    reviewedBy: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    reviewedAt:{
        type:Date,
        required:true
    },
    rating: {
        type: Number,
        minimum: 1,
        maximum: 5,
        required: true
    },
    comment: {
        type: String,   // comment is optional
        default: ""  
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('review', reviewSchema)