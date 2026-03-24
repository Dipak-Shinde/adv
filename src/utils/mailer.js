import nodemailer from "nodemailer";

/* EMAIL TRANSPORT */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/* SEND EMAIL FUNCTION */
export async function sendEmail(to, subject, html) {

  try {

    const info = await transporter.sendMail({
      from: `"Auth System" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("✅ EMAIL SENT:", info.messageId);

  } catch (error) {

    console.error("❌ EMAIL ERROR:", error);

  }
}