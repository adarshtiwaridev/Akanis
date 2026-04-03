import nodemailer from 'nodemailer'

const smtpUser = process.env.SMTP_USER || process.env.MAIL_USER
const smtpPass = process.env.SMTP_PASS || process.env.MAIL_PASS
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
const smtpPort = Number(process.env.SMTP_PORT || 587)

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
})

export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"Contact" <${smtpUser}>`,
    to,
    subject,
    html,
  })
}
