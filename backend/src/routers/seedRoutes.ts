import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';
import { products } from '../data';
import { users } from '../data';
import { packets } from '../data';
import { Packets } from '../models/packetsModel';
import { UserModel } from '../models/userModel'

const seedRouter = express.Router();

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(products);
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(users);
    await Packets.deleteMany({});
    const createdPackets = await Packets.insertMany(packets);
    res.send({ createdProducts, createdUsers, createdPackets });
  })
);
export default seedRouter;
