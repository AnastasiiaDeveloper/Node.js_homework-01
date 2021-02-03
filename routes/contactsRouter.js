const { Router } = require("express");
const Cont = require("./../models/contactModel");

const router = Router();

router.get("/", async (req, res) => {
  const data = await Cont.find();
  res.json(data);
});
router.get("/:contactId", async (req, res) => {
  const data = await Cont.findById(req.params.contactId);
  // console.log()
  if (data !== null) {
    res.json(data);
  } else {
    res.status(404).send({ message: "Not found" });
  }
});
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const cont = new Cont({
    name,
    email,
    phone,
  });

  if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
    // await cont.save()
    res.status(400).send({ message: "missing required name field" });
  } else {
    const data = await cont.save();
    res.status(201).send({ data });
  }
});
router.delete("/:contactId", async (req, res) => {
  const data = await Cont.findByIdAndDelete(req.params.contactId);
  console.log(data);
  if (data !== null) {
    res.status(200).send({ message: "contact deleted" });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});
router.patch("/:contactId", async (req, res) => {
  try {
    function isEmpty(obj) {
      for (let key in obj) {
        return true;
      }
      return false;
    }
    if (isEmpty(req.body) === false) {
      res.status(400).send({ message: "missing fields" });
    } else {
      const data = await Cont.findByIdAndUpdate(req.params.contactId, req.body);
      res.status(200).send({ message: data });
    }
  } catch (e) {
    res.status(404).send({ message: "Not found" });
  }
});
module.exports = router;
