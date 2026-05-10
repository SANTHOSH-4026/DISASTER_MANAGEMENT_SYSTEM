## 7.1 App.tsx

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Auth Pages
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';

// Guards
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

// Dashboard Components (Old App state components wrapped in a layout)
import { LandingDashboard } from './components/LandingDashboard';
import { DisasterPrediction } from './components/DisasterPrediction';
import { LiveMonitoring } from './components/LiveMonitoring';
import { AlertManagement } from './components/AlertManagement';
import { CitizenFeedback } from './components/CitizenFeedback';
import { Analytics } from './components/Analytics';
import { Settings as SettingsPanel } from './components/Settings';

// Main App Layout
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, CloudLightning, Activity, Bell, MessageSquare, PieChart, Settings, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Zap, path: '/dashboard' },
  { id: 'prediction', label: 'AI Predictions', icon: CloudLightning, path: '/predictions' },
  { id: 'monitoring', label: 'Live Monitor', icon: Activity, path: '/monitoring' },
  { id: 'feedback', label: 'Citizen Reports', icon: MessageSquare, path: '/reports' },
  { id: 'analytics', label: 'Analytics', icon: PieChart, path: '/analytics' },
  { id: 'alerts', label: 'Alert Management', icon: Bell, path: '/admin/alerts', adminOnly: true },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings', adminOnly: true },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { role, signOut, user } = useAuth();

  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && role !== 'admin') return false;
    return true;
  });

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950 text-slate-200 selection:bg-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="flex-shrink-0 relative z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                AI Disaster Management System
              </h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-300'
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
                </Link>
              );
            })}

            <div className="w-px h-6 bg-slate-700/50 mx-2"></div>

            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden xl:block">
                <p className="text-sm text-white font-medium">{user?.user_metadata?.full_name || 'Citizen'}</p>
                <p className="text-xs text-cyan-400 capitalize">{role}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden absolute top-16 w-full z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 overflow-hidden shadow-2xl"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300'
                        : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
        {/* Internal Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 lg:px-6 py-6 pb-12 max-w-7xl h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>

  );
};

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ 
        style: { background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
        success: { iconTheme: { primary: '#06b6d4', secondary: '#fff' } }
      }} />
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected Main Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<MainLayout><Outlet /></MainLayout>}>
              <Route path="/dashboard" element={<LandingDashboard />} />
              <Route path="/predictions" element={<DisasterPrediction />} />
              <Route path="/monitoring" element={<LiveMonitoring />} />
              <Route path="/reports" element={<CitizenFeedback />} />
              <Route path="/analytics" element={<Analytics />} />
              
              {/* Admin Only Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/alerts" element={<AlertManagement />} />
                <Route path="/admin/settings" element={<SettingsPanel />} />
              </Route>
            </Route>
          </Route>

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

## 7.2 AuthLayout.tsx

```tsx
import { Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#020617] selection:bg-cyan-500/30">
      
      {/* LEFT SIDE - Cinematic Visual Section */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 lg:min-h-screen relative overflow-hidden bg-[#020617] border-r border-slate-800/60 p-12 lg:p-16">
        
        {/* Advanced Ambient Background System */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Cyber Grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
              transformOrigin: 'top center',
            }}
          />
          
          {/* Ambient Lighting Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-[-10%] w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen" 
          />
        </div>

        {/* Branding Header */}
        <div className="relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-50 transition-opacity" />
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/50 flex items-center justify-center">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                AI DISASTER MANAGEMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SYSTEM</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">INDIA</p>
            </div>
          </motion.div>
        </div>

        {/* Center Composition: Ambient Radar (Background) + Hero Text (Foreground) */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center -mt-8">
          
          {/* Background Ambient Radar Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-[2px] pointer-events-none mix-blend-screen">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, delay: ring * 0.3 }}
                className={`absolute rounded-full border border-cyan-400/${40 - ring * 10}`}
                style={{ width: `${ring * 200}px`, height: `${ring * 200}px` }}
              />
            ))}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] rounded-full border-r-2 border-cyan-300/30"
              style={{
                background: 'conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 0.2) 100%)'
              }}
            />
          </div>

          {/* Foreground Hero Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-30 text-center max-w-2xl px-6"
          >
            <h2 className="text-5xl xl:text-6xl font-light text-slate-100 leading-[1.1] mb-6 drop-shadow-2xl">
              Predict.<br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Protect. Prevail.
              </span>
            </h2>
            <p className="text-slate-400 text-base xl:text-lg font-light leading-relaxed max-w-lg mx-auto drop-shadow-md">
              Securely access real-time environmental monitoring, AI-driven disaster predictions, and critical community intelligence.
            </p>
          </motion.div>

        </div>

        {/* Footer (Empty placeholder to maintain flex-between balance) */}
        <div className="relative z-30 h-14" />

      </div>

      {/* RIGHT SIDE - Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative bg-[#020617] lg:min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)] pointer-events-none" />
        
        {/* Max-width constraint heavily enforced */}
        <div className="w-full max-w-[420px] relative z-10 py-12">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};
```

## 7.3 ProtectedRoute.tsx

```tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
```

## 7.4 AuthContext.tsx

```tsx
import React, { createContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: 'admin' | 'user' | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  isLoading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRole(session.user.id);
        } else {
          setRole(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    try {
      // First try to get role from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      setRole(data?.role as 'admin' | 'user' || 'user');
    } catch (err) {
      console.error("Error fetching user role:", err);
      setRole('user'); // Default to user if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, role, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
```
