import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Trainer', TrainerSchema);
