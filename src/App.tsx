import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Map, 
  TrendingUp, 
  Bell, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { LandingDashboard } from './components/LandingDashboard';
import { DisasterPrediction } from './components/DisasterPrediction';
import { LiveMonitoring } from './components/LiveMonitoring';
import { AlertManagement } from './components/AlertManagement';
import { CitizenFeedback } from './components/CitizenFeedback';
import { Analytics } from './components/Analytics';
import { Settings as SettingsPanel } from './components/Settings';
import { Toaster } from './components/ui/sonner';

type Screen = 'dashboard' | 'prediction' | 'monitoring' | 'alerts' | 'feedback' | 'analytics' | 'settings';

interface NavItem {
  id: Screen;
  label: string;
  icon: any;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'prediction', label: 'Predictions', icon: TrendingUp },
    { id: 'monitoring', label: 'Live Monitoring', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'feedback', label: 'Citizen Reports', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <LandingDashboard />;
      case 'prediction':
        return <DisasterPrediction />;
      case 'monitoring':
        return <LiveMonitoring />;
      case 'alerts':
        return <AlertManagement />;
      case 'feedback':
        return <CitizenFeedback />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <LandingDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        {/* Animated Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              >
                <Shield className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg lg:text-xl bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Disaster Management
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">Next-Gen Climate Monitoring System</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveScreen(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      isActive
                        ? 'text-cyan-300'
                        : 'text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30"
                        style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="text-sm relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative z-40 border-b border-cyan-500/20 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveScreen(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300'
                        : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm text-center md:text-left">
              <p>© 2025 AI-Powered Disaster Management System</p>
              <p className="text-xs text-slate-500 mt-1">Protecting lives through intelligent predictions</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <button className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-cyan-400 transition-colors">Terms of Service</button>
              <button className="hover:text-cyan-400 transition-colors">Documentation</button>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
