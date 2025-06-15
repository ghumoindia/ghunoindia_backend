const { body, param } = require("express-validator");

const stateCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("subtitle").notEmpty().withMessage("Subtitle is required"),
    body("coverImage").notEmpty().withMessage("Cover image is required"),
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
