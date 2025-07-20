import {Schema, model} from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    },
    message: {
    type: String,
    required: true,
    trim: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
}, {
  timestamps: true,
});
const Contact = model('Contact', contactSchema);
export default Contact;