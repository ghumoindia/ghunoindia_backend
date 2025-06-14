const { body, param } = require("express-validator");

const adminRegisterValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Phone number must be 10 digits"),
    body("role")
      .optional()
      .isIn([
        "super-admin",
        "content-manager",
        "hotel-manager",
        "car-manager",
        "guide-manager",
      ])
      .withMessage("Invalid role"),
  ];
};

const loginValidator = () => {
  return [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
const refreshTokenValidator = () => {
  return [
    body("refreshToken").notEmpty().withMessage("Refresh token is required"),
  ];
};
const forgetPasswordValidator = () => {
  return [body("email").isEmail().withMessage("Valid email is required")];
};
const resetPasswordValidator = () => {
  return [
    param("token").notEmpty().withMessage("Token is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

module.exports = {
  adminRegisterValidator,
  loginValidator,
  refreshTokenValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
};
