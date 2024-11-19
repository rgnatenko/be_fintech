import { Transporter, createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../exceptions/logger';
dotenv.config();

class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Account activation in ruslana's app.",
        html: `
           <div>
             <h1>Follow the link for account activation</h1>
             <a href="${link}">${link}</a>
           </div>
          `,
      });
    } catch (e) {
      logger.error(e);
    }
  }
}

export default new MailService();
