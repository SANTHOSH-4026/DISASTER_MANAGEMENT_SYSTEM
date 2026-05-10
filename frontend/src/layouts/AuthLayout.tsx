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
