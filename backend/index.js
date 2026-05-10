const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const aiRoutes = require('./routes/aiRoutes');
const reportRoutes = require('./routes/reportRoutes');
const supabase = require('./config/supabase');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', supabaseConfigured: !!supabase });
});

// Mount Routes
app.use('/api', aiRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
