const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Crear la aplicación de Express
const app = express();

// ===== MIDDLEWARES =====
// Permite recibir JSON en las peticiones
app.use(express.json());

// Permite que el frontend se conecte al backend
app.use(
  cors({
    origin: "http://localhost:5173", // URL donde corre tu frontend de Vite
    credentials: true,
  })
);

// ===== RUTAS =====
// Importar las rutas de autenticación
const authRoutes = require("./routes/auth");

// Registrar las rutas con el prefijo /api/auth
app.use("/api/auth", authRoutes);

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API de BlackGold Barbería funcionando correctamente",
    version: "1.0.0",
  });
});

// ===== MANEJO DE ERRORES =====
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Algo salió mal en el servidor",
  });
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("==========================================");
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log("==========================================");
});
