import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Bell, Send, Radio, Megaphone, Users, Volume2, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  region: string;
  timestamp: Date;
  affectedPopulation: number;
  status: 'active' | 'resolved' | 'pending';
}

export function AlertManagement() {
  const [floodThreshold, setFloodThreshold] = useState([75]);
  const [earthquakeThreshold, setEarthquakeThreshold] = useState([5.0]);
  const [cycloneThreshold, setCycloneThreshold] = useState([65]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Critical Flood Warning',
      description: 'Severe flooding expected in Mumbai coastal areas. Immediate evacuation recommended for low-lying zones.',
      severity: 'critical',
      region: 'Mumbai, Maharashtra',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      affectedPopulation: 250000,
      status: 'active'
    },
    {
      id: '2',
      title: 'Cyclone Alert',
      description: 'Tropical cyclone approaching eastern coast. Wind speeds up to 120 km/h expected.',
      severity: 'critical',
      region: 'Odisha Coast',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      affectedPopulation: 180000,
      status: 'active'
    },
    {
      id: '3',
      title: 'Heat Wave Advisory',
      description: 'Extreme heat conditions predicted for next 48 hours. Stay hydrated and avoid outdoor activities.',
      severity: 'high',
      region: 'Delhi NCR',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      affectedPopulation: 500000,
      status: 'active'
    },
    {
      id: '4',
      title: 'Heavy Rainfall Warning',
      description: 'Continuous rainfall expected for 24 hours. Risk of landslides in hilly areas.',
      severity: 'medium',
      region: 'Kerala',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      affectedPopulation: 120000,
      status: 'pending'
    },
    {
      id: '5',
      title: 'Drought Alert',
      description: 'Water scarcity detected. Conservation measures recommended for agricultural regions.',
      severity: 'medium',
      region: 'Rajasthan',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      affectedPopulation: 340000,
      status: 'active'
    },
    {
      id: '6',
      title: 'Air Quality Alert',
      description: 'Poor air quality index detected. Sensitive groups should limit outdoor exposure.',
      severity: 'low',
      region: 'Bangalore',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      affectedPopulation: 80000,
      status: 'resolved'
    },
  ]);

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'from-red-950/40 to-red-900/40',
          border: 'border-red-500/50',
          text: 'text-red-400',
          badge: 'bg-red-500',
          glow: 'shadow-red-500/50'
        };
      case 'high':
        return {
          bg: 'from-orange-950/40 to-orange-900/40',
          border: 'border-orange-500/50',
          text: 'text-orange-400',
          badge: 'bg-orange-500',
          glow: 'shadow-orange-500/50'
        };
      case 'medium':
        return {
          bg: 'from-yellow-950/40 to-yellow-900/40',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500',
          glow: 'shadow-yellow-500/50'
        };
      default:
        return {
          bg: 'from-blue-950/40 to-blue-900/40',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          badge: 'bg-blue-500',
          glow: 'shadow-blue-500/50'
        };
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl text-cyan-300 mb-2">Alert Management Center</h2>
          <p className="text-slate-400">Monitor, configure & broadcast disaster alerts to citizens</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2">
            <Send className="w-4 h-4" />
            Send Custom Alert
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-cyan-300">Active Alerts ({alerts.filter(a => a.status === 'active').length})</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-red-500/50 text-red-400">
                {alerts.filter(a => a.severity === 'critical').length} Critical
              </Badge>
              <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                {alerts.filter(a => a.severity === 'high').length} High
              </Badge>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {alerts.map((alert, idx) => {
              const config = getSeverityConfig(alert.severity);
              
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-2xl overflow-hidden border ${config.border} bg-gradient-to-br ${config.bg} backdrop-blur-sm p-6 shadow-xl`}
                >
                  {/* Pulsing Effect for Active Alerts */}
                  {alert.status === 'active' && alert.severity === 'critical' && (
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                    />
                  )}

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <motion.div
                          animate={alert.severity === 'critical' ? { 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`w-10 h-10 rounded-lg ${config.badge} flex items-center justify-center`}
                        >
                          <AlertCircle className="w-5 h-5 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`${config.text}`}>{alert.title}</h4>
                            <Badge className={`${config.badge} text-white text-xs`}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-300 text-sm mb-2">{alert.description}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {(alert.affectedPopulation / 1000).toFixed(0)}K people
                            </span>
                            <span>• {alert.region}</span>
                            <span>• {getTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      <Badge 
                        variant="outline" 
                        className={
                          alert.status === 'active' 
                            ? 'border-green-500/50 text-green-400'
                            : alert.status === 'pending'
                            ? 'border-yellow-500/50 text-yellow-400'
                            : 'border-gray-500/50 text-gray-400'
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                      >
                        <Bell className="w-3 h-3" />
                        Notify Citizens
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                      >
                        <Megaphone className="w-3 h-3" />
                        Emergency Broadcast
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                      >
                        <Radio className="w-3 h-3" />
                        Alert Responders
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Threshold Controls */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">AI Alert Sensitivity</h3>
            </div>

            <div className="space-y-6">
              {/* Flood Threshold */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-slate-300 text-sm">Flood Alert</span>
                  </div>
                  <span className="text-cyan-400">{floodThreshold[0]}%</span>
                </div>
                <Slider
                  value={floodThreshold}
                  onValueChange={setFloodThreshold}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-2">Trigger when probability exceeds threshold</p>
              </div>

              {/* Earthquake Threshold */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-slate-300 text-sm">Earthquake</span>
                  </div>
                  <span className="text-cyan-400">{earthquakeThreshold[0]} Richter</span>
                </div>
                <Slider
                  value={earthquakeThreshold}
                  onValueChange={setEarthquakeThreshold}
                  max={10}
                  step={0.1}
                  className="cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-2">Minimum magnitude for alert</p>
              </div>

              {/* Cyclone Threshold */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-slate-300 text-sm">Cyclone</span>
                  </div>
                  <span className="text-cyan-400">{cycloneThreshold[0]} km/h</span>
                </div>
                <Slider
                  value={cycloneThreshold}
                  onValueChange={setCycloneThreshold}
                  max={200}
                  step={5}
                  className="cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-2">Wind speed threshold</p>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Save Thresholds
            </Button>
          </motion.div>

          {/* Broadcast Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">Quick Actions</h3>
            </div>

            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50">
                <Megaphone className="w-4 h-4" />
                Emergency Broadcast
              </Button>
              <Button className="w-full justify-start gap-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/50">
                <Send className="w-4 h-4" />
                Send SMS Alert
              </Button>
              <Button className="w-full justify-start gap-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50">
                <Bell className="w-4 h-4" />
                Push Notification
              </Button>
              <Button className="w-full justify-start gap-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50">
                <Radio className="w-4 h-4" />
                Alert First Responders
              </Button>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <h3 className="text-cyan-300 mb-4">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Alerts Sent</span>
                <span className="text-cyan-300">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Citizens Notified</span>
                <span className="text-cyan-300">2.4M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Response Rate</span>
                <span className="text-green-400">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">False Positives</span>
                <span className="text-orange-400">3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
