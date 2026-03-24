import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    // =================================================
    // DEV MODE BYPASS (ONLY NON-PRODUCTION)
    // =================================================
    if (
      process.env.NODE_ENV !== "production" &&
      req.headers["x-user-id"]
    ) {
      const id = Number(req.headers["x-user-id"]);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid x-user-id"
        });
      }

      req.user = {
        sub: id,
        user_id: id
      };

      return next();
    }

    // =================================================
    // JWT AUTH
    // =================================================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    // req.user = {
    //   sub: decoded.sub,
    //   user_id: decoded.sub,
    //   email: decoded.email
    // };

    req.user = {
      sub: decoded.sub || decoded.id || decoded.user_id,
      user_id: decoded.sub || decoded.id || decoded.user_id,
      email: decoded.email,
     // role: decoded.role,
    };

    return next();
    
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}
