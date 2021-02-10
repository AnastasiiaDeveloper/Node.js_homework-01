const { Router } = require("express");
const {
  registerReq,
  loginReq,
  logoutReq,
  currentReq,
} = require("./../controller/userController");
const { authenticateJWT } = require("./../middleware/auth");

const router = Router();

router.post("/register", registerReq);
router.post("/login", loginReq);
router.post("/logout", authenticateJWT, logoutReq);
router.post("/current", authenticateJWT, currentReq);
module.exports = router;
