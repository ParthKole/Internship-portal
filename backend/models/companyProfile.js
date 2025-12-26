const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true },
  companyType: String,
  industry: String,
  foundedYear: String,
  headquarters: String,
  website: String,
  about: String,
  
  // Contact & HR
  contactPerson: String,
  designation: String,
  phone: String,
  alternatePhone: String,
  linkedin: String,

  // Additional Info
  employeeCount: String,
  annualRevenue: String,
  techStack: [String],
  benefits: [String],
  workCulture: String,
  
  logoUrl: String,
  verificationStatus: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);