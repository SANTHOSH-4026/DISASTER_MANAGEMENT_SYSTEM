const reportService = require('../services/reportService');

class ReportController {
  async getReports(req, res) {
    try {
      const reports = await reportService.getReports();
      res.json(reports);
    } catch (error) {
      if (error.message === 'Supabase not configured') {
        return res.status(503).json({ error: error.message });
      }
      console.error('Supabase Error:', error);
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  }

  async createReport(req, res) {
    try {
      const newReport = await reportService.createReport(req.body);
      res.status(201).json(newReport);
    } catch (error) {
      if (error.message === 'Supabase not configured') {
        return res.status(503).json({ error: error.message });
      }
      console.error('Supabase Error:', error);
      res.status(500).json({ error: 'Failed to create report' });
    }
  }

  async verifyReport(req, res) {
    try {
      const { id } = req.params;
      const updatedReport = await reportService.verifyReport(id);
      res.json(updatedReport);
    } catch (error) {
      if (error.message === 'Supabase not configured') {
        return res.status(503).json({ error: error.message });
      }
      console.error('Supabase Error:', error);
      res.status(500).json({ error: 'Failed to verify report' });
    }
  }
}

module.exports = new ReportController();
