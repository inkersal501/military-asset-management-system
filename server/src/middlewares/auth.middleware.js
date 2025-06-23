import jwt from "jsonwebtoken";
import config from "../config/config.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ error: "Access denied" });
  next();
};
export default { verifyToken, requireRole };
