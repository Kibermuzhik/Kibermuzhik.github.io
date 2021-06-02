const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.sendStatus(401).json({ Message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
    if (err) return res.sendStatus(403).json({ Message: "Forbidden" });

    req.user = res.user;
    next();
  });
};

module.exports = AuthMiddleware;
