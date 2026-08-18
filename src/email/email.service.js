import { transporter } from "./email.config.js";

const emailService = {
  async send({ to, subject, text, html }) {
    return transporter.sendMail({
      from: {
        name: "Amirhossein Hashemi",
        address: "me@gmail.com",
      },
      to,
      subject,
      text,
      html,
    });
  },
};

export default emailService;
