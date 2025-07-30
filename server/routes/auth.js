import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Usuario hardcodeado para pruebas
const USUARIO_PRUEBA = {
  username: "Juan",
  password: "Juan1981",
  id: 1
};

// Ruta de login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales
  if (username === USUARIO_PRUEBA.username && password === USUARIO_PRUEBA.password) {
    // Crear token JWT
    const token = jwt.sign(
      { 
        id: USUARIO_PRUEBA.id, 
        username: USUARIO_PRUEBA.username 
      },
      process.env.JWT_SECRET || "mi_clave_secreta_temporal", // En producción usar variable de entorno
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: USUARIO_PRUEBA.id,
        username: USUARIO_PRUEBA.username
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Credenciales inválidas"
    });
  }
});

// Ruta para verificar si el token es válido
router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No se proporcionó token"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mi_clave_secreta_temporal");
    res.json({
      success: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido"
    });
  }
});

export default router;