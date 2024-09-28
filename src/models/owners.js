const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    turfArea: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: 'https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg'
    }
}) 

const OwnerModel = mongoose.model("Owner", ownerSchema)
module.exports = OwnerModel