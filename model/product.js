const mongoose = require("mongoose");
const {model} = require("mongoose");
const Schema = mongoose.Schema


const productSchema = new Schema({
    name :{type: String},
    category:{type: mongoose.Schema.Types.ObjectId , ref: "Category", required: true},
    description:{type: String},
    price :{type: Number},
    imageUrl:{type: String},
    stock:{type: Number},
})

module.exports = mongoose.model('Product',productSchema)