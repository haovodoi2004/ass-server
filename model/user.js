const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String ,default:""},
    address:{type :String,default:""}
}, {
    timestamps: true
})


module.exports = mongoose.model('User', UserSchema)