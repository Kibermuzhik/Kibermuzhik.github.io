const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  if (!req.cookies.userData) res.status(401).json({ Message: "Unauthorized" });
  const token = req.cookies.userData.access_token;
  if (!token) res.status(401).json({ Message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
    if (err) return res.status(403).json({ Message: "Forbidden" });

    req.user = res.user;
    next();
  });
};

module.exports = { AuthMiddleware };
