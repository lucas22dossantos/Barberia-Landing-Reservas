const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  console.error(
    "❌ ERROR FATAL: Falta RESEND_API_KEY en las variables de entorno"
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const response = await resend.emails.send({
      from: "BlackGold <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (response.error) {
      console.error("❌ Error con Resend:", response.error);
      throw new Error(`Error al enviar correo: ${response.error.message}`);
    }

    console.log("✅ Email enviado correctamente a:", to);
    return response;
  } catch (err) {
    console.error("💥 Error en sendEmail:", err);
    throw err;
  }
}

module.exports = sendEmail;
