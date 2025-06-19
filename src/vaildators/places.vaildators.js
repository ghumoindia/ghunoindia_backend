const { body, param } = require("express-validator");

const placeCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("subtitle").notEmpty().withMessage("Subtitle is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("cityId").optional().notEmpty().withMessage("City ID is required"),
    body("stateId").optional().notEmpty().withMessage("State ID is required"),
  ];
};
const placeUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Place ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
  ];
};
const placeDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Place ID is required")];
};
module.exports = {
  placeCreateValidator,
  placeUpdateValidator,
  placeDeleteValidator,
};
