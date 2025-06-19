const { body, param, check } = require("express-validator");

const cityCreateValidator = () => {
  return [
    check("title").notEmpty().withMessage("Title is required"),
    check("subtitle").notEmpty().withMessage("Subtitle is required"),
    check("about").notEmpty().withMessage("About is required"),
  ];
};
const cityUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("City ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
  ];
};
const cityDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("City ID is required")];
};
module.exports = {
  cityCreateValidator,
  cityUpdateValidator,
  cityDeleteValidator,
};
