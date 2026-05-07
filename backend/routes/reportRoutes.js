const express = require('express');
const router = express.Router();
// IMPORTANT: Make sure this path points to your actual Report model
const Report = require('../models/Report'); 

// 1. GET ALL REPORTS ROUTE
router.get('/all', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. UPDATE REPORT ROUTE (Status & Officer Assignment)
router.put('/:id', async (req, res) => {
  try {
    const { status, assignedOfficer } = req.body;
    
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id, 
      { status, assignedOfficer }, 
      { returnDocument: 'after' }
    );
    
    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, message: "Report updated successfully", data: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ success: false, message: "Error updating report" });
  }
});

module.exports = router;