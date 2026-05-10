import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Activity, Zap, Shield, MapPin, Flame, Droplet, Wind, Mountain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StatusOrb {
  id: string;
  label: string;
  value: number;
  icon: any;
  color: string;
}

interface HeatZone {
  id: string;
  type: 'flood' | 'fire' | 'earthquake' | 'cyclone';
  lat: number;
  lng: number;
  intensity: number;
}

interface Alert {
  id: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export function LandingDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', message: 'High flood risk detected in Mumbai region - 89% probability', severity: 'high', timestamp: new Date() },
    { id: '2', message: 'Cyclone formation monitored in Bay of Bengal', severity: 'high', timestamp: new Date() },
    { id: '3', message: 'Heat wave warning for Northern regions', severity: 'medium', timestamp: new Date() },
    { id: '4', message: 'Seismic activity recorded in Himalayan belt', severity: 'low', timestamp: new Date() },
  ]);

  const [statusOrbs, setStatusOrbs] = useState<StatusOrb[]>([
    { id: '1', label: 'AI Confidence', value: 94, icon: Zap, color: 'from-cyan-400 to-blue-500' },
    { id: '2', label: 'System Health', value: 98, icon: Activity, color: 'from-green-400 to-emerald-500' },
    { id: '3', label: 'Active Monitors', value: 87, icon: Shield, color: 'from-purple-400 to-pink-500' },
    { id: '4', label: 'Data Integrity', value: 96, icon: AlertCircle, color: 'from-blue-400 to-cyan-500' },
  ]);

  const [heatZones] = useState<HeatZone[]>([
    { id: '1', type: 'flood', lat: 35, lng: 45, intensity: 0.9 },
    { id: '2', type: 'fire', lat: 65, lng: 25, intensity: 0.7 },
    { id: '3', type: 'earthquake', lat: 50, lng: 70, intensity: 0.6 },
    { id: '4', type: 'cyclone', lat: 25, lng: 55, intensity: 0.85 },
    { id: '5', type: 'flood', lat: 40, lng: 30, intensity: 0.75 },
    { id: '6', type: 'fire', lat: 70, lng: 60, intensity: 0.8 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Update status orbs with slight variations
      setStatusOrbs(prev => prev.map(orb => ({
        ...orb,
        value: Math.min(100, Math.max(85, orb.value + (Math.random() - 0.5) * 2))
      })));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getZoneIcon = (type: string) => {
    switch (type) {
      case 'flood': return Droplet;
      case 'fire': return Flame;
      case 'earthquake': return Mountain;
      case 'cyclone': return Wind;
      default: return MapPin;
    }
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'flood': return 'bg-blue-500';
      case 'fire': return 'bg-orange-500';
      case 'earthquake': return 'bg-yellow-500';
      case 'cyclone': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Alerts Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-500/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 px-6 py-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex-shrink-0"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
          </motion.div>
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              {alerts.map((alert, idx) => (
                <span key={alert.id} className="text-red-200 mr-12">
                  <span className="text-red-400">●</span> {alert.message}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
          
          {/* Map Container */}
          <div className="relative h-[500px] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1712508818413-76a31994b525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMHNhdGVsbGl0ZSUyMG5pZ2h0fGVufDF8fHx8MTc2MjA2MDk0NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="World Map"
              className="w-full h-full object-cover opacity-40"
            />
            
            {/* Heat Zones */}
            {heatZones.map((zone, idx) => {
              const Icon = getZoneIcon(zone.type);
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="absolute"
                  style={{ 
                    top: `${zone.lat}%`, 
                    left: `${zone.lng}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Pulsing Ring */}
                  <motion.div
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={`absolute inset-0 w-16 h-16 rounded-full ${getZoneColor(zone.type)} opacity-40 blur-xl`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`relative w-10 h-10 rounded-full ${getZoneColor(zone.type)} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${zone.type === 'flood' ? '#3b82f6' : zone.type === 'fire' ? '#f97316' : zone.type === 'earthquake' ? '#eab308' : '#a855f7'}` }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  {/* Intensity Label */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded bg-black/80 text-white">
                    {Math.round(zone.intensity * 100)}%
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Map Header */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-slate-900/90 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-cyan-400 mb-1">Global Threat Map</h3>
                <p className="text-slate-400 text-sm">Real-time disaster monitoring & prediction</p>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm">Last Updated</div>
                <div className="text-cyan-300">{currentTime.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
            <div className="flex flex-wrap gap-4">
              {[
                { type: 'Flood', icon: Droplet, color: 'bg-blue-500' },
                { type: 'Fire', icon: Flame, color: 'bg-orange-500' },
                { type: 'Earthquake', icon: Mountain, color: 'bg-yellow-500' },
                { type: 'Cyclone', icon: Wind, color: 'bg-purple-500' },
              ].map(({ type, icon: Icon, color }) => (
                <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <Icon className="w-4 h-4 text-slate-300" />
                  <span className="text-sm text-slate-300">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Orbs */}
        <div className="space-y-4">
          {statusOrbs.map((orb, idx) => {
            const Icon = orb.icon;
            return (
              <motion.div
                key={orb.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl group"
                style={{ 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${orb.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                {/* Glow Effect */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`absolute -inset-1 bg-gradient-to-br ${orb.color} blur-xl opacity-30`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${orb.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-3xl bg-gradient-to-br bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                    >
                      {Math.round(orb.value)}%
                    </motion.div>
                  </div>
                  
                  <div className="text-slate-300 mb-3">{orb.label}</div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${orb.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${orb.color} rounded-full shadow-lg`}
                      style={{ boxShadow: `0 0 10px rgba(6, 182, 212, 0.5)` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Active Alerts', value: '24', change: '+3', trend: 'up' },
          { label: 'Regions Monitored', value: '156', change: '+12', trend: 'up' },
          { label: 'AI Predictions', value: '1,247', change: '+89', trend: 'up' },
          { label: 'Lives Protected', value: '2.4M', change: '+5.2K', trend: 'up' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-4 backdrop-blur-sm"
          >
            <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl text-cyan-300">{stat.value}</div>
              <div className="text-green-400 text-sm">{stat.change}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
