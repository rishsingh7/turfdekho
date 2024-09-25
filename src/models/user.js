const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    turfArea: {
        type: String
    }
})

const OwnerModel = mongoose.model("Owner", ownerSchema)
module.exports = OwnerModel