import mongoose from 'mongoose';
import { type } from 'os';

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0   // ⭐ change
    },
    image :{
        type: String
    },
})

export default mongoose.model('Service', ServiceSchema)
