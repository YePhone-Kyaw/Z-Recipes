const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ fileName, data, from, to, subject }) => {
  try {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5779666eb87085",
          pass: "ab6ee6a39a7549",
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
