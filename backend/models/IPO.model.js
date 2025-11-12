// backend/models/IPO.js
import { Schema, model } from 'mongoose';

const ipoSchema = Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Company', // Reference the Company model
    },
    openDate: {
      type: Date,
      required: true,
    },
    closeDate: {
      type: Date,
      required: true,
    },
    priceBand: {
      type: String, // e.g., "$100-120"
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'upcoming'], // Added 'upcoming' for more flexibility
      default: 'upcoming',
    },
    // Add other relevant IPO details as needed
  },
  {
    timestamps: true,
  }
);

const IPO = model('IPO', ipoSchema);

export default IPO;