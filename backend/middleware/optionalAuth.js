const jwt = require("jsonwebtoken");

const optionalAuth = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (_error) {
    // Ignore invalid token for optional auth routes.
  }

  return next();
};

module.exports = optionalAuth;

