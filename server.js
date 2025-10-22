// server.js
import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Generar imagen con OpenAI API
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, size } = req.body;
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: "gpt-image-1", prompt, n: 1, size: size || "1024x1024" }),
    });
    const json = await response.json();
    const imageBase64 = json.data?.[0]?.b64_json || null;
    if (!imageBase64) throw new Error("No se recibió imagen base64");
    res.json({ imageBase64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Enviar email con imagen adjunta
app.post("/api/send-email", async (req, res) => {
  try {
    const { toEmail, subject, htmlBody, attachmentBase64, filename } = req.body;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: toEmail,
      subject: subject || "Diseño personalizado",
      html: htmlBody || "<p>Adjuntamos tu diseño personalizado.</p>",
      attachments: [
        { filename: filename || "estampado.png", content: attachmentBase64, encoding: "base64" },
      ],
    });

    res.json({ ok: true, info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
