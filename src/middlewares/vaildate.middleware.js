const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const isAdminHaveAccess = (...roles) => {
  return (req, res, next) => {
    console.log("req.admin", req.admin);
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};

module.exports = { validateRequest, isAdminHaveAccess };
