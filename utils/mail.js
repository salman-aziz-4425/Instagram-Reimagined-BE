import nodemailer from 'nodemailer'

async function mail(mail,userCredentials) {
    let transporter = nodemailer.createTransport({
         service:"gmail",
        auth: {
            user:process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        },
      });
      await transporter.sendMail({
        from: `Salman aziz <${process.env.MAIL}>`,
        to:mail, 
        subject: "Instagram Registeration",
        text: "***********Welcome to instagram************", 
        html: `<b>Your Credentials</b><br><b>Phone Number:${userCredentials.phoneNumber}</b><br><b>Password:${userCredentials.password}</b>`,
      })
    }

export default mail