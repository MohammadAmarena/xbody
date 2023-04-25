import express from "express";
import { createTransport } from "nodemailer";
import { Contacts } from "../models/contactModel";

export const sendContacts = async (
  req: express.Request,
  res: express.Response
) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_ACCOUNT_USER,
      pass: process.env.GOOGLE_MAIL_NODEMAILER_PASSWORD,
    },
  });

  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const message = req.body.message;

    const errors: string | any[] = [];
    if (errors.length === 0) {
      const user: any = new Contacts({
        firstName,
        lastName,
        phoneNumber,
        email,
        message,
      });
      user.save();

      const mailOptions = {
        from: `Fitness Studio Xbody Site <${process.env.GOOGLE_MAIL_ACCOUNT_USER}@gmail.com>`,
        to: email,
        subject: "Ihre Nachricht an Xbody",
        html: `
            <h1>Hallo ${firstName}, </h1>
            <p>vielen Dank für die Anfrage!</p>
            <p> Wir werden uns baldmöglichst bei dir melden.</p>
            <p> Liebe Grüße und bis bald,</p>
    <b> Dein Xbody-Team</b>
            <p><a href="/">Klicken Sie hier, um zrückzukehren: </a> </p>
            `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send({
        message: "user created",
        user: {
          firstName,
          lastName,
          phoneNumber,
          email,
          message,
        },
        errors,
      });
    } else {
      res.send({ message: "failed validation" });
    }
  } catch (e) {
    res.status(500).send("no access");
  }
};
