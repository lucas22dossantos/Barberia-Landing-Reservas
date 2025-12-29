const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// =====================================================
//  ENVIAR CONFIRMACIÓN POR CORREO
// =====================================================
router.post("/enviar-confirmacion", async (req, res) => {
  try {
    const { email, nombre, servicio, barbero, fecha, hora } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email es requerido" });
    }

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
        <h2 style="color: #bfa16a; text-align: center;">¡Cita Confirmada!</h2>
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>Tu cita en <strong>BlackGold Barbería</strong> ha sido agendada con éxito. Aquí tienes los detalles:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Servicio:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${servicio}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Barbero:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${barbero}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Fecha:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${fecha}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Hora:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${hora}</td>
          </tr>
        </table>

        <div style="background: #fdf6e7; padding: 15px; border-radius: 8px; color: #856404; font-size: 14px;">
          <strong>Recuerda:</strong> Si no puedes asistir, por favor infórmanos con al menos 3 horas de antelación.
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
          Av. Principal 123, Ciudad | +54 3765 000000<br/>
          BlackGold Barbería
        </p>
      </div>
    `;

    await sendEmail(
      email,
      "Confirmación de tu reserva – BlackGold Barbería",
      emailHtml
    );

    res.json({ success: true, message: "Email de confirmación enviado" });
  } catch (error) {
    console.error("Error enviando confirmación:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

module.exports = router;
