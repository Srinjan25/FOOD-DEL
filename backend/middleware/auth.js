import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Attach user info to req
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token, authorization denied"
    });
  }
};

export default authMiddleware;
