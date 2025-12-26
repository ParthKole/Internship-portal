const CompanyProfile = require('../models/companyProfile');
const Internship = require('../models/Internship');
const Application = require('../models/Application');

// @desc    Get Company Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const companyId = req.user._id;

    // 1. Fetch Profile (Graceful fallback)
    let profile = await CompanyProfile.findOne({ userId: companyId });
    if (!profile) {
      // Create a temporary object if profile missing so dashboard doesn't crash
      profile = { companyName: 'Company', contactPerson: 'Recruiter' };
    }
    
    // 2. Fetch Internships
    const internships = await Internship.find({ companyId });
    const internshipIds = internships.map(i => i._id);
    
    // 3. Fetch Applications
    const applications = await Application.find({ internshipId: { $in: internshipIds } })
      .populate('studentId', 'name email')
      .populate('internshipId', 'title')
      .sort({ createdAt: -1 });

    const stats = {
      activeInternships: internships.length,
      totalApplications: applications.length,
      shortlisted: applications.filter(a => a.status === 'accepted' || a.status === 'shortlisted').length,
      interviews: 0 
    };

    const recentApplications = applications.slice(0, 5).map(app => ({
      id: app._id,
      name: app.studentId ? app.studentId.name : 'Unknown Candidate',
      role: app.internshipId ? app.internshipId.title : 'Unknown Role',
      status: app.status,
      date: new Date(app.createdAt).toLocaleDateString(),
      match: 85,
      avatar: app.studentId?.name ? app.studentId.name.charAt(0) : 'U',
      location: 'India',
      email: app.studentId?.email
    }));

    res.json({
      success: true,
      data: {
        profileName: profile.companyName,
        contactPerson: profile.contactPerson,
        stats,
        recentApplications,
        activeInternshipsList: internships.slice(0, 3)
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Application Status (Accept/Reject)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Validate status
    if (!['accepted', 'rejected', 'pending', 'shortlisted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be: accepted, rejected, pending, or shortlisted' });
    }

    // Find application and populate internship to check ownership
    const application = await Application.findById(applicationId).populate('internshipId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if internshipId was populated correctly
    if (!application.internshipId) {
      return res.status(404).json({ message: 'Associated internship not found' });
    }

    // Security Check: Ensure the logged-in company owns the internship associated with this application
    if (application.internshipId.companyId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    // Update status
    application.status = status;
    await application.save();

    res.json({ success: true, message: 'Application status updated successfully', data: application });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: error.message || 'Failed to update application status' });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOne({ userId: req.user._id }).populate('userId', 'email');
    if (!profile) return res.json({ success: false, message: 'Profile not found' });
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postInternship = async (req, res) => {
  try {
    const { title, description, type, location, duration, stipend, deadline, skills } = req.body;
    const newInternship = new Internship({
      companyId: req.user._id,
      title, description, type, location, duration, deadline,
      stipend: typeof stipend === 'string' ? parseInt(stipend.replace(/[^0-9]/g, '')) || 0 : stipend,
      skillsRequired: skills || [],
      status: 'pending'
    });
    await newInternship.save();
    res.status(201).json({ success: true, data: newInternship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ companyId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyApplications = async (req, res) => {
  try {
    const internships = await Internship.find({ companyId: req.user._id });
    const internshipIds = internships.map(i => i._id);
    const applications = await Application.find({ internshipId: { $in: internshipIds } })
      .populate('studentId', 'name email')
      .populate('internshipId', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};