const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Crear app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);

// Ruta test
app.get("/", (req, res) => {
  res.json({ message: "OK", version: "1.0.0" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
