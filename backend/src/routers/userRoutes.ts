import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/userModel'
import { generateToken, isAdmin, isAuth, mailgun, baseUrl } from '../utils'

export const userRouter = express.Router()

userRouter.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: 'Benutzer nicht gefunden' })
  }
})

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find({})
    res.send(users)
  })
)

userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Ungültige E-Mail oder Passwort' })
  })
)

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User)

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  })
)

userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
)

userRouter.post(
  '/forget-password',
  asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as any, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      console.log(`${baseUrl()}/reset-password/${token}`);

      mailgun()
        .messages()
        .send(
          {
            from: 'Xbody <xbody@mg.yourdomain.com>',
            to: `${user.name} <${user.email}>`,
            subject: `Passwort zurücksetzen`,
            html: ` 
            <p>Bitte klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:</p> 
            <a href="${baseUrl()}/reset-password/${token}"}>Passwort zurücksetzen</a>
            `,
          },
          (error, body) => {
            console.log(error);
            console.log(body);
          }
        );
      res.send({ message: 'Wir haben den Link zum Zurücksetzen des Passworts an Ihre E-Mail gesendet.' });
    } else {
      res.status(404).send({ message: 'Benutzer nicht gefunden' });
    }
  })
);

userRouter.post(
  '/reset-password',
  asyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET as any, async (err: any) => {
      if (err) {
        res.status(401).send({ message: 'Ungültiges Token' });
      } else {
        const user = await UserModel.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Passwort erfolgreich zurückgesetzt',
            });
          }
        } else {
          res.status(404).send({ message: 'Benutzer nicht gefunden' });
        }
      }
    });
  })
)

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)
      const updatedUser = await user.save()
      res.send({ message: 'Benutzer aktualisiert', user: updatedUser })
    } else {
      res.status(404).send({ message: 'Benutzer nicht gefunden' })
    }
  })
)

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Admin-Benutzer kann nicht gelöscht werden' })
        return
      }
      const deleteUser = await user.deleteOne()
      res.send({ message: 'Benutzer gelöscht', user: deleteUser })
    } else {
      res.status(404).send({ message: 'Benutzer nicht gefunden' })
    }
  })
)
