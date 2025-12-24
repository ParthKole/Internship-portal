const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stipend: {
      type: Number,
      required: true,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);


