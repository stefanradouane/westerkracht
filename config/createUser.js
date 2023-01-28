const bcrypt = require("bcrypt");
const User = require("../models/model")


async function createUser(user) {
    const { 
        name,
        email,
        password    
    } = user

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = false

    try {
        const newUser = await User.create({
            name,
            admin,
            hashedPassword,
            email,
        }) 
    } catch (err) {
        throw err
    }
}

module.exports = createUser