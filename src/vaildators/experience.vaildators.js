const { body, param } = require("express-validator");

const experienceCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("subtitle").notEmpty().withMessage("Subtitle is required"),
    body("description").optional().notEmpty().withMessage("About is required"),
    body("cityIds").optional().notEmpty().withMessage("City IDs are required"),
    body("stateIds")
      .optional()
      .notEmpty()
      .withMessage("State IDs are required"),
  ];
};

const experienceUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Experience ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("About cannot be empty"),
  ];
};
const experienceDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Experience ID is required")];
};
module.exports = {
  experienceCreateValidator,
  experienceUpdateValidator,
  experienceDeleteValidator,
};
