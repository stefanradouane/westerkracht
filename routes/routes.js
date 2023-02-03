// Express
const express = require('express');

const router = express.Router();

const controller = require('../controllers/controllers');

const passportConfig = require('../config/passportConfig');
const passport = require('passport');

const User = require('../models/model');

const { upload } = require('../config/multer');

passportConfig.initialize2(
    passport,
    async (email) =>
      await User.findOne({
        email,
      }),
    (id) => id
);

express().use( express.json() )



const checkLogged = passportConfig.checkAuthenticated;
const checkNotLogged = passportConfig.checkNotAuthenticated;


router.get('/', controller.control_index);
router.get('/register', controller.control_register);
router.post('/register', controller.control_registerpost);

// ADMIN

router.get('/admin', checkLogged, controller.control_admin);
router.post('/admin', checkLogged, controller.control_adminpost);

router.get('/admin/login', checkNotLogged, controller.control_newadmin);
router.post('/admin/login', checkNotLogged, passportConfig.login);

router.get('/admin/gebruikers', checkLogged, controller.control_admin_gebruikers);
router.get('/admin/coaches', checkLogged, controller.control_admin_coach);
router.get('/admin/info', checkLogged, controller.control_admin_info);
router.get('/admin/media', checkLogged, controller.control_admin_media);

router.post('/admin/coaches', checkLogged, controller.control_admin_coach_post);
router.post('/admin/info', checkLogged, controller.control_admin_info_post);

router.post('/admin/media', checkLogged, upload.single('img'), controller.control_admin_media_post);



router.get('/api', checkLogged, controller.control_api)
router.get('/api/mediabank', checkLogged, controller.control_api)

module.exports = router;