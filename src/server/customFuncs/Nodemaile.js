const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export const SendMail = async (receiver, link) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "vindao@outlook.com", // generated ethereal user
      pass: "18P14pre!" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Sabali" <vindao@outlook.com>', // sender address
    to: receiver, // list of receivers
    subject: "Sabali Email confirmation", // Subject line
    text: `Please open the following link in your browser to confirm your Email: ${link}`, // plain text body
    html: `<p>Please click <a href=${link}>here</a> to confirm your email` // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  return info;
};
