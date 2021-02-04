const { Router } = require("express");
const {
  getContact,
  getIdContact,
  postContact,
  patchContact,
  deleteContact,
} = require("./../controller/contactController");

const router = Router();

router.get("/", getContact);
router.get("/:contactId", getIdContact);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.patch("/:contactId", patchContact);
module.exports = router;
