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
// Add checklogged middleware function
router.get('/admin', controller.control_admin);
router.post('/admin', checkLogged, controller.control_adminpost);

router.get('/admin/login', checkNotLogged, controller.control_newadmin);
router.post('/admin/login', checkNotLogged, passportConfig.login);

router.get('/admin/gebruikers', checkLogged, controller.control_admin_gebruikers);
router.get('/admin/coaches', controller.control_admin_coach);

// Add checklogged middleware function
router.get('/admin/info', controller.control_admin_info);
router.get('/admin/media', checkLogged, controller.control_admin_media);
router.get('/admin/hero', controller.control_admin_hero);






// Add checklogged middleware function
router.post('/admin/coaches', controller.control_admin_coach_post);
router.post('/admin/info', controller.control_admin_info_post);
router.post('/admin/hero', controller.control_admin_hero_post);

router.post('/admin/media', checkLogged, upload.single('img'), controller.control_admin_media_post);



router.get('/api', checkLogged, controller.control_api)

// Add checklogged middleware function
router.get('/api/info', controller.control_api_info)
router.get('/api/media', controller.control_api_media)
router.get('/api/hero', controller.control_api_hero)
router.get('/api/coaches', controller.control_api_coaches)

router.delete('/logout', controller.control_logout);

module.exports = router;