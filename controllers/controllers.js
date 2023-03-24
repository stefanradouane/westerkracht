const createUser = require("../config/createUser")
const logOut = require("../config/logOut")

const User = require('../models/model');
const Coach = require('../models/coach');
const Info = require('../models/info');
const Hero = require('../models/hero');
const getFilesInDirectory = require('../config/fileList');
const Inschrijving = require("../models/inschrijving");

const {
    upload
} = require('../config/multer');


const _ = require('underscore')


const fs = require('fs');

const signedIn = () => {
    return false
}

let newAccount = false;

const isNewAccount = () => {
    if (newAccount) {
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

    res.render('pages/index', {
        infos,
        coaches,
        user,
        useHero
    });
};

const control_inschrijven = async (req, res) => {
    const coaches = await Coach.find()

    res.render('pages/inschrijven', {
        coaches,
    });
};

const control_contact = async (req, res) => {
    const coaches = await Coach.find()

    res.render('pages/contact', {
        coaches,
    });
};

const control_post_inschrijven = async (req, res) => {
    const now = new Intl.DateTimeFormat('nl-NL', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(Date.now());

    const object = {
        "name": req.body.name,
        "email": req.body.email,
        "age": req.body.age,
        "phone": req.body.phone,
        "coach": req.body.coach ? req.body.coach : null,
        "content": req.body.content,
        "date": now,
        "handled": false,
    }
    console.log(req.body)

    const newUser = await Inschrijving.create(object)
    res.redirect('/inschrijven');
};

const control_post_contact = async (req, res) => {
    // const now = new Intl.DateTimeFormat('nl-NL', {
    //     dateStyle: 'short',
    //     timeStyle: 'short'
    // }).format(Date.now());

    // const object = {
    //     "name": req.body.name,
    //     "email": req.body.email,
    //     "age": req.body.age,
    //     "phone": req.body.phone,
    //     "coach": req.body.coach ? req.body.coach : null,
    //     "content": req.body.content,
    //     "date": now,
    //     "handled": false,
    // }
    // console.log(req.body)

    // const newUser = await Inschrijving.create(object)
    res.redirect('/inschrijven');
};



const control_admin = async (req, res) => {
    const users = await User.find()
    const user = await User.findById(req.user)
    const hero = await Hero.find()
    const inschrijvingen = await Inschrijving.find()
    const currenthero = hero[0]
    res.render('pages/admin', {
        users,
        user,
        currenthero,
        inschrijvingen
    });
};

const control_admin_gebruikers = async (req, res) => {
    const user = await User.findById(req.user)
    const users = await User.find()

    try {
        res.render('pages/admin/gebruikers', {
            user,
            users
        });
    } catch (err) {
        throw err
    }

};

const control_admin_inschrijvingen = async (req, res) => {
    const user = await User.findById(req.user)
    const users = await Inschrijving.find()

    try {
        res.render('pages/admin/inschrijvingen', {
            user,
            users
        });
    } catch (err) {
        throw err
    }

};

const control_admin_coach = async (req, res) => {
    const coaches = await Coach.find()
    // console.log(coaches)

    try {
        res.render('pages/admin/coaches', {
            coaches
        });
    } catch (err) {
        throw err
    }
};

const control_admin_coach_post = async (req, res) => {
    const change = {
        name: req.body.name,
        ig: [req.body.igmain, req.body.iglift],
        content: req.body.content,
        image: req.body.image,
        link: req.body.link,
        linkTitle: req.body.linkTitle,
    }

    if(req.body.new){
        try {
            await Coach.create(change).then(async (data) => {
                console.log(data)
                res.send(await Coach.find())

            })
        } catch (error) {
            throw error
        }

    } else {
        try {
            Coach.findOneAndUpdate({
                _id: req.body.id
            }, change, {
                new: true
            }).exec(async () => {
                res.send(await Coach.find());
            })
        } catch (err) {
            throw err
        }
    }
};

const control_admin_info = async (req, res) => {
    const info = await Info.find()
    let files;
    getFilesInDirectory('./public/assets/images').then(data => {
        files = data

        try {
            res.render('pages/admin/info', {
                info,
                files
            });
        } catch (err) {
            throw err
        }
    })
};

const control_admin_info_post = async (req, res) => {
    const change = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        image: req.body.image,
        linkTitle: req.body.linkTitle,
        link: req.body.link,
    }

    try {
        Info.findOneAndUpdate({
            _id: req.body.id
        }, change, {
            new: true
        }).exec(async () => {
            res.send(await Info.find());
        })
    } catch (err) {
        throw err
    }
};

const control_admin_hero_post = async (req, res) => {
    console.log(req.body)
    const change = {
        image: req.body.fileUrl,
    }

    // try{
    //     Hero.create({
    //         "name":"hero-light",
    //         "image":"../assets/jack-hero.png",
    //         "link": "/inschrijven",
    //         "linkTitle":"Inschrijven",
    //     })
    // }

    try {
        Hero.findOneAndUpdate({
            _id: req.body.id
        }, req.body , {
            new: true
        }).exec(async () => {
            res.send(await Hero.find());
        })

    }
     catch (err) {
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
    const fileOptions = {
        "options": "test",
        "opties": "testjes"
    };

    res.render('pages/admin/hero');
};

const control_admin_media_post = async (req, res) => {
    console.log(req)
    if (req.body.fileBase) {

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

const control_api_coaches = async (req, res) => {
    const coaches = await Coach.find()
    res.status(200).json(coaches)
}

const control_logout = logOut;


module.exports = {
    control_index,
    control_inschrijven,
    control_contact,
    control_post_contact,
    control_post_inschrijven,
    control_admin_inschrijvingen,
    control_logout,
    control_api,
    control_api_media,
    control_api_info,
    control_api_hero,
    control_api_coaches,
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