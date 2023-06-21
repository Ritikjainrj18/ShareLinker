import nodeMailer from "nodemailer";
export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.service,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("send");
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};
