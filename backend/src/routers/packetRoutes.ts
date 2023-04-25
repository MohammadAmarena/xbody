import express from 'express';
import asyncHandler from 'express-async-handler';
import { Packets } from '../models/packetsModel';

export const packetRouter = express.Router();

packetRouter.get(
    '/',
    asyncHandler(async (req, res) => {
    const packets = await Packets.find({}).sort({ _id: -1 }).limit(6);
    res.send({ packets });
    })
);

packetRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const packet = await Packets.findById(req.params.id);
        res.send({ packet });
    })
);

packetRouter.get(
    '/:id/leistungen',
    asyncHandler(async (req, res) => {
        const packet = await Packets.findById(req.params.id);
        if (packet) {
            const leistungen = packet.leistungen;
            res.send({ leistungen });
        } else {
            res.status(404);
            throw new Error('Packet not found');
        }
    })
);

packetRouter.put(
    '/:id/leistungen',
    asyncHandler(async (req, res) => {
        const packet = await Packets.findById(req.params.id);
        if (packet) {
        packet.leistungen = req.body.leistungen;
        await packet.save();
        res.send({ leistungen: packet.leistungen });
        } else {
        res.status(404);
        throw new Error('Packet not found');
        }
    })
);