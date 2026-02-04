import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    durationInDays: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Plan', PlanSchema);
