const { Router } = require("express");
const getFilesInDirectory = require("../utils/fileList");
const api = Router();
const User = require("../models/model");
const Contact = require("../models/contact");
const Inschrijving = require("../models/inschrijving");
const Coach = require("../models/coach");
const Info = require("../models/info");
const Hero = require("../models/hero");

const dbSets = [
  "contact",
  "inschrijving",
  "users",
  "coaches",
  "info",
  "hero",
  "media",
  "messages",
];

const dbTypes = (req) => {
  const types = {
    contact: {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      content: req.body.content,
      handled: req.body.handled,
    },
    inschrijving: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      coach: req.body.coach ? req.body.coach : null,
      content: req.body.content,
      handled: req.body.handled,
    },
    users: {},
    coaches: {
      name: req.body.name,
      ig: [req.body.igmain, req.body.iglift],
      content: req.body.content,
      image: req.body.image,
      link: req.body.link,
      linkTitle: req.body.linkTitle,
    },
    info: {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      image: req.body.image,
      linkTitle: req.body.linkTitle,
      link: req.body.link,
      visual: req.body.visual,
    },
    hero: {
      image: req.body.image,
      link: req.body.link,
      linkTitle: req.body.linkTitle,
    },
    media: { file: req.body.fileBase },
    messages: {},
  };

  return types[req.params.id];
};

const dbModel = {
  contact: Contact,
  inschrijving: Inschrijving,
  users: User,
  coaches: Coach,
  info: Info,
  hero: Hero,
};

const showData = async (req, res) => {
  const dbCollection = {
    contact: Contact.find(),
    inschrijving: Inschrijving.find(),
    users: User.find(),
    coaches: Coach.find(),
    info: Info.find(),
    hero: Hero.find(),
    media: getFilesInDirectory("./public/assets/images"),
    messages: [...(await Contact.find()), ...(await Inschrijving.find())],
  };
  res.status(200).json(await dbCollection[req.params.id]);
};

api.get("/", (req, res) => {
  res.json({ message: "Hello from the new api" });
});

api.get("/:id", (req, res) => {
  if (!dbSets.includes(req.params.id))
    res.status(404).json({ message: `Data not found` });
  else showData(req, res);
});

api.post("/:id", (req, res) => {
  if (!dbSets.includes(req.params.id))
    res.status(404).json({ message: `Data not found` });
  else {
    console.log(req.body);
    const body = dbTypes(req);
    const id = req.body.id;
    const method = req.body.method;

    const Type = dbModel[req.params.id];

    switch (method) {
      case "new":
        Type.create(body).then((data) => {
          showData(req, res);
        });
        break;
      case "update":
        Type.findOneAndUpdate({ _id: id }, body, { new: true }, (err, doc) => {
          if (err) throw err;
          showData(req, res);
        });
        break;
      case "remove":
        Type.findByIdAndRemove({ _id: id }, { new: true }, (err, doc) => {
          if (err) throw err;
          showData(req, res);
        });

        break;
      default:
        showData(req, res);
        break;
    }
  }
});

module.exports = api;
