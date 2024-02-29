"use strict";
const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{

    const transporter=nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       type: 'OAuth2',
    //       user: process.env.SMTP_MAIL ,
    //       pass: process.env.SMTP_PASSWORD,
    //       clientId: "415645094136-t7kj489njab1lmfld8siqo0tan69e1ck.apps.googleusercontent.com",
    //       clientSecret:  "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",
    //       refreshToken:  "1//04vDgj17dMCycCgYIARAAGAQSNwF-L9IrRIWCaa5zlbrLakaQr79bb8u5evhWtPkCrvZUz8unTWQxPlemI-VluRWNgWhZIlxu8bI"
    //     }
    //   });
 
    const mailOptions ={
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions)
    // .catch((Error)=>{
    //     console.log(Error)
    // })

};

module.exports=sendEmail;