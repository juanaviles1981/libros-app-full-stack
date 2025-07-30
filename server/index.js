import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import librosRouter from "./routes/libros.js";
import authRouter from "./routes/auth.js"; // Nueva importación

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // para parsear JSON

// Rutas
app.use("/api/auth", authRouter); // Nueva ruta de autenticación
app.use("/api/libros", librosRouter);

app.get("/", (req, res) => {
    const fecha = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    });
  
    const estadoMongo = mongoose.connection.readyState === 1 ? "🟢 Conectado" : "🔴 No conectado";
  
    res.send(`
      <h1>✅ API de Libros corriendo</h1>
      <p><strong>Fecha y hora:</strong> ${fecha}</p>
      <p><strong>MongoDB:</strong> ${estadoMongo}</p>
      <p><strong>🔐 Rutas de auth disponibles:</strong></p>
      <ul>
        <li>POST /api/auth/login</li>
        <li>GET /api/auth/verify</li>
      </ul>
    `);
  });
  
// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("Error al conectar a MongoDB:", error));