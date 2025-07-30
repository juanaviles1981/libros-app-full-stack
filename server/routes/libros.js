import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import Libro from "../models/Libro.js";

const router = express.Router();

// Todas las rutas de libros ahora requieren autenticación
router.use(authenticateToken);

// GET /api/libros - Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    console.log(`Usuario ${req.user.username} está obteniendo libros`);
    
    const libros = await Libro.find();
    console.log(`Se encontraron ${libros.length} libros en la base de datos`);
    
    res.json(libros);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ message: "Error al obtener libros", error });
  }
});

// POST /api/libros - Crear nuevo libro  
router.post("/", async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    
    console.log("Usuario que crea el libro:", req.user.username);
    console.log("Datos del libro:", { title, author, genre });
    
    if (!title || !author || !genre) {
      return res.status(400).json({
        message: "Todos los campos son requeridos"
      });
    }
    
    const nuevoLibro = new Libro({
      title,
      author, 
      genre
    });
    
    const libroGuardado = await nuevoLibro.save();
    console.log("Libro guardado exitosamente:", libroGuardado);
    
    res.status(201).json(libroGuardado);
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ message: "Error al crear libro", error });
  }
});

export default router;