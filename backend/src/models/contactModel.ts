import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        firstName: {
        type: String,
        minlength: [3, 'name must be at least 3 characters long'],
        },
        lastName: {
        type: String,
        minlength: [3, 'last name must be at least 3 characters long'],
        },
        phoneNumber: {
        type: Number,
        minlength: [9, 'phone number must be at least 9 characters long'],
        },
        email: {
        type: String,
        lowerCase: true,
        required: [true, 'email is required (gmail)'],
        },
        message: {
        type: String,
        minlength: [5, 'message must be at least 5 characters long'],
        },
    },
    { versionKey: false }
);

export const Contacts = mongoose.model('contacts', contactSchema);
