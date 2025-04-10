import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_id: process.env.JWT_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_password_token_secret: process.env.RESET_PASSWORD_TOKEN_SECRET,
    reset_password_token_expires_in: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    email_for_nodemailer: process.env.EMAIL_FOR_NODEMAILER,
    email_app_password_for_nodemailer: process.env.EMAIL_APP_PASSWORD_FOR_NODEMAILER,
  },
};
