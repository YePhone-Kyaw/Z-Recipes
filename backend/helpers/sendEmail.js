const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ fileName, data, from, to, subject }) => {
  try {
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,  
          pass: process.env.MAIL_PASS,
        },
      });
    
     const dataString = await ejs.renderFile("./views/" + fileName + ".ejs", data);
        const info = await transport.sendMail({
          from,
          to,
          subject,
          html: dataString,
        });
        console.log("Message sent:", info.messageId);
  } catch (error) {
    throw new Error("Error at sending message.", error);
  }
};

module.exports = sendEmail;
