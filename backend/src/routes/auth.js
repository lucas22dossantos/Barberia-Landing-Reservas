const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// =====================================================
//  LOGIN
// =====================================================
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

// =====================================================
//  FORGOT-PASSWORD
// =====================================================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requerido" });

    // Buscar usuario admin
    const { data: admin, error } = await supabase
      .from("usuarios_admin")
      .select("id, email")
      .eq("email", email)
      .single();

    if (error || !admin) {
      return res.json({
        success: true,
        message: "Si el correo existe, se envió un enlace.",
      });
    }

    // Generar token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15).toISOString();

    // Guardar token en password_resets
    const { error: insertError } = await supabase
      .from("password_resets")
      .insert({
        user_id: admin.id,
        token,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error("Error insertando token:", insertError);
      return res.status(500).json({ error: "Error guardando token" });
    }

    // Generar link y cuerpo del correo
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    const emailHtml = `
      <h2>Has solicitado un cambio de contraseña</h2>
      <p>Recibimos una solicitud para restablecer la contraseña de su cuenta. Para continuar, haga clic en el siguiente enlace:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este enlace caducará en 15 minutos.</p>
      <p>Si no solicitó este restablecimiento de contraseña, ignore este correo. Su cuenta permanece segura.</p>
      <p>Saludos cordiales, <br/> BlackGold Barbería</p>
    `;

    // Enviar correo
    try {
      await sendEmail(
        admin.email,
        "Restablecer contraseña – BlackGold Barbería",
        emailHtml
      );
    } catch (err) {
      console.error("Error enviando email:", err);
    }

    return res.json({
      success: true,
      message: "Si el correo existe, se envió un enlace.",
    });
  } catch (error) {
    console.error("Error forgot-password:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

// =====================================================
//  RESET-PASSWORD (verifica token, expira, actualiza contraseña)
// =====================================================
router.post("/reset-password", async (req, res) => {
  try {
    const { token, new_password } = req.body;

    if (!token || !new_password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Buscar token
    const { data: resetData, error } = await supabase
      .from("password_resets")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !resetData) {
      return res.status(400).json({ error: "Token inválido" });
    }

    // Verificar expiración
    if (new Date(resetData.expires_at) < new Date()) {
      return res.status(400).json({ error: "Token expirado" });
    }

    // Hashear nuevo password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Actualizar password del usuario
    const { error: updateError } = await supabase
      .from("usuarios_admin")
      .update({ password_hash: hashedPassword })
      .eq("id", resetData.user_id);

    if (updateError) {
      console.error("Error actualizando contraseña:", updateError);
      return res
        .status(500)
        .json({ error: "No se pudo actualizar la contraseña" });
    }

    // Borrar token para que no pueda reutilizarse
    await supabase.from("password_resets").delete().eq("id", resetData.id);

    return res.json({ success: true, message: "Contraseña actualizada" });
  } catch (error) {
    console.error("Error reset-password:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

// =====================================================
//  VALIDATE-RESET-TOKEN
// =====================================================
router.post("/validate-reset-token", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token requerido" });

    const { data: resetData, error } = await supabase
      .from("password_resets")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !resetData)
      return res.status(400).json({ error: "Token inválido" });
    if (new Date(resetData.expires_at) < new Date())
      return res.status(400).json({ error: "Token expirado" });

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
