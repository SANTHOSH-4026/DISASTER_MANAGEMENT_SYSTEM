const supabase = require('../config/supabase');

class ReportService {
  async getReports() {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createReport({ user, type, description, location, priority }) {
    if (!supabase) throw new Error('Supabase not configured');
    
    const newReport = {
      user_name: user || 'Anonymous',
      type,
      description,
      location,
      priority: priority || 'medium',
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('reports')
      .insert([newReport])
      .select();

    if (error) throw error;
    return data[0];
  }

  async verifyReport(id) {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase
      .from('reports')
      .update({ status: 'verified' })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }
}

module.exports = new ReportService();
