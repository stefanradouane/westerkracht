const Inschrijving = require("../../models/inschrijving");

const get = async (req, res) => {
  const inschrijvingen = await Inschrijving.find();
  res.status(200).json(inschrijvingen);
};

const post = async (req, res) => {
  if (req.body.property == "handled") {
    Inschrijving.findOneAndUpdate(
      { _id: req.body.id },
      { handled: req.body.handled },
      { new: true }
    ).exec(async () => {
      res.send(await Inschrijving.find());
    });
  } else if (req.body.property == "remove") {
    await Inschrijving.findByIdAndRemove(req.body.id, { new: true }).then(
      async (data) => {
        res.send(await Inschrijving.find());
      }
    );
  } else {
    const inschrijvingen = await Inschrijving.find();
    res.status(200).json(inschrijvingen);
  }
};

module.exports = { get, post };
