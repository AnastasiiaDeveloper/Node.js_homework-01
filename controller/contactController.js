const Cont = require("./../models/contactModel");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
});
const schemaId = Joi.object({
  id: Joi.objectId(),
});
const getContact = async (req, res) => {
  try {
    const data = await Cont.find();
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};
const getIdContact = async (req, res) => {
  try {
    const data = await Cont.findById(req.params.contactId);
    // console.log()
    if (data !== null) {
      res.json(data);
    }
  } catch (e) {
    res.status(404).send({ message: "Not found" });
  }
};
const postContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await schema.validateAsync(req.body);

    const cont = new Cont({
      name,
      email,
      phone,
    });

    const data = await cont.save();
    res.status(201).send({ data });
  } catch (e) {
    res.status(400).send({ message: "missing required name field" });
  }
};
const deleteContact = async (req, res) => {
  try {
    const id = await schemaId.validateAsync({ id: req.params.contactId });
    const data = await Cont.findByIdAndDelete(id.id);
    console.log(id);
    if (data !== null) {
      res.status(200).send({ message: "contact deleted" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "Not found" });
  }
};
const patchContact = async (req, res) => {
  try {
    const dataValidate = await schema.validateAsync(req.body);

    const data = await Cont.findByIdAndUpdate(
      req.params.contactId,
      dataValidate
    );

    res.status(200).send({ message: data });
  } catch (e) {
    res.status(400).send({ message: "missing fields" });
  }
};
exports.getContact = getContact;
exports.getIdContact = getIdContact;
exports.postContact = postContact;
exports.patchContact = patchContact;
exports.deleteContact = deleteContact;
