const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OrderItemSchema = new Schema({
    productID: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number},
})
const OrderSchema = new Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item: [OrderItemSchema],
    totalAmount: {type: Number},
    status: {type: String, default: "pending"}, //Possible values: Pending, Shipped, Delivered, Cancelled
})

module.exports = mongoose.model('Order', OrderSchema)