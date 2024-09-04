 const nodemailer = require('nodemailer')
class MailService{
    constructor(){
        this.transporter =  nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            }
        })
    }


    async sendMail( email, activationLink){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subjact: `Activation link${activationLink}`,
            html:`<div>
                <a href="${activationLink}"> Click to account activation</a>
            </div>`
            
        })

    }
}

module.exports = new MailService()