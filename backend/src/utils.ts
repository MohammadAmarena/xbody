import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel';
import mg from 'mailgun-js';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(6, authorization.length); // Belal XXXXXX
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    );
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    } as any;
    next();
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  } as any);

export const payOrderEmailTemplate = (order: any) => {
  return `<h1>Danke für deine Bestellung </h1>
    <p>
    Hallo ${order.user.name},</p>
    <p>wir freuen uns, dass du etwas Schönes gefunden hast!</p>
    <p>Sobald dein Paket auf dem Weg ist, erhälst du von uns eine Versandbestätigung per Mail.</p>
    <h2>[Bestellnummer ${order._id}] (${order.createdAt
    .toString()
    .substring(0, 10)})</h2>
    <table style="border: 1px solid black; border-collapse:collapse;">
    <thead style="text-align:center; border: 1px solid black;">
    <tr>
    <td style="border: 1px solid black;"><strong>Produkt</strong></td>
    <td style="border: 1px solid black;"><strong>Menge</strong></td>
    <td><strong>Preis</strong></td>
    </thead>
    <tbody style="text-align:center;">
    ${order.orderItems
      .map(
        (item: any) => `
      <tr>
      <td style="border: 1px solid black;">${item.name}</td>
      <td style="border: 1px solid black;">${item.quantity}</td>
      <td align="right">${item.price.toFixed(2)} €</td>
      </tr>
    `
      )
      .join('\n')}
    </tbody>
    <tfoot>
    <tr style="border: 1px solid black;">
    <td colspan="2" style="border: 1px solid black;">Artikelpreis:</td>
    <td align="right"> ${order.itemsPrice.toFixed(2)} €</td>
    </tr>
    <tr style="border: 1px solid black;">
    <td colspan="2" style="border: 1px solid black;">MwSt:</td>
    <td align="right"> ${order.taxPrice.toFixed(2)} €</td>
    </tr>
    <tr style="border: 1px solid black;">
    <td colspan="2" style="border: 1px solid black;">Versandkosten:</td>
    <td align="right"> ${order.shippingPrice.toFixed(2)} €</td>
    </tr>
    <tr style="border: 1px solid black;">
    <td colspan="2" style="border: 1px solid black;"><strong>Gesamtpreis:</strong></td>
    <td align="right"><strong> ${order.totalPrice.toFixed(2)} €</strong></td>
    </tr>
    <tr>
    <td colspan="2" style="border: 1px solid black;">Zahlungsmethode:</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Lieferanschrift: </h2>
    <p>
    ${order.shippingAddress.fullName}<br/>
    ${order.shippingAddress.address}<br/>
    ${order.shippingAddress.postalCode} ${order.shippingAddress.city}<br/>
    ${order.shippingAddress.country}<br/>
    </p>
    <hr/>
    <p> Liebe Grüße und bis bald,</p>
    <b> Dein Xbody-Team</b>
    `;
};

export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5010'
    : 'https://yourdomain.com';
