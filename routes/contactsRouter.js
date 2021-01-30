const { Router } = require("express");
const cont = require("./../models/contacts");

const router = Router();

router.get("/", async (req, res) => {
  const data = await cont.listContacts();
  res.json(data);
});
router.get("/:contactId", async (req, res) => {
  const data = await cont.getContactById(req.params.contactId);
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(404).send({ message: "Not found" });
  }
});
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const data = await cont.addContact(name, email, phone);
  if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
    res.status(400).send({ message: "missing required name field" });
  } else {
    res.status(201).send({ data });
  }
});
router.delete("/:contactId", async (req, res) => {
  const data = await cont.removeContact(req.params.contactId);

  if (data) {
    res.status(200).send({ message: "contact deleted" });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});
router.patch("/:contactId", async (req, res) => {
  const data = await cont.updateContact(req.params.contactId, req.body);
  //   res.json(data);
  if (data.inf) {
    res.status(200).send(data.obj);
  } else {
    res.status(404).send({ message: data.message });
  }
});
module.exports = router;
