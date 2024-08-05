const Vendor = require('../models/vendorModel');
const bcrypt = require('bcrypt');
const Product = require('../models/productModel');

const securepassword = async (password) => {
    try {
        const securepassword = await bcrypt.hash(password, 10)
        return securepassword
    } catch (err) {
        console.log(err.message);
    }
}

const sample = async (req, res) => {
    console.log('This is Catchy Server');
    res.send('This is catchy server')
}

const signup = async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body
        const userData = await Vendor.findOne({ email });

        if (userData) {
            return res.status(400).json({ message: 'Already registered, Please login..!' })
        }

        if (!password == cpassword) {
            return res.status(400).json({ message: `Password doesn't match` })
        }

        const spass = await securepassword(password)
        const newUser = new Vendor({
            username,
            email,
            password: spass
        })
        await newUser.save();
        return res.status(201).json({ message: 'Registration Success, Please wait for admin approval to login' })
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await Vendor.findOne({ email });

        if (!userData) {
            return res.status(401).json({ message: 'User not found' });
        }

        const pass = await bcrypt.compare(password, userData.password)

        if (!pass) {
            return res.status(400).json({ message: 'Email or password incorrect' });
        }

        if (!userData.isApproved) {
            return res.status(400).json({ message: 'Approval Pending..' })
        }

        res.status(200).json({ message: 'Login Successfully..!' })
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, description, price, quantity } = req.body
        const file = req.file.filename

        const newPro = new Product({
            title,
            description,
            image: file,
            price,
            quantity
        })
        await newPro.save()
        res.status(201).json({ message: 'Product created..!' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 })
        res.status(201).json(products)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    signup,
    signin,
    addProduct,
    getProducts,
    sample
}