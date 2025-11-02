import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings2, User, Shield, Bell, Database, Globe, Key, Moon, Sun, CheckCircle, AlertCircle } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface ApiConnection {
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  endpoint: string;
}

export function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoAlerts, setAutoAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  
  const [apiConnections, setApiConnections] = useState<ApiConnection[]>([
    { name: 'Weather API', status: 'connected', lastSync: '2 mins ago', endpoint: 'api.weather.gov' },
    { name: 'Satellite Data', status: 'connected', lastSync: '5 mins ago', endpoint: 'sat.nasa.gov' },
    { name: 'Seismic Network', status: 'connected', lastSync: '1 min ago', endpoint: 'usgs.earthquake.gov' },
    { name: 'IoT Sensors', status: 'connected', lastSync: '30 secs ago', endpoint: 'iot.disaster.in' },
    { name: 'Emergency Services', status: 'error', lastSync: '1 hour ago', endpoint: 'emergency.gov.in' },
  ]);

  const roles = [
    { id: 'admin', name: 'Administrator', users: 5, color: 'text-red-400', permissions: 'Full Access' },
    { id: 'responder', name: 'First Responder', users: 48, color: 'text-orange-400', permissions: 'Alert & Monitor' },
    { id: 'analyst', name: 'Data Analyst', users: 12, color: 'text-blue-400', permissions: 'View & Report' },
    { id: 'citizen', name: 'Citizen', users: 12453, color: 'text-green-400', permissions: 'Report Only' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'border-green-500/50 bg-green-500/10';
      case 'error':
        return 'border-red-500/50 bg-red-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
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
          <h2 className="text-2xl text-cyan-300 mb-2">System Settings & Administration</h2>
          <p className="text-slate-400">Configure system preferences, manage users & API connections</p>
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Admin Panel
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">General Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                  <div>
                    <div className="text-slate-200">Dark Mode</div>
                    <div className="text-sm text-slate-400">Use dark theme interface</div>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-slate-200">Notifications</div>
                    <div className="text-sm text-slate-400">Receive system notifications</div>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-slate-200">Auto-Alert System</div>
                    <div className="text-sm text-slate-400">Automatically send alerts when threshold exceeded</div>
                  </div>
                </div>
                <Switch checked={autoAlerts} onCheckedChange={setAutoAlerts} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-slate-200">Data Sharing</div>
                    <div className="text-sm text-slate-400">Share anonymized data with research institutions</div>
                  </div>
                </div>
                <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Default Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger className="bg-slate-800/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="bg-slate-800/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC +5:30)</SelectItem>
                    <SelectItem value="utc">UTC (UTC +0:00)</SelectItem>
                    <SelectItem value="est">EST (UTC -5:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Save Changes
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Reset to Default
              </Button>
            </div>
          </motion.div>

          {/* API Connections */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">API Connections</h3>
            </div>

            <div className="space-y-3">
              {apiConnections.map((api, idx) => (
                <motion.div
                  key={api.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-lg border ${getStatusColor(api.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(api.status)}
                      <div>
                        <div className="text-slate-200">{api.name}</div>
                        <div className="text-xs text-slate-400">{api.endpoint}</div>
                      </div>
                    </div>
                    <Badge 
                      className={
                        api.status === 'connected' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }
                    >
                      {api.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Last sync: {api.lastSync}</span>
                    {api.status === 'error' && (
                      <Button size="sm" variant="outline" className="h-6 text-xs border-cyan-500/50 text-cyan-400">
                        Reconnect
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="w-full mt-4 bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300">
              + Add New API Connection
            </Button>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Role Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">User Roles</h3>
            </div>

            <div className="space-y-3">
              {roles.map((role, idx) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`${role.color}`}>{role.name}</div>
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      {role.users}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">{role.permissions}</div>
                </motion.div>
              ))}
            </div>

            <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Manage Permissions
            </Button>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">Security</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-2 block">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    value="sk_live_****************************" 
                    readOnly
                    className="bg-slate-800/50 border-slate-600 text-slate-400"
                  />
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="text-sm text-slate-300 mb-1">Last Login</div>
                <div className="text-xs text-slate-400">Nov 2, 2025 - 10:42 AM IST</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="text-sm text-slate-300 mb-1">2FA Status</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-green-400">Enabled</div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>

              <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50">
                Change Password
              </Button>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="text-cyan-300">System Status</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Server Uptime</span>
                <span className="text-green-400">99.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Database Size</span>
                <span className="text-cyan-300">2.4 TB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active Sensors</span>
                <span className="text-cyan-300">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">API Calls (24h)</span>
                <span className="text-cyan-300">847K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Storage Used</span>
                <span className="text-orange-400">68%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
