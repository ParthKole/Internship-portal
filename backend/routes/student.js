const router = require('express').Router();
const verify = require('../middleware/auth');
const StudentProfile = require('../models/StudentProfile');
const Application = require('../models/Application');
const Internship = require('../models/Internship');

// 1. Get Student Dashboard Stats & Recent Applications
// CHANGED: Route name must be '/dashboard-stats' to match StudentDashboard.jsx
router.get('/dashboard-stats', verify, async (req, res) => {
  try {
    const studentId = req.user._id;
    
    // Fetch Profile Name
    const profile = await StudentProfile.findOne({ userId: studentId });
    
    // Fetch Applications (Sorted by newest first)
    // This ensures the most recently applied internship appears at the top
    const applications = await Application.find({ studentId })
      .sort({ createdAt: -1 }) // Newest first
      .populate({
        path: 'internshipId',
        select: 'title location stipend companyId',
        // Deep populate to get Company Name for the dashboard card
        populate: { 
          path: 'companyId', 
          select: 'name email' 
        }
      });

    // Calculate Stats
    const stats = {
      applied: applications.length,
      shortlisted: applications.filter(app => app.status === 'accepted').length,
      interviews: applications.filter(app => app.status === 'interview').length || 0,
    };

    res.json({
      success: true,
      profileName: profile ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}` : 'Student',
      stats,
      recentApplications: applications.slice(0, 5) // Return top 5 recent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Student Profile
router.get('/profile', verify, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id }).populate('userId', 'name email');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Student Profile
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

// 4. Apply for Internship
router.post('/apply/:internshipId', verify, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    // Check if already applied
    const exists = await Application.findOne({ 
      studentId: req.user._id, 
      internshipId: req.params.internshipId 
    });
    if (exists) return res.status(400).json({ message: 'Already applied' });

    // Create Application
    const application = new Application({
      internshipId: req.params.internshipId,
      studentId: req.user._id,
      companyId: internship.companyId, // Link company for easier querying later
      status: 'pending'
    });

    await application.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;