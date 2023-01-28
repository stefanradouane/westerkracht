// Express
const express = require('express');

const router = express.Router();

const controller = require('../controllers/controllers');

const passportConfig = require('../config/passportConfig');
const passport = require('passport');

const User = require('../models/model');

passportConfig.initialize2(
    passport,
    async (email) =>
      await User.findOne({
        email,
      }),
    (id) => id
);

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
router.get('/admin/coaches', controller.control_admin_coach);

router.post('/admin/coaches', controller.control_admin_coach_post);

module.exports = router;