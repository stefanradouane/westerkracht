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
    ig: {
        type: Array,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Coach = mongoose.model('Coach', userSchema);

module.exports = Coach;