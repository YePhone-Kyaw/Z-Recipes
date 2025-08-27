const nodemailer = require("nodemailer");
const ejs = require('ejs');

const sendEmail = ({ fileName, data, from, to, subject }) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5779666eb87085",
          pass: "ab6ee6a39a7549",
        },
      });
    
      ejs.renderFile(
        "./views/"+fileName+".ejs",
        data,
        async (error, dataString) => {
          const info = await transport.sendMail({
            from,
            to,
            subject,
            html: dataString,
          });
    
          console.log("Message sent:", info.messageId);
        }
      );
}

module.exports = sendEmail;