// const mongoose = require('mongoose');
const mongoose = require('mongoose')

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;