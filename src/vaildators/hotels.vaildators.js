const { body, param } = require("express-validator");

const hotelCreateValidator = () => {
  return [
    body("name").notEmpty().withMessage("Hotel name is required"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
    body("about").optional().notEmpty().withMessage("About cannot be empty"),
    body("stateIds")
      .optional()
      .isArray()
      .withMessage("State IDs must be an array"),
  ];
};

const hotelUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Hotel ID is required"),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Hotel name cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
    body("about").optional().notEmpty().withMessage("About cannot be empty"),
  ];
};

const hotelDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Hotel ID is required")];
};

module.exports = {
  hotelCreateValidator,
  hotelUpdateValidator,
  hotelDeleteValidator,
};
