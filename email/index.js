const nodemailer = require('nodemailer')

exports.Kirimemail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        requireTLS:true,
        auth: {
          user: 'coffeekasela779@gmail.com',
          pass: 'adoqtochrpfctjva',
        },
      });
    return(
      transporter.sendMail(dataEmail)
        .then(info => console.log(`Email Terkirim: ${info.message}`))
        .catch(err => console.log(`Terjadi Kesalahan : ${err}`))
    )
 
}
