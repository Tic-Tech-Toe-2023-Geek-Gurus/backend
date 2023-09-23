const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        unique: true,
        trim: true
    },
    vector: {
        type: [Number],
        required: true,
        unique: true,
        
    }
   
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;