import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Mic, Image, CheckCircle, AlertCircle, MapPin, User, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface Report {
  id: string;
  user: string;
  type: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'verified' | 'pending' | 'investigating';
  priority: 'high' | 'medium' | 'low';
  image?: string;
}

export function CitizenFeedback() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      type: 'bot', 
      content: 'Hello! I\'m your AI Disaster Assistant. How can I help you today? You can report incidents, get safety information, or check alert status.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
  ]);
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      user: 'Rahul Sharma',
      type: 'Flooding',
      description: 'Water level rising rapidly in our area. Streets are submerged up to 2 feet.',
      location: 'Andheri West, Mumbai',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'verified',
      priority: 'high'
    },
    {
      id: '2',
      user: 'Priya Patel',
      type: 'Landslide',
      description: 'Cracks appearing on hillside near residential area. Urgent inspection needed.',
      location: 'Mussoorie, Uttarakhand',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'investigating',
      priority: 'high'
    },
    {
      id: '3',
      user: 'Amit Kumar',
      type: 'Power Outage',
      description: 'Complete power failure in entire locality due to heavy winds.',
      location: 'Sector 15, Noida',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'verified',
      priority: 'medium'
    },
    {
      id: '4',
      user: 'Sneha Reddy',
      type: 'Road Blockage',
      description: 'Fallen tree blocking main road. Emergency vehicles cannot pass.',
      location: 'Banjara Hills, Hyderabad',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'verified',
      priority: 'medium'
    },
    {
      id: '5',
      user: 'Vikram Singh',
      type: 'Water Contamination',
      description: 'Strange smell and color in water supply. Possible contamination.',
      location: 'Jayanagar, Bangalore',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      status: 'pending',
      priority: 'low'
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userMsg: string): string => {
    const lowerMsg = userMsg.toLowerCase();
    
    if (lowerMsg.includes('flood') || lowerMsg.includes('water')) {
      return 'I understand you\'re experiencing flooding. Please move to higher ground immediately if water levels are rising. Emergency services have been notified. Stay safe and avoid electrical equipment.';
    } else if (lowerMsg.includes('fire')) {
      return 'If you see a fire, please evacuate immediately and call emergency services. Do not attempt to fight large fires. Move away from smoke and follow designated evacuation routes.';
    } else if (lowerMsg.includes('earthquake')) {
      return 'During an earthquake, Drop, Cover, and Hold On. Stay away from windows and heavy objects. If outdoors, move to an open area. After shaking stops, check for injuries and damage.';
    } else if (lowerMsg.includes('help') || lowerMsg.includes('emergency')) {
      return 'Emergency services are on standby. Please provide your exact location and nature of emergency. You can also use the "Report Incident" feature to submit details with photos.';
    } else {
      return 'Thank you for reaching out. I\'ve recorded your message. A disaster management officer will respond shortly. In case of immediate danger, please call emergency services at 112.';
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'verified':
        return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', icon: CheckCircle };
      case 'investigating':
        return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400', icon: AlertCircle };
      default:
        return { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', icon: AlertCircle };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      default: return 'bg-blue-500';
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
          <h2 className="text-2xl text-cyan-300 mb-2">Citizen Feedback & Reports</h2>
          <p className="text-slate-400">Real-time incident reporting & AI-powered assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            {reports.filter(r => r.status === 'verified').length} Verified
          </Badge>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
            {reports.filter(r => r.status === 'pending').length} Pending
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-cyan-300">AI Disaster Assistant</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-green-400"
                  />
                  <span>Online • 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    }`}>
                      {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                        : 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-slate-600/50'
                    }`}>
                      <p className="text-slate-200 text-sm">{msg.content}</p>
                      <p className="text-xs text-slate-500 mt-2">{msg.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message or report an incident..."
                  className="bg-slate-800/50 border-slate-600 resize-none pr-20 text-slate-200"
                  rows={2}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-cyan-400">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-cyan-400">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Community Reports Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-700/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-cyan-300">Verified Community Reports</h3>
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Live Feed
              </Badge>
            </div>
          </div>

          <div className="h-[520px] overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {reports.map((report, idx) => {
                const statusConfig = getStatusConfig(report.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-xl border ${statusConfig.border} ${statusConfig.bg} p-4 backdrop-blur-sm`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-slate-200 text-sm">{report.user}</div>
                          <div className="text-slate-500 text-xs">{report.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`} />
                        <StatusIcon className={`w-4 h-4 ${statusConfig.text}`} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs mb-2">
                        {report.type}
                      </Badge>
                      <p className="text-slate-300 text-sm mb-2">{report.description}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {report.location}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-7 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
                        View Details
                      </Button>
                      {report.status === 'pending' && (
                        <Button size="sm" variant="outline" className="text-xs h-7 border-green-500/50 text-green-400 hover:bg-green-500/20">
                          Verify Report
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Reports Today', value: '342', icon: MessageCircle, color: 'text-blue-400' },
          { label: 'Verified', value: '289', icon: CheckCircle, color: 'text-green-400' },
          { label: 'Response Time', value: '4.2m', icon: AlertCircle, color: 'text-cyan-400' },
          { label: 'Active Users', value: '12.4K', icon: User, color: 'text-purple-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 p-4 backdrop-blur-sm"
            >
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
              <div className="text-2xl text-cyan-300">{stat.value}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
