import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "betty.anderson47@ethereal.email",
    pass: "gt6xj5mDtq8jDARrDM",
  },
});
