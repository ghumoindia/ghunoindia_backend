const { body, param } = require("express-validator");

const travelCalendarCreateValidator = () => {
  return [
    body("year")
      .optional()
      .withMessage("Year is required")
      .isInt({ min: 1900 })
      .withMessage("Year must be a valid number"),
    body("months")
      .notEmpty()
      .withMessage("Months data is required")
      .custom((value) => {
        if (typeof value !== "object" || Array.isArray(value)) {
          throw new Error("Months must be an object with month keys");
        }
        return true;
      }),
  ];
};

const travelCalendarUpdateValidator = () => {
  return [
    param("id").notEmpty().withMessage("Calendar ID is required"),
    body("year")
      .optional()
      .isInt({ min: 1900 })
      .withMessage("Year must be a valid number"),
    body("months")
      .optional()
      .custom((value) => {
        if (typeof value !== "object" || Array.isArray(value)) {
          throw new Error("Months must be an object with month keys");
        }
        return true;
      }),
  ];
};

const travelCalendarDeleteValidator = () => {
  return [param("id").notEmpty().withMessage("Calendar ID is required")];
};

const travelCalendarGetByIdValidator = () => {
  return [param("id").notEmpty().withMessage("Calendar ID is required")];
};

module.exports = {
  travelCalendarCreateValidator,
  travelCalendarUpdateValidator,
  travelCalendarDeleteValidator,
  travelCalendarGetByIdValidator,
};
