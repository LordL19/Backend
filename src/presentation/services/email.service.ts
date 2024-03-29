import { createTransport, Transporter } from "nodemailer";

interface attachments {
    filename: string,
    path: string
}

interface SendEmailOptions<T> {
    from?: string
    to: T,
    subject: string,
    html: string,
    attachments?: attachments[]
}

export class EmailService {
    private readonly transport: Transporter
    constructor(
        private readonly mailerService: string,
        private readonly mailerEmail: string,
        private readonly mailerKey: string,
    ) {
        this.transport = createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerKey
            }
        })
    }

    async sendEmail(options: SendEmailOptions<string>): Promise<boolean> {
        const { from = this.mailerEmail, to, subject, html, attachments = [] } = options
        try {
            await this.transport.sendMail({
                from,
                to,
                subject,
                html,
                attachments
            })
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async sendEmails(options: SendEmailOptions<string[]>) {
        const { to } = options;
        to.forEach(async email => {
            await this.sendEmail({ ...options, to: email });
        });
    }
}