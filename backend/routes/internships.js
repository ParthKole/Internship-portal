const router = require('express').Router();
const Internship = require('../models/Internship');

// Get All Internships with Filters
router.get('/', async (req, res) => {
  try {
    const { role, location } = req.query;
    let query = { status: 'approved' }; // Assuming you only show approved ones

    if (role) query.title = { $regex: role, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    const internships = await Internship.find(query).populate('companyId', 'name email');
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;