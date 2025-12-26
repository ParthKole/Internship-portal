const router = require('express').Router();
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const CompanyProfile = require('../models/companyProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const role = req.body.role || 'student';
    // Use companyName as name for company users
    const name = role === 'company' ? req.body.companyName : `${req.body.firstName} ${req.body.lastName}`;

    const newUser = new User({
      name: name || 'User',
      email: req.body.email,
      password: hashedPassword,
      role: role
    });
    const savedUser = await newUser.save();

    // Create Company Profile
    if (role === 'company') {
      const newCompany = new CompanyProfile({
        userId: savedUser._id,
        companyName: req.body.companyName || 'New Company',
        industry: req.body.industry || 'General',
        website: req.body.website || '',
        contactPerson: req.body.contactPerson || 'Admin',
        headquarters: req.body.headquarters || ''
      });
      await newCompany.save();
    } 
    // Create Student Profile
    else if (role === 'student') {
      const newProfile = new StudentProfile({
        userId: savedUser._id,
        personalInfo: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          dateOfBirth: req.body.dateOfBirth
        },
        academic: {
          university: req.body.university,
          degree: req.body.degree,
          graduationYear: req.body.graduationYear
        }
      });
      await newProfile.save();
    }

    res.status(201).json({ message: 'Registration successful', userId: savedUser._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email not found' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    // FIX: Using 'secret_key' to match middleware
    const token = jwt.sign(
      { _id: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'secret_key'
    );

    res.json({ 
      token, 
      user: {
        _id: user._id,
        role: user.role, 
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;