import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    // OPTIONAL PLAN
    plan: {
        ref: 'Plan',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    message: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['new', 'contacted', 'lost', 'converted'],
        default: 'new'
    }
},
{ timestamps: true });

export default mongoose.model('Lead', LeadSchema);
