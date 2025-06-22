const jwt = require("jsonwebtoken");

const verifyAdminJWTToken = (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    console.log("authHeader", authHeader, "token", req.cookies.accessToken);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded, "token", req.files, "req.body", req.body);
    req.admin = {
      id: decoded.id,
      role: decoded.role,
      permissions: decoded.permissions || [],
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  verifyAdminJWTToken,
};
