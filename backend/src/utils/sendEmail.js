// utils/sendEmail.js
const nodemailer = require("nodemailer");

// Crear transporter usando Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 2525,
  secure: false, // true solo para puerto 465
  auth: {
    user: process.env.GMAIL_USER, // tu correo@gmail.com
    pass: process.env.GMAIL_APP_PASS, // la App Password de 16 caracteres
  },
  tls: {
    rejectUnauthorized: false, // evita errores en algunos entornos
  },
});

/**
 * Envía un correo electrónico
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Contenido HTML
 */
async function sendEmail(to, subject, html) {
  const fromEmail = process.env.GMAIL_USER; // debe ser el mismo Gmail

  const mailOptions = {
    from: `"BlackGold Barbería" <${fromEmail}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email enviado a:", to);
  } catch (err) {
    console.error("❌ Error enviando email:", err.message);
    throw err;
  }
}

module.exports = sendEmail;
