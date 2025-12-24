const router = require('express').Router();
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    // 1. Create User (Auth Creds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      password: hashedPassword,
      role: 'student'
    });
    const savedUser = await newUser.save();

    // 2. Create Student Profile (Detailed Data)
    const newProfile = new StudentProfile({
      userId: savedUser._id,
      personalInfo: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        nationality: req.body.nationality
      },
      academic: {
        university: req.body.university,
        degree: req.body.degree,
        specialization: req.body.specialization,
        graduationYear: req.body.graduationYear,
        currentYear: req.body.currentYear,
        cgpa: req.body.cgpa,
        collegeName: req.body.collegeName
      },
      educationHistory: {
        highSchool: req.body.highSchool,
        intermediate: req.body.intermediate
      },
      skills: {
        programmingLanguages: req.body.programmingLanguages,
        frameworks: req.body.frameworks,
        databases: req.body.databases,
        cloudPlatforms: req.body.cloudPlatforms,
        devOpsTools: req.body.devOpsTools
      },
      projects: req.body.projects,
      certifications: req.body.certifications,
      preferences: {
        jobTypes: req.body.preferredJobTypes,
        locations: req.body.preferredLocations,
        salary: req.body.expectedSalary,
        goals: req.body.careerGoals
      },
      socialLinks: {
        linkedin: req.body.linkedin,
        github: req.body.github
      }
    });
    
    await newProfile.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email not found' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKey');
    
    res.header('auth-token', token).json({ 
      token, 
      user: { id: user._id, name: user.name, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;