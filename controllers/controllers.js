const User = require("../models/model");
const Coach = require("../models/coach");
const Info = require("../models/info");
const Hero = require("../models/hero");
const Contact = require("../models/contact");
const Inschrijving = require("../models/inschrijving");

// const api = require("./api/api_controller");
const fs = require("fs");

// Default routes
const control_index = async (req, res) => {
  const user = await User.findById(req.user);
  const infos = await Info.find();
  const coaches = await Coach.find();
  const hero = await Hero.find();
  const useHero = hero[0];

  res.render("pages/index", {
    infos,
    coaches,
    user,
    useHero,
  });
};

const page_get = async (req, res) => {
  const coaches = await Coach.find();
  const pages = ["inschrijven", "contact", "login", "admin", "register"];
  const params = req.params.page;

  if (!pages.includes(params) && params) control_404(req, res);
  else if (params == "admin") control_admin(req, res);
  else {
    res.render(`pages${req.url}`, {
      coaches,
    });
  }
};

const control_post_inschrijven = (req, res) => {
  const object = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone,
    coach: req.body.coach ? req.body.coach : null,
    content: req.body.content,
    handled: false,
  };

  Inschrijving.create(object).then(() => {
    if (req.body.async) {
      res
        .status(404)
        .send({ message: "succes", ok: true, data: JSON.stringify(object) });
    } else {
      res.redirect("/inschrijven#succes");
    }
  });
};

const control_post_contact = (req, res) => {
  const object = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    content: req.body.content,
    handled: false,
  };

  Contact.create(object).then(() => {
    res.redirect("/contact#succes");
  });
};

const control_admin = async (req, res) => {
  const users = await User.find();
  const user = await User.findById(req.user);
  const hero = await Hero.find();
  const inschrijvingen = await Inschrijving.find();
  const currenthero = hero[0];
  res.render("pages/admin", {
    users,
    user,
    currenthero,
    inschrijvingen,
  });
};

const control_admin_type = (req, res) => {
  const type = req.params.type;
  const types = ["coaches", "info", "media", "hero", "inschrijvingen"];
  if (!types.includes(type)) {
    res.redirect("/admin");
  } else res.render(`pages/admin/${type}`);
};

const control_admin_media_post = async (req, res) => {
  if (req.body.fileBase) {
    fs.unlink("./public/assets/images/" + req.body.fileBase, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }
    });
  }
};

const control_404 = (req, res) => {
  res.status(404).send("404 - Page not found");
};

module.exports = {
  control_index,
  page_get,
  control_post_contact,
  control_post_inschrijven,
  control_admin,
  control_admin_type,
  control_admin_media_post,
};
