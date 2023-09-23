const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const registerController = asyncHandler(async (req, res) => {

    const {name, email, image} = req.body;

    if (!name || !email || !image)
    {
        res.status(400)
        // res.json({success: false, message: 'Please fill all the fields'});
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({email});

    if (userExists)
    {
        res.status(400)
        // res.json({success: false, message: 'User already exists'});
        throw new Error('User already exists');
    }

    const User = await User.create({
        name,
        email,
        image
    });

    if (User)
    {
        res.status(200).json({
            success: true,
            _id: User._id,
            name: User.name,
            email: User.email,
            message: "Registeration Successful",
            token: generateToken(User._id)
        });
    }

    else
    {
        res.status(400)
        // res.json({success: false, message: 'Invalid user data'});
        throw new Error('Invalid user data');
    }
});


const loginController = asyncHandler(async (req, res) => {
    
    const {email, image} = req.body;

    if (!email || !image)
    {
        res.status(400)
        // res.json({success: false, message: 'Please fill all the fields'});
        throw new Error('Please fill all the fields');
    }

    const User = await User.findOne({email});

    if (!User)
    {
        res.status(401)
        // res.json({success: false, message: 'Invalid Credentials'});
        throw new Error('User not found');
    }

    if (User)
    {
        res.status(200).json({
            success: true,
            _id: User._id,
            name: User.name,
            email: User.email,
            message: "Login Successful",
            token: generateToken(User._id)
        });
    }

    else
    {
        res.status(401)
        // res.json({success: false, message: 'Invalid Credentials'});
        throw new Error('Invalid Credentials');
    }
});


const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}


module.exports = {loginController, registerController};