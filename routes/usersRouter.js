const { Router } = require("express");
const fileMiddleware = require("./../middleware/uploadFile");
const {
  registerReq,
  loginReq,
  logoutReq,
  currentReq,
  patchReq,
} = require("./../controller/userController");
const { authenticateJWT } = require("./../middleware/auth");

const router = Router();

router.post("/register", registerReq);
router.post("/login", loginReq);
router.post("/logout", authenticateJWT, logoutReq);
router.patch("/avatars", authenticateJWT, patchReq);
router.post(
  "/current",
  authenticateJWT,
  fileMiddleware.single("avatar"),
  currentReq
);
module.exports = router;
