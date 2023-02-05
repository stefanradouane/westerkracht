// const mongoose = require('mongoose');
const mongoose = require('mongoose')

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    fileUrl: {
        type: String,
        required: true,
    },
});

const Hero = mongoose.model('Hero', userSchema);

module.exports = Hero;