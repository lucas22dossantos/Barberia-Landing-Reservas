const nodemailer = require("nodemailer");

// Convertimos el puerto a número y ajustamos secure automáticamente
const port = Number(process.env.SMTP_PORT);
const secure = port === 465; // true si es 465, false si es 587

// Crear el transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: port,
  secure: secure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}));

// Verificar conexión (opcional, útil para depuración)
transporter.verify((error, success) => {
  if (error) {
    console.error("Error verificando SMTP:", error);
  } else {
    console.log("SMTP listo para enviar correos ✅");
  }
});

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"BlackGold Barbería" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email enviado a ${to} con éxito ✅`);
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
}

module.exports = sendEmail;
