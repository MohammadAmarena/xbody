import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { userRouter } from './routers/userRoutes';
import { orderRouter } from './routers/orderRoutes';
import { productRouter } from './routers/productRoutes';
import { uploadRouter } from './routers/uploadRoutes';
import seedRouter from './routers/seedRoutes';
import keyRouter from './routers/keyRoutes';
import * as http from 'http';
import { Server } from 'socket.io';
import { sendContacts } from './nodemailer/Contact';
import { packetRouter } from './routers/packetRoutes';
import path from 'path';

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/xbody';
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('error mongodb');
  });
app.use('/seed', seedRouter);
app.use('/uploads', uploadRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/keys', keyRouter);
app.post('/contact', sendContacts);
app.use('/packets', packetRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
  next();
});

interface User {
  _id: string;
  name: string;
  online: boolean;
  isAdmin: boolean;
  socketId: string;
  messages: string[];
}

const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users: User[] = [];

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });

  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        if (user && user.messages) {
          user.messages.push(message);
        }
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Verzeihung. Ich bin gerade nicht online',
        });
      }
    }
  });
});

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
  next();
});

const PORT: number = parseInt((process.env.PORT || '5010') as string, 10);

httpServer.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`server started at http://localhost:${PORT}`);
// });
