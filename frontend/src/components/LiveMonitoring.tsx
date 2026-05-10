import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Satellite, Thermometer, Droplets, Wind, Activity, MapPin, Layers, ZoomIn } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SensorData {
  id: string;
  type: string;
  location: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lat: number;
  lng: number;
}

interface Layer {
  id: string;
  name: string;
  enabled: boolean;
  icon: any;
  color: string;
}

export function LiveMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [opacity, setOpacity] = useState([60]);
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'rainfall', name: 'Rainfall', enabled: true, icon: Droplets, color: 'text-blue-400' },
    { id: 'temperature', name: 'Temperature', enabled: true, icon: Thermometer, color: 'text-orange-400' },
    { id: 'humidity', name: 'Humidity', enabled: false, icon: Wind, color: 'text-cyan-400' },
    { id: 'seismic', name: 'Seismic', enabled: false, icon: Activity, color: 'text-red-400' },
  ]);

  const [sensors, setSensors] = useState<SensorData[]>([
    { id: '1', type: 'Temperature', location: 'Mumbai', value: 34, unit: '°C', status: 'warning', lat: 40, lng: 35 },
    { id: '2', type: 'Rainfall', location: 'Chennai', value: 87, unit: 'mm', status: 'critical', lat: 30, lng: 55 },
    { id: '3', type: 'Wind Speed', location: 'Kolkata', value: 45, unit: 'km/h', status: 'normal', lat: 50, lng: 70 },
    { id: '4', type: 'Humidity', location: 'Delhi', value: 68, unit: '%', status: 'normal', lat: 65, lng: 45 },
    { id: '5', type: 'Seismic', location: 'Kashmir', value: 2.3, unit: 'Richter', status: 'warning', lat: 75, lng: 50 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Update sensor values
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 2
      })));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
          <h2 className="text-2xl text-cyan-300 mb-2">Live GIS Monitoring</h2>
          <p className="text-slate-400">Real-time satellite & IoT sensor data visualization</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-green-300 text-sm">Live • {currentTime.toLocaleTimeString()}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
        >
          {/* Map Container */}
          <div className="relative h-[600px] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573490647684-928a2454f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjB3ZWF0aGVyJTIwaW1hZ2VyeXxlbnwxfHx8fDE3NjIwNjA5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Satellite Map"
              className="w-full h-full object-cover"
              style={{ opacity: opacity[0] / 100 }}
            />

            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
            
            {/* Sensor Markers */}
            {sensors.map((sensor, idx) => (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: `${sensor.lat}%`, 
                  left: `${sensor.lng}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 2.5, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`absolute inset-0 w-12 h-12 rounded-full ${getStatusColor(sensor.status)} opacity-40 blur-md`}
                />
                
                {/* Marker Pin */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`relative w-8 h-8 rounded-full ${getStatusColor(sensor.status)} flex items-center justify-center shadow-lg border-2 border-white`}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </motion.div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileHover={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 rounded-lg bg-slate-900/95 border border-slate-700 shadow-xl z-50 pointer-events-none"
                >
                  <div className="text-xs text-cyan-300 mb-1">{sensor.location}</div>
                  <div className="text-white">{sensor.type}: {sensor.value.toFixed(1)}{sensor.unit}</div>
                  <div className={`text-xs mt-1 ${sensor.status === 'critical' ? 'text-red-400' : sensor.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
                    Status: {sensor.status.toUpperCase()}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Toolbar */}
            <div className="absolute top-4 right-4 space-y-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 backdrop-blur-sm"
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 backdrop-blur-sm"
              >
                <Layers className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Opacity Control */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <Satellite className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <div className="text-sm text-slate-300 mb-2">Satellite Layer Opacity</div>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
                <div className="text-cyan-300">{opacity[0]}%</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Controls */}
        <div className="space-y-4">
          {/* Layer Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">Data Layers</h3>
            </div>
            
            <div className="space-y-4">
              {layers.map((layer, idx) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${layer.color}`} />
                      <span className="text-slate-200 text-sm">{layer.name}</span>
                    </div>
                    <Switch
                      checked={layer.enabled}
                      onCheckedChange={() => toggleLayer(layer.id)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Live Sensor Data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">Live Sensors</h3>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {sensors.map((sensor, idx) => (
                <motion.div
                  key={sensor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-slate-200 text-sm mb-1">{sensor.type}</div>
                      <div className="text-slate-400 text-xs">{sensor.location}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(sensor.status)} animate-pulse`} />
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-lg text-cyan-300">{sensor.value.toFixed(1)}</div>
                    <div className="text-slate-400 text-xs">{sensor.unit}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weather API Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
          >
            <h3 className="text-cyan-300 mb-4">API Status</h3>
            <div className="space-y-3">
              {[
                { name: 'Weather API', status: 'online', latency: '42ms' },
                { name: 'Satellite Feed', status: 'online', latency: '67ms' },
                { name: 'IoT Sensors', status: 'online', latency: '28ms' },
              ].map((api, idx) => (
                <div key={api.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <span className="text-slate-300">{api.name}</span>
                  </div>
                  <span className="text-green-400">{api.latency}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
