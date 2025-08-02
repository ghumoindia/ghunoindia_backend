const { body, param } = require("express-validator");

const activityCreateValidator = () => [
  body("name").notEmpty().withMessage("Activity name is required"),
  body("description").optional().isString(),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("duration").optional().isString(),
  body("activityType")
    .optional()
    .isIn(["outdoor", "indoor", "virtual"])
    .withMessage("Invalid activity type"),
  body("stateId")
    .optional()
    .isMongoId()
    .withMessage("State ID must be a valid Mongo ID"),
];

const activityUpdateValidator = () => [
  param("id").isMongoId().withMessage("Valid activity ID is required"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Activity name cannot be empty"),
  body("description").optional().isString(),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("duration").optional().isString(),
  body("activityType")
    .optional()
    .isIn(["outdoor", "indoor", "virtual"])
    .withMessage("Invalid activity type"),
  body("stateId")
    .optional()
    .isMongoId()
    .withMessage("State ID must be a valid Mongo ID"),
];

const activityDeleteValidator = () => [
  param("id").isMongoId().withMessage("Valid activity ID is required"),
];

module.exports = {
  activityCreateValidator,
  activityUpdateValidator,
  activityDeleteValidator,
};
