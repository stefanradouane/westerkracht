const Contact = require("../../models/contact");

const get = async (req, res) => {
  const inschrijvingen = await Contact.find();
  res.status(200).json(inschrijvingen);
};

const post = async (req, res) => {
  if (req.body.property == "handled") {
    Contact.findOneAndUpdate(
      { _id: req.body.id },
      { handled: req.body.handled },
      { new: true }
    ).exec(async () => {
      res.send(await Contact.find());
    });
  } else if (req.body.property == "remove") {
    await Contact.findByIdAndRemove(req.body.id, { new: true }).then(
      async (data) => {
        res.send(await Contact.find());
      }
    );
  } else {
    const inschrijvingen = await Contact.find();
    res.status(200).json(inschrijvingen);
  }
};

module.exports = { get, post };
