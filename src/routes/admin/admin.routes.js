const {
  adminRegisterValidator,
  loginValidator,
  refreshTokenValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require("../../vaildators/auth.validators");
const { validateRequest } = require("../../middlewares/vaildate.middleware");
const {
  registerAdmin,
  loginAdmin,
  refreshToken,
  resetPassword,
  logoutAdmin,
  forgotPassword,
} = require("../../controllers/admin/admin.controller");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const express = require("express");

const router = express.Router();
router.post(
  "/register",
  adminRegisterValidator(),
  validateRequest,
  registerAdmin
);

router.post("/login", loginValidator(), validateRequest, loginAdmin);

router.post(
  "/refresh-token",
  refreshTokenValidator(),
  validateRequest,
  refreshToken
);
router.post(
  "/forget-password",
  forgetPasswordValidator(),
  validateRequest,
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPasswordValidator(),
  validateRequest,
  resetPassword
);

router.post("/logout", verifyAdminJWTToken, logoutAdmin);

module.exports = router;
