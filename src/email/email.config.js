import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sasha.gleason@ethereal.email",
    pass: "gJeD75zNf4f8rcz5tB",
  },
});
