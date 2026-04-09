import { Router } from "express";
import sgMail from "@sendgrid/mail";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const { name, company, email, phone, message, lang } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  sgMail.setApiKey(apiKey);

  const subjectLine =
    lang === "fr"
      ? `Nouvelle demande de contact — ${name}${company ? ` (${company})` : ""}`
      : `New contact request — ${name}${company ? ` (${company})` : ""}`;

  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #E5E5E5; padding: 40px; border: 1px solid #2a2a2a;">
      <div style="border-bottom: 1px solid #C9A96E; padding-bottom: 24px; margin-bottom: 32px;">
        <h1 style="font-size: 24px; color: #C9A96E; margin: 0 0 8px;">Solution TGV</h1>
        <p style="color: #888; margin: 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Contact Request</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-size: 15px;">${name}</td>
        </tr>
        ${company ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-size: 15px;">${company}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-size: 15px;"><a href="mailto:${email}" style="color: #C9A96E;">${email}</a></td>
        </tr>
        ${phone ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-size: 15px;">${phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
          <td style="padding: 12px 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    await sgMail.send({
      to: "request@tgvsolution.ca",
      from: "noreply@tgvsolution.ca",
      replyTo: email,
      subject: subjectLine,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("SendGrid error:", err?.response?.body ?? err);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default contactRouter;
