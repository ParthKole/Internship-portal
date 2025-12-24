const router = require('express').Router();
const verify = require('../middleware/auth');
const StudentProfile = require('../models/StudentProfile');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const User = require('../models/User'); // Import User model if needed

// 1. Get Student Profile (MISSING IN YOUR CODE)
router.get('/profile', verify, async (req, res) => {
  try {
    // Find profile linked to the logged-in user
    const profile = await StudentProfile.findOne({ userId: req.user._id }).populate('userId', 'name email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create/Update Student Profile (Recommended for "Edit Profile")
router.put('/profile', verify, async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Student Dashboard Stats (MODIFIED POPULATION)
router.get('/dashboard-stats', verify, async (req, res) => {
  try {
    const studentId = req.user._id;
    
    // Count applications
    const applications = await Application.find({ studentId });
    const appliedCount = applications.length;
    const shortlistedCount = applications.filter(app => app.status === 'accepted').length; 
    
    // Get profile completion 
    const profile = await StudentProfile.findOne({ userId: studentId });
    
    // Get recent applications with FULL Company Details
    const recentApplications = await Application.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'internshipId',
        select: 'title location stipend companyId',
        // FIX: Deep populate companyId to get the name
        populate: { 
          path: 'companyId', 
          select: 'name email' 
        }
      });

    res.json({
      stats: {
        applied: appliedCount,
        shortlisted: shortlistedCount,
        interviews: 0, 
      },
      recentApplications,
      profileName: profile ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}` : 'Student'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Apply for Internship
router.post('/apply/:internshipId', verify, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    const exists = await Application.findOne({ 
      studentId: req.user._id, 
      internshipId: req.params.internshipId 
    });
    if (exists) return res.status(400).json({ message: 'Already applied' });

    const application = new Application({
      internshipId: req.params.internshipId,
      studentId: req.user._id,
      companyId: internship.companyId, // Uses the companyId from the internship doc
      status: 'pending'
    });

    await application.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;