const createUser = require("../config/createUser");

const User = require('../models/model');
const Coach = require('../models/coach');
const Info = require('../models/info');
const Hero = require('../models/hero');
const getFilesInDirectory = require('../config/fileList');

const { upload } = require('../config/multer');


const fs = require('fs')

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


const control_index = async (req, res) => {
    const user = await User.findById(req.user)
    const infos = await Info.find()
    const coaches = await Coach.find()
    const hero = await Hero.find()
    const useHero = hero[0]

    res.render('pages/index', {infos, coaches, user, useHero});
};

const control_admin = async (req, res) => {
    const user = await User.findById(req.user)
    res.render('pages/admin', {user});
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

const control_admin_info = async (req, res) => {
    const info = await Info.find()
    let files;
    getFilesInDirectory('./public/assets/images').then(data => {
        files = data

        try {
            res.render('pages/admin/info', {info, files});
        } catch(err) {
            throw err
        }
    })


    
};

const control_admin_info_post = async (req, res) => {
    console.log(req.body)
    const change = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        image: req.body.image,
        linkTitle: req.body.linkTitle,
        link: req.body.link,
    }

    // console.log(change)


    
    
    try {
        Info.findByIdAndUpdate(req.body.id, change).exec(()=>{})
        // res.redirect('/admin/info');
    } catch(err) {
        throw err
    }


};

const control_admin_hero_post = async (req, res) => {
    const change = {
        fileUrl: req.body.fileUrl,
    }
    
    try {
        Hero.findByIdAndUpdate(req.body.id, change).exec(()=>{})
        // res.redirect('/admin/info');
    } catch(err) {
        throw err
    }


};



const control_admin_media = (req, res) => {
    res.render('pages/admin/media');
};

const control_admin_hero = async (req, res) => {
    const title = "Test";
    const fileType = "image";
    const fileUrl = "../assets/image";
    const fileOptions = {"options": "test", "opties": "testjes"};
    
    res.render('pages/admin/hero');
};

const control_admin_media_post = async (req, res) => {
    console.log(req)
    if(req.body.fileBase){

    fs.unlink('./public/assets/images/' + req.body.fileBase, (err) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete the file. " + err,
            });
        }
    })
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


const control_api = (req, res) => {
    getFilesInDirectory('./public/assets/images').then(data => {
        res.status(200).json(data);
    })
};

const control_api_media = (req, res) => {
    getFilesInDirectory('./public/assets/images').then(data => {
        res.status(200).json(data);
    })
};

const control_api_info = async (req, res) => {
    const info = await Info.find()
    res.status(200).json(info)
}

const control_api_hero = async (req, res) => {
    const hero = await Hero.find()
    res.status(200).json(hero)
}



module.exports = {
    control_index,
    control_api,
    control_api_media,
    control_api_info,
    control_api_hero,
    control_admin,
    control_admin_gebruikers,
    control_admin_coach,
    control_admin_info,
    control_admin_media,
    control_admin_hero,
    control_admin_hero_post,
    control_admin_media_post,
    control_newadmin,
    control_adminpost,
    control_admin_coach_post,
    control_admin_info_post,
    control_register,
    control_registerpost,
};