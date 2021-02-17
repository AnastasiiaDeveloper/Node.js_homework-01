const { Router } = require("express");
const fileMiddleware = require("./../middleware/uploadFile");
const {
  registerReq,
  loginReq,
  logoutReq,
  currentReq,
  patchReq,
  patchUpdateReq,
} = require("./../controller/userController");
const { authenticateJWT } = require("./../middleware/auth");

const router = Router();

router.post("/register", registerReq);
router.post("/login", loginReq);
router.post("/logout", authenticateJWT, logoutReq);
router.patch(
  "/avatars",
  authenticateJWT,
  fileMiddleware.single("avatar"),
  patchReq
);
router.post("/current", authenticateJWT, currentReq);
module.exports = router;
