import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },

  mobile: {
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
    enum: ['Cash', 'UPI', 'Card', 'Online'],
    required: true
  },

  note: {
    type: String
  },

  admittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Admission', admissionSchema);
