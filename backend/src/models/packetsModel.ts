import mongoose from 'mongoose';

const packetSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    leistungenTitle: { type: String, required: true },
    leistungen: { type: [String], required: true },
    image: { type: [String], required: true },
    dauer: [
        {
            package: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
});

export const Packets = mongoose.model('Packets', packetSchema);