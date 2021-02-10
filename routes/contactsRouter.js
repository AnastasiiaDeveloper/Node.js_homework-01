const { Router } = require("express");
const {
  getContact,
  getIdContact,
  postContact,
  patchContact,
  deleteContact,
} = require("./../controller/contactController");
const { authenticateJWT } = require("./../middleware/auth");

const router = Router();

router.get("/", authenticateJWT, getContact);
router.get("/:contactId", authenticateJWT, getIdContact);
router.post("/", authenticateJWT, postContact);
router.delete("/:contactId", authenticateJWT, deleteContact);
router.patch("/:contactId", authenticateJWT, patchContact);
module.exports = router;
