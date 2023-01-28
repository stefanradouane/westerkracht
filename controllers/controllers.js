const createUser = require("../config/createUser");

const User = require('../models/model');
const Coach = require('../models/coach');


const signedIn = () => {
    return false   
}

let newAccount = false;

const isNewAccount = () => {
    if(newAccount){
        return newAccount;
    }
    return false   
}



const control_index = (req, res) => {
    res.render('pages/index');
};

const control_admin = (req, res) => {
    res.render('pages/admin');
};

const control_admin_gebruikers = async (req, res) => {
    const users = await User.find()
    console.log(users)

    try {
        res.render('pages/admin/gebruikers', {users});
    } catch(err) {
        throw err
    }

};

const control_admin_coach = async (req, res) => {
    const coaches = await Coach.find()
    // console.log(coaches)

    try {
        res.render('pages/admin/coaches', {coaches});
    } catch(err) {
        throw err
    }
};

const control_admin_coach_post = async (req, res) => {
    console.log(req.body)
    const change = {
        name: req.body.name,
        ig: req.body.ig,
        content: req.body.content,
    }
    await Coach.findByIdAndUpdate(req.body.id, change).exec(()=>{})
    
    try {
        res.redirect('/admin/coaches');
    } catch(err) {
        throw err
    }
};





const control_adminpost = (req, res) => {
    console.log(req.body)
    res.redirect('admin');
};

const control_newadmin = (req, res) => {
    res.render('pages/login');
};



const control_register = (req, res) => {
    res.render('pages/register');
};

const control_registerpost = (req, res) => {
    createUser(req.body)
    newAccount = false
    // console.log(req.body)
    res.render('pages/login');
};



module.exports = {
    control_index,
    control_admin,
    control_admin_gebruikers,
    control_admin_coach,
    control_newadmin,
    control_adminpost,
    control_admin_coach_post,
    control_register,
    control_registerpost,
};