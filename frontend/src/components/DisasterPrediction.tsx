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

  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/predictions');
      const data = await res.json();
      
      // Map API data to add visual properties
      if (Array.isArray(data)) {
        const mappedData = data.map(pred => {
          let icon = AlertTriangle;
          let color = 'text-gray-400';
          let gradient = 'from-gray-500 via-slate-500 to-gray-600';
          
          const type = pred.type?.toLowerCase() || '';
          if (type.includes('flood') || type.includes('rain') || type.includes('water')) {
            icon = Droplet;
            color = 'text-blue-400';
            gradient = 'from-blue-500 via-cyan-500 to-blue-600';
          } else if (type.includes('cyclone') || type.includes('wind') || type.includes('storm')) {
            icon = Wind;
            color = 'text-purple-400';
            gradient = 'from-purple-500 via-pink-500 to-purple-600';
          } else if (type.includes('drought') || type.includes('dry')) {
            icon = Cloud;
            color = 'text-yellow-400';
            gradient = 'from-yellow-500 via-orange-400 to-yellow-600';
          } else if (type.includes('fire') || type.includes('heat')) {
            icon = Flame;
            color = 'text-red-400';
            gradient = 'from-red-500 via-orange-500 to-red-600';
          }

          return { 
            type: pred.type,
            probability: pred.probability,
            region: pred.region,
            timeframe: pred.timeframe,
            icon, 
            color, 
            gradient,
            details: {
              confidence: pred.confidence,
              severity: pred.severity || 'medium',
              affectedArea: pred.affectedArea,
              estimatedImpact: pred.estimatedImpact
            }
          };
        });
        setPredictions(mappedData);
      }
    } catch (err) {
      console.error("Failed to fetch predictions", err);
    } finally {
      setLoading(false);
      setAnimateCards(true);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  useEffect(() => {
    if (predictions.length > 0) {
      setAnimateCards(true);
    }
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
                <SelectItem value="north">North India (e.g., UP, Punjab)</SelectItem>
                <SelectItem value="south">South India (e.g., Kerala, TN)</SelectItem>
                <SelectItem value="east">East India (e.g., West Bengal, Odisha)</SelectItem>
                <SelectItem value="west">West India (e.g., Maharashtra, Gujarat)</SelectItem>
                <SelectItem value="northeast">North-East India (e.g., Assam)</SelectItem>
                <SelectItem value="central">Central India (e.g., MP, Chhattisgarh)</SelectItem>
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

      {/* Prediction Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-800/80 text-xs uppercase text-slate-300 border-b border-cyan-500/30">
            <tr>
              <th scope="col" className="px-6 py-4">Disaster Type</th>
              <th scope="col" className="px-6 py-4">Region</th>
              <th scope="col" className="px-6 py-4">Probability</th>
              <th scope="col" className="px-6 py-4">Timeframe</th>
              <th scope="col" className="px-6 py-4">Severity</th>
              <th scope="col" className="px-6 py-4">Impact</th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {predictions.map((pred, idx) => {
                const Icon = pred.icon;
                return (
                  <motion.tr
                    key={pred.type + idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pred.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {pred.type}
                    </td>
                    <td className="px-6 py-4">{pred.region}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-1.5 max-w-[4rem]">
                          <div className={`bg-gradient-to-r ${pred.gradient} h-1.5 rounded-full`} style={{ width: `${pred.probability}%` }}></div>
                        </div>
                        <span className="text-cyan-300 font-medium">{pred.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{pred.timeframe}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold text-white shadow-sm ${getSeverityColor(pred.details.severity)}`}>
                        {pred.details.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">{pred.details.estimatedImpact}</td>
                    <td className="px-6 py-4 text-center">
                      <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30">
                        View
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
            
            {/* Loading State */}
            {loading && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} 
                      className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"
                    />
                    <span>Analyzing meteorological data via AI...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty State */}
            {!loading && predictions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No critical predictions found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
