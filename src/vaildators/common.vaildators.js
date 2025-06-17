const { body, param, check } = require("express-validator");

const stateCreateValidator = () => {
  return [
    check("title").notEmpty().withMessage("Title is required"),
    check("subtitle").notEmpty().withMessage("Subtitle is required"),
    check("about").notEmpty().withMessage("about is required"),
  ];
};
const stateUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("State ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
  ];
};
const stateDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("State ID is required")];
};

module.exports = {
  stateCreateValidator,
  stateUpdateValidator,
  stateDeleteValidator,
};
