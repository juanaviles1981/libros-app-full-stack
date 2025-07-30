import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. No se proporcionó token."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mi_clave_secreta_temporal");
    req.user = decoded; // Agregar info del usuario al request
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token inválido"
    });
  }
};