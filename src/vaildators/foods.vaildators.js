const { body, param } = require("express-validator");

const foodCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("subtitle").notEmpty().withMessage("Subtitle is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("cityId").optional().notEmpty().withMessage("City ID is required"),
    body("stateId").optional().notEmpty().withMessage("State ID is required"),
  ];
};
const foodUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Food ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("subtitle")
      .optional()
      .notEmpty()
      .withMessage("Subtitle cannot be empty"),
  ];
};
const foodDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Food ID is required")];
};
module.exports = {
  foodCreateValidator,
  foodUpdateValidator,
  foodDeleteValidator,
};
