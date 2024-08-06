const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CartItemSchema = new Schema({
    productID :{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    quantity:{type:Number, default:1}
},{
    timestamps: true
})
const CartSchema = new Schema({
    userId:{type :mongoose.Schema.Types.ObjectId , ref:'User'},
    item:[CartItemSchema]
},{
    timestamps:true
})

module.exports = mongoose.model('Cart' ,CartSchema)
