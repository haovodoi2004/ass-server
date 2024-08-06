const express = require('express');
const router = express.Router();
const Upload = require('../common/upload')

//Model
const User = require('../model/user');
const Category = require('../model/category');
const Cart = require('../model/cart');
const Product = require('../model/product');
const Order = require('../model/order');
const mongoose = require("mongoose");
//////////////////////////////////////////////////////


///User API///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Đăng nhập
router.post('/user/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email, password})
        if (user) {
            res.status(200).json({
                "status": 200,
                "messenger": "List all category",
                "data": user
            })
        } else {
            res.status(500)
        }

    } catch (err) {
        console.log("User login :" + err)

    }
})
//Đăng ký
router.post('/user/register', Upload.single('avatar'), async (req, res) => {
    try {
        const {file} = req;
        const data = req.body;
        const image = `/uploads/${file.filename}`
        const {name, email, password} = req.body;
        const user = new User({
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: image,
            address: data.address,
        });
        await user.save()
        res.status(200).json({message: "User registered successfully"})
    } catch (err) {
        console.log("User register :" + err)
        res.status(500).json({message: "User register failed"})
    }
})
//Cập nhật
router.put('/user/update/:id', Upload.single('avatar'), async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const {file} = req;
        const avatar = `/uploads/${file.filename}`
        const user = await User.findById(id)
        if (user) {
            user.name = data.name ?? user.name;
            user.email = data.email ?? user.email;
            user.password = data.password ?? user.password;
            user.address = data.address ?? user.address;
            user.avatar = avatar ?? user.avatar;
        }
        let result = null
        result = await user.save()
        if (result) {
            res.status(200).json({message: "User updated successfully" + user})
            console.log(data)
        } else {
            res.status(500).json({message: "User update failed"})
        }
    } catch (err) {
        console.log("User update " + err)
    }
})
router.get('/user/get/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const data = await User.findById(id)
        if (data) {
            res.status(200).json({
                "status": 200,
                "message": "List user",
                "data": data
            })
        }
    }catch (err){
        console.log(err)
    }

})
// Category API///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Thêm Category
router.post('/category/add', async (req, res) => {
    try {
        const data = req.body;
        const category = await new Category({
            name: data.name, description: data.description,
        })
        let result = await category.save()
        if (result) {
            res.status(200).json({message: "Category added successfully"})
        } else {
            res.status(500).json({message: "Category added failed"})
        }
    } catch (err) {
        console.log("Category added :" + err)
    }
})
//Xóa Category
router.delete('/category/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        const category = await Category.findOneAndDelete(id)
        if (category) {
            res.status(200).json({message: "Category deleted successfully"})
        } else {
            res.status(500).json({message: "Category deleted failed"})
        }
    } catch (err) {
        console.log("User delete :" + err)
    }
})
//Get all Category
router.get('/category', async (req, res) => {
    try {
        const data = await Category.find()
        if (data) {
            res.status(200).json({
                "status": 200,
                "messenger": "List all category",
                "data": data
            })
        } else {
            res.status(500).json({message: "Category list not found"})
        }
    } catch (err) {
        console.log("Get all categories failed:" + err)
    }
})

//Product API///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Thêm product
router.post('/product/add', Upload.single('imageUrl'), async (req, res) => {
    try {
        const data = req.body;
        const {file} = req;
        const image = `/uploads/${file.filename}`
        const product = await new Product({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            imageUrl: image,
            stock: data.stock,
        })
        let result = await product.save()
        if (result) {
            res.status(200).json({message: "Product added successfully"})
        } else {
            res.status(500).json({message: "Product added false"})
        }
    } catch (err) {
        console.log("Add product : " + err)
    }

})
//Get All product
router.get('/product/getAll', async (req, res) => {
    try {
        const data = await Product.find();
        if (data) {
            res.status(200).json({
                "status": 200,
                "messenger": "List all product",
                "data": data
            })
        } else {
            res.status(400).json({data})
        }
    } catch (err) {
        console.log("Get all products failed:" + err)
    }
})
//Get by id
router.get('/product/find/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Product.findById(id);
        if (data) {
            res.status(200).json({
                "status": 200,
                "messenger": "List all product",
                "data": data
            })
        } else {
            res.status(400).json({data})
        }
    } catch (err) {
        console.log("Get products by ID failed" + err)
    }
})
//Get by category id
router.get('/product/findByCate/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Product.find({category: id});
        if (data) {
            res.status(200).json({
                "status": 200,
                "messenger": "List all product",
                "data": data
            })
        } else {
            res.status(400).json({data})
        }
    } catch (err) {
        console.log("Get products by ID failed" + err)
    }
})
//Search by name
router.get('/product/search/', async (req, res) => {
    try {
        const {name} = req.query;
        const products = await Product.find({name: {$regex: name, $options: 'i'}});
        res.status(200).json({
            "status": 200,
            "messenger": "List all product",
            "data": products
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
//Delete by id
router.delete('/product/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Product.findOneAndDelete(id);
        if (result) {
            res.status(200)
        } else {
            res.status(500)
        }
    } catch (err) {
        console.log("Delete product false :" + err)
    }
})
//Update
router.put('/product/update/:id', Upload.single('imageUrl'), async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body;
        const {file} = req;
        const image = `/uploads/${file.filename}`
        // const product = await new Product({
        //     name: data.name,
        //     category: data.category,
        //     description: data.description,
        //     price: data.price,
        //     imageUrl: image,
        //     stock: data.stock,
        // })
        const product = await Product.findById(id)
        if (product) {
            product.name = data.name ?? product.name;
            product.category = data.category ?? product.category;
            product.description = data.description ?? product.description;
            product.price = data.price ?? product.price;
            product.imageUrl = image ?? product.imageUrl;
            product.stock = data.stock ?? product.stock;
        }
        let result = await product.save()
        if (result) {
            res.status(200).json({
                status:200,
                message:"Update prod",
                data:result

            })
        } else {
            res.status(500).json({message: "Product Update false"})
        }
    } catch (err) {
        console.log("Add product : " + err)
    }

})
///Cart Api///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Add sp vao gio hang (id User)
router.post('/cart', async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        let cart = await Cart.findOne({userId});
        if (!cart) {
            cart = new Cart({userId, items: []});
        }

        const cartItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (cartItemIndex >= 0) {
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            cart.items.push({productId, quantity});
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
//Xem gio hang = user id
router.get('/cart/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const cart = await Cart.findOne({userId}).populate('items.productId');
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// xóa sp trong giỏ hàng
router.delete('/cart/:userId/:productId', async (req, res) => {
    try {
        const {userId, productId} = req.params;
        let cart = await Cart.findOne({userId});

        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        const cartItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (cartItemIndex >= 0) {
            cart.items.splice(cartItemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({message: 'Product not found in cart'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// Đặt hàng
router.post('/order', async (req, res) => {
    try {
        const {userId, item, totalAmount} = req.body;
        const order = new Order({userId, item, totalAmount});
        await order.save();
        res.status(201).json({message: 'Order placed successfully', order});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
//Quản lý đơn
router.get('/orders/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        // Tìm kiếm tất cả các đơn hàng theo userID
        const orders = await Order.find({userId});

        if (!orders || orders.length === 0) {
            return res.status(404).json({message: 'No orders found'});
        }

        // Tạo danh sách chứa các productID
        const productIDs = orders.reduce((acc, order) => {
            order.item.forEach(item => {
                acc.push(item.productID);
            });
            return acc;
        }, []);

        res.status(200).json({
            status: 200,
            message: "List of all product IDs",
            data: productIDs
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router