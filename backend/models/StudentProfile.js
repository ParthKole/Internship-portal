const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  personalInfo: {
    firstName: String,
    lastName: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    currentCity: String,
    permanentAddress: String,
  },
  academic: {
    university: String,
    degree: String,
    specialization: String,
    graduationYear: String,
    currentYear: String,
    cgpa: String,
    collegeName: String,
  },
  educationHistory: {
    highSchool: { name: String, board: String, year: String, percentage: String },
    intermediate: { name: String, board: String, year: String, percentage: String, stream: String }
  },
  skills: {
    programmingLanguages: [String],
    frameworks: [String],
    databases: [String],
    cloudPlatforms: [String],
    devOpsTools: [String]
  },
  projects: [{
    title: String,
    description: String,
    role: String,
    duration: String,
    githubLink: String,
    technologies: [String] // derived from tech stack input
  }],
  certifications: [{
    title: String,
    issuer: String,
    date: String,
    credentialId: String
  }],
  preferences: {
    jobTypes: [String],
    locations: [String],
    salary: String,
    goals: String
  },
  socialLinks: {
    linkedin: String,
    github: String,
    website: String
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);