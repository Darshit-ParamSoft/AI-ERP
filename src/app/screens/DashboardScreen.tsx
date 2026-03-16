import { useState } from 'react';
import { 
  MessageSquarePlus, 
  Clock, 
  BookmarkPlus, 
  Settings, 
  LogOut, 
  Send, 
  Mic, 
  Upload,
  Sparkles,
  User,
  Bot,
  Download,
  BarChart3,
  Code2,
  Trash2,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThinkingLoader from '../components/ThinkingLoader';
import ResultPanel from '../components/ResultPanel';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function DashboardScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatHistory = [
    { id: '1', title: 'Data Analysis Request', time: '2 hours ago' },
    { id: '2', title: 'SQL Query Generation', time: '5 hours ago' },
    { id: '3', title: 'Chart Visualization', time: 'Yesterday' },
    { id: '4', title: 'API Documentation', time: '2 days ago' },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'ve analyzed your request and generated a comprehensive response. Here\'s what I found...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-80 backdrop-blur-2xl bg-white/5 border-r border-white/10 flex flex-col"
            >
              {/* Logo */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>AI NEXUS</h1>
                    <p className="text-xs text-gray-400">Intelligence Platform</p>
                  </div>
                </div>
              </div>

              {/* New Chat Button */}
              <div className="p-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden rounded-xl py-3 px-4 font-semibold text-white flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  <MessageSquarePlus className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">New Chat</span>
                </motion.button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto px-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Chats
                </h3>
                <div className="space-y-2">
                  {chatHistory.map((chat) => (
                    <motion.button
                      key={chat.id}
                      whileHover={{ x: 4 }}
                      className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                    >
                      <p className="text-sm text-white truncate group-hover:text-purple-300 transition-colors">{chat.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bottom Menu */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-purple-300 transition-all">
                  <BookmarkPlus className="w-5 h-5" />
                  <span className="text-sm">Saved Prompts</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-all">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-red-300 transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <div className="backdrop-blur-2xl bg-white/5 border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-300" />
                </button>
                <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  AI Assistant
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-300">Online</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`backdrop-blur-xl rounded-2xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-purple-600/40 to-cyan-600/40 border border-purple-500/30' 
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <p className="text-white leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 px-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Thinking Loader */}
            {isThinking && <ThinkingLoader />}

            {/* Result Panel */}
            {showResult && <ResultPanel onClose={() => setShowResult(false)} />}
          </div>

          {/* Input Area */}
          <div className="backdrop-blur-2xl bg-white/5 border-t border-white/10 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-end gap-3 p-4">
                  <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </button>
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none max-h-32 min-h-[40px]"
                    rows={1}
                  />
                  <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                    <Mic className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </button>
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 relative group overflow-hidden shadow-lg shadow-purple-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <Send className="w-5 h-5 text-white relative z-10" />
                  </motion.button>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="w-80 backdrop-blur-2xl bg-white/5 border-l border-white/10 p-6 hidden xl:block">
          {/* AI Avatar */}
          <div className="relative mb-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <motion.div
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-4 shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(168, 85, 247, 0.6)",
                    "0 0 60px rgba(6, 182, 212, 0.6)",
                    "0 0 30px rgba(168, 85, 247, 0.6)",
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>AI Assistant</h3>
              <p className="text-xs text-gray-400">Ready to help you</p>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Today's Activity
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Queries</span>
                  <span className="text-white font-semibold">24</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Data Analyzed</span>
                  <span className="text-white font-semibold">12 GB</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-white font-semibold">98%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all group">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300 group-hover:text-white">Generate Code</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all group">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300 group-hover:text-white">Analyze Data</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all group">
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 group-hover:text-white">Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
