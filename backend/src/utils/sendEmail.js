// utils/sendEmail.js
import { Resend } from "resend";

// Usa la API Key desde variables de entorno (mejor práctica)
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envía un correo electrónico usando Resend
 * @param {string} to - Destinatario (ej: "usuario@gmail.com")
 * @param {string} subject - Asunto del correo
 * @param {string} html - Contenido HTML del correo
 */
async function sendEmail(to, subject, html) {
  try {
    // Envía el correo
    const { error } = await resend.emails.send({
      from: "BlackGold <onboarding@resend.dev>", // o tu dominio verificado
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Error con Resend:", error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }

    console.log("✅ Email enviado con Resend a:", to);
  } catch (err) {
    console.error("💥 Error en sendEmail:", err.message);
    throw err;
  }
}

module.exports = sendEmail;
