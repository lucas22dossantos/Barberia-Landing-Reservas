const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y contraseña son requeridos",
      });
    }

    // Buscar el usuario admin por email
    const { data: admin, error } = await supabase
      .from("usuarios_admin")
      .select("*")
      .eq("email", email)
      .single();

    console.log("RESULTADO DE SUPABASE:", { admin, error });

    if (error || !admin) {
      return res.status(401).json({
        error: "Credenciales incorrectas",
      });
    }

    // LOGS IMPORTANTES
    console.log("PASSWORD ENVIADO:", password);
    console.log("HASH EN BD:", admin.password_hash);

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    console.log("¿COINCIDE?:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Credenciales incorrectas",
      });
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        nombre: admin.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        nombre: admin.nombre,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      error: "Error del servidor",
    });
  }
});

module.exports = router;
