const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
});

const Info = mongoose.model('Info', userSchema);

module.exports = Info;