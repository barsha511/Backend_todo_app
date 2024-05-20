const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        reuired: true,
        unique:true
    },
    password: {
        type: String,
        reuired:true
    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'List'
    }]
})
module.exports = mongoose.model("User", userSchema);