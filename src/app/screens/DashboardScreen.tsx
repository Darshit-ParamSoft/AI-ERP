import { useState } from "react";
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
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThinkingLoader from "../components/ThinkingLoader";
import ResultPanel from "../components/ResultPanel";

interface ColorConfig {
  bg1: string;
  bg2: string;
  bg3: string;
  bgAngle: number;
  blob1: string;
  blob2: string;
  accent1: string;
  accent2: string;
  titleC1: string;
  titleC2: string;
  titleC3: string;
  subtitleC: string;
  labelC: string;
}

const DEFAULTS: ColorConfig = {
  bg1: "#020617",
  bg2: "#2d0a4e",
  bg3: "#0f172a",
  bgAngle: 135,
  blob1: "#a855f7",
  blob2: "#06b6d4",
  accent1: "#a855f7",
  accent2: "#06b6d4",
  titleC1: "#ffffff",
  titleC2: "#d8b4fe",
  titleC3: "#a5f3fc",
  subtitleC: "#9ca3af",
  labelC: "#d1d5db",
};

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

function ColorRow({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: keyof ColorConfig;
  value: string;
  onChange: (key: keyof ColorConfig, val: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs text-gray-400 w-24 shrink-0">{label}</span>
      <div
        className="w-7 h-7 rounded-md border border-white/20 overflow-hidden shrink-0 cursor-pointer"
        style={{ background: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          className="opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
            onChange(id, e.target.value);
        }}
        className="w-20 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white font-mono"
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
      <div className="border-t border-white/5 mt-4" />
    </div>
  );
}

export default function DashboardScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeOpen, setThemeOpen] = useState(false);
  const [cfg, setCfg] = useState<ColorConfig>({ ...DEFAULTS });

  const set = (key: keyof ColorConfig, val: string | number) =>
    setCfg((prev) => ({ ...prev, [key]: val }));

  const chatHistory = [
    { id: "1", title: "Data Analysis Request", time: "2 hours ago" },
    { id: "2", title: "SQL Query Generation", time: "5 hours ago" },
    { id: "3", title: "Chart Visualization", time: "Yesterday" },
    { id: "4", title: "API Documentation", time: "2 days ago" },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I've analyzed your request and generated a comprehensive response. Here's what I found...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setShowResult(true);
    }, 3000);
  };

  const accentGradient = `linear-gradient(135deg, ${cfg.accent1}, ${cfg.accent2})`;
  const titleGradient = `linear-gradient(135deg, ${cfg.titleC1}, ${cfg.titleC2}, ${cfg.titleC3})`;

  return (
    // ─── Root: full viewport, no overflow ───────────────────────────────────
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: `linear-gradient(${cfg.bgAngle}deg, ${cfg.bg1}, ${cfg.bg2}, ${cfg.bg3})`,
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: cfg.blob1 + "33" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: cfg.blob2 + "33" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ─── Theme Panel (fixed overlay, won't shift layout) ──────────────── */}
      <AnimatePresence>
        {themeOpen && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 z-50 backdrop-blur-2xl bg-black/70 border-l border-white/10 overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-sm">
                  Theme Settings
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCfg({ ...DEFAULTS })}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setThemeOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Section title="Background Gradient">
                <ColorRow
                  label="Color 1"
                  id="bg1"
                  value={cfg.bg1}
                  onChange={set}
                />
                <ColorRow
                  label="Color 2"
                  id="bg2"
                  value={cfg.bg2}
                  onChange={set}
                />
                <ColorRow
                  label="Color 3"
                  id="bg3"
                  value={cfg.bg3}
                  onChange={set}
                />
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-gray-400 w-24 shrink-0">
                    Angle
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={cfg.bgAngle}
                    onChange={(e) => set("bgAngle", Number(e.target.value))}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-xs text-gray-400 w-8">
                    {cfg.bgAngle}°
                  </span>
                </div>
                <div
                  className="h-7 rounded-lg mt-3 border border-white/10"
                  style={{
                    background: `linear-gradient(${cfg.bgAngle}deg, ${cfg.bg1}, ${cfg.bg2}, ${cfg.bg3})`,
                  }}
                />
              </Section>

              <Section title="Blob Colors">
                <ColorRow
                  label="Blob 1"
                  id="blob1"
                  value={cfg.blob1}
                  onChange={set}
                />
                <ColorRow
                  label="Blob 2"
                  id="blob2"
                  value={cfg.blob2}
                  onChange={set}
                />
              </Section>

              <Section title="Accent Gradient">
                <ColorRow
                  label="Start"
                  id="accent1"
                  value={cfg.accent1}
                  onChange={set}
                />
                <ColorRow
                  label="End"
                  id="accent2"
                  value={cfg.accent2}
                  onChange={set}
                />
                <div
                  className="h-6 rounded-lg mt-2 border border-white/10"
                  style={{ background: accentGradient }}
                />
              </Section>

              <Section title="Font Colors">
                <ColorRow
                  label="Title 1"
                  id="titleC1"
                  value={cfg.titleC1}
                  onChange={set}
                />
                <ColorRow
                  label="Title 2"
                  id="titleC2"
                  value={cfg.titleC2}
                  onChange={set}
                />
                <ColorRow
                  label="Title 3"
                  id="titleC3"
                  value={cfg.titleC3}
                  onChange={set}
                />
                <div
                  className="h-5 rounded-lg mt-1 mb-3 border border-white/10"
                  style={{ background: titleGradient }}
                />
                <ColorRow
                  label="Subtitle"
                  id="subtitleC"
                  value={cfg.subtitleC}
                  onChange={set}
                />
                <ColorRow
                  label="Labels"
                  id="labelC"
                  value={cfg.labelC}
                  onChange={set}
                />
              </Section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main layout: sidebar + content side by side ─────────────────── */}
      {/*
          KEY FIX: use CSS grid with explicit columns so the main content
          always fills exactly the remaining width — no flex shrink weirdness.
          Sidebar column collapses to 0 when closed via grid-template-columns.
      */}
      <div
        className="relative z-10 h-full transition-all duration-300"
        style={{
          display: "grid",
          gridTemplateColumns: sidebarOpen ? "320px 1fr" : "0px 1fr",
        }}
      >
        {/* ── Left Sidebar ─────────────────────────────────────────────────── */}
        <div className="overflow-hidden h-full">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 22, stiffness: 260 }}
                className="w-80 h-full backdrop-blur-2xl bg-white/5 border-r border-white/10 flex flex-col"
              >
                {/* Logo */}
                <div className="p-6 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                      style={{ background: accentGradient }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h1
                        className="text-xl font-bold bg-clip-text text-transparent truncate"
                        style={{
                          backgroundImage: titleGradient,
                          fontFamily: "Orbitron, sans-serif",
                        }}
                      >
                        PARAM-AI
                      </h1>
                      <p
                        className="text-xs truncate"
                        style={{ color: cfg.subtitleC }}
                      >
                        Intelligence Platform
                      </p>
                    </div>
                  </div>
                </div>

                {/* New Chat */}
                <div className="p-4 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group overflow-hidden rounded-xl py-3 px-4 font-semibold text-white flex items-center justify-center gap-2"
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: accentGradient }}
                    />
                    <MessageSquarePlus className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">New Chat</span>
                  </motion.button>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto px-4">
                  <h3
                    className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: cfg.subtitleC }}
                  >
                    <Clock className="w-4 h-4" />
                    Recent Chats
                  </h3>
                  <div className="space-y-2">
                    {chatHistory.map((chat) => (
                      <motion.button
                        key={chat.id}
                        whileHover={{ x: 4 }}
                        className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                      >
                        <p
                          className="text-sm text-white truncate group-hover:transition-colors"
                          style={
                            { "--hover": cfg.accent1 } as React.CSSProperties
                          }
                        >
                          {chat.title}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: cfg.subtitleC }}
                        >
                          {chat.time}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Bottom Menu */}
                <div className="p-4 border-t border-white/10 space-y-1 shrink-0">
                  {[
                    {
                      icon: BookmarkPlus,
                      label: "Saved Prompts",
                      hoverColor: cfg.accent1,
                    },
                    { icon: LogOut, label: "Logout", hoverColor: "#f87171" },
                  ].map(({ icon: Icon, label, hoverColor }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:bg-white/5"
                      style={{ color: cfg.labelC }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = hoverColor)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = cfg.labelC)
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        {/*
            overflow-hidden on this column prevents it from ever exceeding
            the grid cell. The inner flex col fills the cell exactly.
        */}
        <div className="overflow-hidden h-full flex flex-col">
          {/* Top Navbar */}
          <div className="shrink-0 backdrop-blur-2xl bg-white/5 border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: toggle + title */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                >
                  <Menu className="w-5 h-5 text-gray-300" />
                </button>
                <h2
                  className="text-lg font-semibold bg-clip-text text-transparent truncate"
                  style={{
                    backgroundImage: titleGradient,
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  AI Assistant
                </h2>
              </div>

              {/* Right: theme + status + avatar */}
              <div className="flex items-center gap-3 shrink-0">
                <motion.button
                  onClick={() => setThemeOpen((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  style={{ color: cfg.labelC }}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-xs hidden sm:block">Theme</span>
                </motion.button>


                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: accentGradient }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages — scrollable, fills remaining height */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ background: accentGradient }}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-2xl min-w-0 ${message.type === "user" ? "order-first" : ""}`}
                >
                  <div
                    className="backdrop-blur-xl rounded-2xl p-4 border"
                    style={
                      message.type === "user"
                        ? {
                            background: `linear-gradient(135deg, ${cfg.accent1}33, ${cfg.accent2}33)`,
                            borderColor: cfg.accent1 + "55",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            borderColor: "rgba(255,255,255,0.1)",
                          }
                    }
                  >
                    <p className="text-white leading-relaxed break-words">
                      {message.content}
                    </p>
                  </div>
                  <p
                    className="text-xs mt-2 px-2"
                    style={{ color: cfg.subtitleC }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === "user" && (
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {isThinking && <ThinkingLoader />}
            {showResult && <ResultPanel onClose={() => setShowResult(false)} />}
          </div>

          {/* Input Area */}
          <div className="shrink-0 backdrop-blur-2xl bg-white/5 border-t border-white/10 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-end gap-3 p-4">
                  <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all shrink-0">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </button>

                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none max-h-32 min-h-[40px]"
                    rows={1}
                  />

                  <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all shrink-0">
                    <Mic className="w-5 h-5 text-gray-400" />
                  </button>

                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl shadow-lg shrink-0"
                    style={{ background: accentGradient }}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
              <p
                className="text-xs text-center mt-3"
                style={{ color: cfg.subtitleC }}
              >
                Press Enter to send · Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
