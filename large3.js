const nodemailer = require("nodemailer");

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "margie.lindgren57@ethereal.email",
      pass: "1a1gfcKgM5z7fscqSD",
    },
  });
  const info = await transporter
    .sendMail({
      from: '"Dinesh <dineshveguru3@gmail.com>"',
      to: '"Dex <dineshveguru123@gmail.com>"',
      subject: "Hello",
      text: "Hi dinesh!",
      html: "<h1>Hi dinesh!</h1>",
    })
    .then(() => {
      console.log("email sent successfully!");
    })
    .catch((err) => {
      console.log("error occured: ", err);
    });
}

main();
