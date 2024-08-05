const Vendor = require('../models/vendorModel');

const adminCredential = {
    email: 'admin@gmail.com',
    pass: '123'
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email !== adminCredential.email || password !== adminCredential.pass) {
            res.status(400).json({ message: 'Email or Password Incorrect' })
        }

        res.status(200).json({ message: 'Login Successfully..!' })
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const vendorList = async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ _id: -1 })
        console.log(vendors);
        res.status(200).json(vendors)
    } catch (err) {
        console.log(err);
        res.status(300).json({ message: 'Internal Server Error' })
    }
}

const vendorDetails = async (req, res) => {
    try {
        const id = req.params.id
        const vendor = await Vendor.findOne({ _id: id })
        res.status(200).json(vendor)
    } catch (err) {
        res.status(300).json({ message: 'Internal Server Error' })
    }
}

const approveVendor = async (req, res) => {
    try {
        const id = req.params.id
        await Vendor.findOneAndUpdate({ _id: id }, { isApproved: true })
        res.status(200).json({ message: 'Vendor approved..!' })
    } catch (err) {
        res.status(300).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    vendorList,
    signin,
    vendorDetails,
    approveVendor,
}