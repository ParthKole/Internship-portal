const router = require('express').Router();
const verify = require('../middleware/auth');

const {
  getDashboardStats,
  getCompanyProfile,
  postInternship,
  getMyInternships,
  getCompanyApplications,
  updateApplicationStatus,
} = require('../controllers/companyControllers');

// Company dashboard overview (stats + recent applications)
router.get('/dashboard-stats', verify, getDashboardStats);

// Company profile data
router.get('/profile', verify, getCompanyProfile);

// Post a new internship
router.post('/internships', verify, postInternship);

// Get all internships posted by this company
router.get('/internships', verify, getMyInternships);

// Get all applications for this company's internships
router.get('/applications', verify, getCompanyApplications);

// Update application status (accept / reject / pending / shortlisted)
router.patch('/applications/:id/status', verify, updateApplicationStatus);

module.exports = router;



