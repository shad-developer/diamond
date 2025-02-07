const nodemailer = require("nodemailer");

module.exports = async (email, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.PORT),
      secure: process.env.SECURE === "true",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger:true,
      debug: true,
    });
    await transporter.sendMail({
      from: `${process.env.USER}`,
      to: email,
      subject: subject,
      html: htmlTemplate,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};
