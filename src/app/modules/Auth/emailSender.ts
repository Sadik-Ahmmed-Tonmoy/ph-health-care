import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.emailSender.email_for_nodemailer,
      pass: config.emailSender.email_app_password_for_nodemailer,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"PH HEALTH CARE" <${config.emailSender.email_for_nodemailer}>`, // sender address
    to: email, // list of receivers
    subject: subject,
    // text: "Hello world?", // plain text body
    html
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
