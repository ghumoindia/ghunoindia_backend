const { body, param } = require("express-validator");

const destinationCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("stateName").notEmpty().withMessage("state name is required"),
    body("subtitle").notEmpty().withMessage("Subtitle is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("cityIds").optional().notEmpty().withMessage("City IDs are required"),
    body("stateIds")
      .optional()
      .notEmpty()
      .withMessage("State IDs are required"),
  ];
};

const destinationUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Destination ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
    body("about").optional().notEmpty().withMessage("About cannot be empty"),
  ];
};

const destinationDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Destination ID is required")];
};

module.exports = {
  destinationCreateValidator,
  destinationUpdateValidator,
  destinationDeleteValidator,
};
