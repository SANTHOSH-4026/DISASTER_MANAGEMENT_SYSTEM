import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Cloud, Droplet, Wind, Flame, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface PredictionData {
  type: string;
  probability: number;
  region: string;
  timeframe: string;
  icon: any;
  color: string;
  gradient: string;
  details: {
    confidence: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    affectedArea: string;
    estimatedImpact: string;
  };
}

export function DisasterPrediction() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTime, setSelectedTime] = useState('7days');
  const [animateCards, setAnimateCards] = useState(false);

  const predictions: PredictionData[] = [
    {
      type: 'Flood',
      probability: 89,
      region: 'Mumbai & Coastal Maharashtra',
      timeframe: '3-5 days',
      icon: Droplet,
      color: 'text-blue-400',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      details: {
        confidence: 94,
        severity: 'critical',
        affectedArea: '~450 sq km',
        estimatedImpact: 'High - 200K+ people'
      }
    },
    {
      type: 'Cyclone',
      probability: 76,
      region: 'Bay of Bengal',
      timeframe: '5-7 days',
      icon: Wind,
      color: 'text-purple-400',
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      details: {
        confidence: 87,
        severity: 'high',
        affectedArea: '~800 sq km',
        estimatedImpact: 'Medium - 150K+ people'
      }
    },
    {
      type: 'Drought',
      probability: 67,
      region: 'Rajasthan & Gujarat',
      timeframe: '2-3 weeks',
      icon: Cloud,
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 via-orange-400 to-yellow-600',
      details: {
        confidence: 82,
        severity: 'medium',
        affectedArea: '~1200 sq km',
        estimatedImpact: 'High - Agricultural impact'
      }
    },
    {
      type: 'Wildfire',
      probability: 54,
      region: 'Uttarakhand Hills',
      timeframe: '1-2 weeks',
      icon: Flame,
      color: 'text-orange-400',
      gradient: 'from-orange-500 via-red-500 to-orange-600',
      details: {
        confidence: 78,
        severity: 'medium',
        affectedArea: '~320 sq km',
        estimatedImpact: 'Low - Forest areas'
      }
    },
    {
      type: 'Heat Wave',
      probability: 82,
      region: 'Northern Plains',
      timeframe: '2-4 days',
      icon: AlertTriangle,
      color: 'text-red-400',
      gradient: 'from-red-500 via-orange-500 to-red-600',
      details: {
        confidence: 91,
        severity: 'high',
        affectedArea: '~2000 sq km',
        estimatedImpact: 'Very High - 1M+ people'
      }
    },
    {
      type: 'Heavy Rainfall',
      probability: 71,
      region: 'Kerala & Karnataka',
      timeframe: '4-6 days',
      icon: Droplet,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500 via-blue-400 to-cyan-600',
      details: {
        confidence: 85,
        severity: 'high',
        affectedArea: '~600 sq km',
        estimatedImpact: 'Medium - 180K+ people'
      }
    },
  ];

  useEffect(() => {
    setAnimateCards(true);
  }, [selectedRegion, selectedType, selectedTime]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
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
          <h2 className="text-2xl text-cyan-300 mb-2">AI Disaster Prediction</h2>
          <p className="text-slate-400">Machine learning powered disaster forecasting & risk analysis</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 text-sm">Model v3.2.1 • 94% Accuracy</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-6 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">Northern India</SelectItem>
                <SelectItem value="south">Southern India</SelectItem>
                <SelectItem value="east">Eastern India</SelectItem>
                <SelectItem value="west">Western India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Disaster Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="cyclone">Cyclone</SelectItem>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="fire">Wildfire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Time Window</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hrs">Next 24 Hours</SelectItem>
                <SelectItem value="7days">Next 7 Days</SelectItem>
                <SelectItem value="30days">Next 30 Days</SelectItem>
                <SelectItem value="90days">Next 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              onClick={() => setAnimateCards(!animateCards)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {predictions.map((pred, idx) => {
            const Icon = pred.icon;
            const circumference = 2 * Math.PI * 60;
            const strokeDashoffset = circumference - (pred.probability / 100) * circumference;

            return (
              <motion.div
                key={pred.type + idx}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${pred.gradient} opacity-10 group-hover:opacity-20`}
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${pred.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pred.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-1">{pred.type}</h3>
                        <p className="text-slate-400 text-sm">{pred.timeframe}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getSeverityColor(pred.details.severity)} text-white`}>
                      {pred.details.severity.toUpperCase()}
                    </div>
                  </div>

                  {/* Radial Progress */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-36 h-36">
                      <svg className="transform -rotate-90 w-full h-full">
                        {/* Background Circle */}
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke="rgba(148, 163, 184, 0.2)"
                          strokeWidth="12"
                          fill="none"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke={`url(#gradient-${idx})`}
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          strokeDasharray={circumference}
                          style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
                        />
                        <defs>
                          <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Center Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                          className="text-3xl bg-gradient-to-br from-cyan-300 to-blue-400 bg-clip-text text-transparent"
                        >
                          {pred.probability}%
                        </motion.div>
                        <div className="text-slate-400 text-sm">Probability</div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Region:</span>
                      <span className="text-slate-200">{pred.region}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">AI Confidence:</span>
                      <span className="text-cyan-300">{pred.details.confidence}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Affected Area:</span>
                      <span className="text-slate-200">{pred.details.affectedArea}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Impact:</span>
                      <span className="text-slate-200">{pred.details.estimatedImpact}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r ${pred.gradient} text-white text-sm shadow-lg`}
                  >
                    View Detailed Analysis
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
