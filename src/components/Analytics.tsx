import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target, DollarSign, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics() {
  const disasterTrendData = [
    { month: 'Jan', floods: 12, cyclones: 3, earthquakes: 5, fires: 8 },
    { month: 'Feb', floods: 15, cyclones: 4, earthquakes: 3, fires: 6 },
    { month: 'Mar', floods: 8, cyclones: 2, earthquakes: 7, fires: 12 },
    { month: 'Apr', floods: 18, cyclones: 5, earthquakes: 4, fires: 15 },
    { month: 'May', floods: 22, cyclones: 6, earthquakes: 6, fires: 18 },
    { month: 'Jun', floods: 28, cyclones: 8, earthquakes: 2, fires: 10 },
    { month: 'Jul', floods: 35, cyclones: 12, earthquakes: 3, fires: 7 },
    { month: 'Aug', floods: 32, cyclones: 10, earthquakes: 5, fires: 9 },
  ];

  const aiAccuracyData = [
    { week: 'Week 1', accuracy: 88, predictions: 245 },
    { week: 'Week 2', accuracy: 91, predictions: 289 },
    { week: 'Week 3', accuracy: 89, predictions: 267 },
    { week: 'Week 4', accuracy: 93, predictions: 312 },
    { week: 'Week 5', accuracy: 94, predictions: 334 },
    { week: 'Week 6', accuracy: 92, predictions: 298 },
    { week: 'Week 7', accuracy: 95, predictions: 356 },
    { week: 'Week 8', accuracy: 94, predictions: 341 },
  ];

  const disasterTypeData = [
    { name: 'Floods', value: 142, color: '#3b82f6' },
    { name: 'Cyclones', value: 48, color: '#a855f7' },
    { name: 'Earthquakes', value: 35, color: '#eab308' },
    { name: 'Fires', value: 85, color: '#f97316' },
    { name: 'Droughts', value: 28, color: '#84cc16' },
  ];

  const impactData = [
    { category: 'Lives Saved', value: 24500, change: 12.5, trend: 'up' },
    { category: 'Cost Averted', value: '₹450Cr', change: 8.3, trend: 'up' },
    { category: 'Response Time', value: '4.2m', change: -15.2, trend: 'down' },
    { category: 'Accuracy', value: '94%', change: 3.1, trend: 'up' },
  ];

  const regionalData = [
    { region: 'North', incidents: 156, severity: 68 },
    { region: 'South', incidents: 243, severity: 82 },
    { region: 'East', incidents: 189, severity: 75 },
    { region: 'West', incidents: 201, severity: 79 },
    { region: 'Central', incidents: 134, severity: 58 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl text-cyan-300 mb-2">Analytics & Performance Reports</h2>
          <p className="text-slate-400">AI model metrics, disaster trends & impact analysis</p>
        </div>
        <div className="flex gap-2">
          {['7 Days', '30 Days', '90 Days', 'Year'].map((period) => (
            <button
              key={period}
              className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 text-sm transition-colors"
            >
              {period}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactData.map((metric, idx) => {
          const Icon = metric.category === 'Lives Saved' ? Users : metric.category === 'Cost Averted' ? DollarSign : metric.category === 'Response Time' ? Activity : Target;
          const isPositive = metric.trend === 'up' ? metric.change > 0 : metric.change < 0;
          
          return (
            <motion.div
              key={metric.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${isPositive ? 'from-green-500/10 to-cyan-500/10' : 'from-red-500/10 to-orange-500/10'}`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="text-slate-400 text-sm mb-2">{metric.category}</div>
                <div className="text-3xl text-cyan-300">{metric.value}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disaster Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-300">Disaster Frequency Trends</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={disasterTrendData}>
              <defs>
                <linearGradient id="colorFloods" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCyclones" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEarthquakes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="floods" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFloods)" />
              <Area type="monotone" dataKey="cyclones" stroke="#a855f7" fillOpacity={1} fill="url(#colorCyclones)" />
              <Area type="monotone" dataKey="earthquakes" stroke="#eab308" fillOpacity={1} fill="url(#colorEarthquakes)" />
              <Area type="monotone" dataKey="fires" stroke="#f97316" fillOpacity={1} fill="url(#colorFires)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Model Accuracy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-300">AI Model Performance</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiAccuracyData}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis yAxisId="left" stroke="#94a3b8" domain={[80, 100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="accuracy" 
                stroke="url(#accuracyGradient)" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="predictions" 
                stroke="#a855f7" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#a855f7', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Disaster Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-300">Disaster Type Distribution</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={disasterTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {disasterTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
            </RePieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {disasterTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-cyan-300">{item.value} incidents</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regional Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-300">Regional Incident Analysis</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <defs>
                <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="region" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
              <Legend />
              <Bar dataKey="incidents" fill="url(#barGradient1)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="severity" fill="url(#barGradient2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
      >
        <h3 className="text-cyan-300 mb-4">System Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Predictions', value: '12,847', sublabel: 'This year' },
            { label: 'True Positives', value: '94.2%', sublabel: 'Accuracy rate' },
            { label: 'False Alarms', value: '5.8%', sublabel: 'Improving ↓' },
            { label: 'Lives Impacted', value: '2.4M+', sublabel: 'Protected' },
          ].map((stat, idx) => (
            <div key={stat.label} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
              <div className="text-2xl text-cyan-300 mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
