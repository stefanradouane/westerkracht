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
    image:{
        type:String,
        required:true,  
    },
    linkTitle: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

const Hero = mongoose.model('Hero', userSchema);

module.exports = Hero;