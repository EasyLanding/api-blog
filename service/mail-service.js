import nodemailer from 'nodemailer'
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'testapi.api@yandex.ru', // generated ethereal user
        pass: '59286877TestApi' // generated ethereal password
      }
    })
  }

  async sentActivationMail(to, link) {
    await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to,
      subject: 'Активация аккаунта ' + 'http://localhost:5000',
      text: '',
      html: `
      <div>
      <h1>Ссылка для активации</h1>
      <a href="${link}">${link}</a>
      </div>
      `
    })
  }
}
export default new MailService()
