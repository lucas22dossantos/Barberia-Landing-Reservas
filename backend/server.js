const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Crear la aplicación de Express
const app = express();

// ===== MIDDLEWARES =====
app.use(express.json());

// Configuración de CORS para producción y desarrollo
const allowedOrigins = [
  "http://localhost:5173", // desarrollo
  "https://barberia-rho-seven.vercel.app", // frontend en Vercel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (ej. Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "La política de CORS no permite este origen";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ===== RUTAS =====
const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);

// Ruta de prueba
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
    error: err.message || "Algo salió mal en el servidor",
  });
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("==========================================");
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log("==========================================");
});
