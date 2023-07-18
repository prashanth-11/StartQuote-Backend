const router = require("express").Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const dummyjson = require("dummy-json");


router.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // console.log(req.body);
  // return res.send(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mrcoolpk8055@gmail.com", //pandu email
      pass: "sdfndhumsmeyqxsv", //pandu password
    },
  });

  const mailOptions = {
    from: email,
    to: "mrcoolpk8055@gmail.com", //pandu email
    subject: "New Contact Form Submission",
    html: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      <h1>Hello</h1>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("DEV2 ERROR: - ", error);
      res.status(500).json({ success: false, message: "Error sending mail!!" });
    } else {
      console.log("Email Sent!!", info.response);
      res
        .status(200)
        .json({ success: true, message: "Email Sent successfully!!" });
    }
  });
});

router.get("/quotes", (req, res) => {
  const users = JSON.parse(fs.readFileSync("quotes.json")).quotes;
  // res.render("listAllUsers", {data:users});
  return res.json({ data: users });
});
module.exports = router;
