import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    planPrice: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    remainingAmount: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'],
        required: true
    },
    admittedAt: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('Admission', AdmissionSchema);
