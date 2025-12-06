const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const { error } = await resend.emails.send({
      from: "BlackGold <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Error con Resend:", error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }

    console.log("✅ Email enviado a:", to);
  } catch (err) {
    console.error("💥 Error en sendEmail:", err);
    throw err;
  }
}

module.exports = sendEmail;
