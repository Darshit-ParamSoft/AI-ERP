import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Sparkles, Settings, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ColorConfig {
  bg1: string;
  bg2: string;
  bg3: string;
  bgAngle: number;
  blob1: string;
  blob2: string;
  blob3: string;
  logo1: string;
  logo2: string;
  titleC1: string;
  titleC2: string;
  titleC3: string;
  subtitleC: string;
  labelC: string;
  linkC: string;
}

const DEFAULTS: ColorConfig = {
  bg1: "#0f0a1e",
  bg2: "#2d0a4e",
  bg3: "#0a1628",
  bgAngle: 135,
  blob1: "#a855f7",
  blob2: "#06b6d4",
  blob3: "#3b82f6",
  logo1: "#a855f7",
  logo2: "#06b6d4",
  titleC1: "#ffffff",
  titleC2: "#d8b4fe",
  titleC3: "#a5f3fc",
  subtitleC: "#9ca3af",
  labelC: "#d1d5db",
  linkC: "#a855f7",
};

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

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [cfg, setCfg] = useState<ColorConfig>({ ...DEFAULTS });

  const set = (key: keyof ColorConfig, val: string | number) =>
    setCfg((prev) => ({ ...prev, [key]: val }));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: `linear-gradient(${cfg.bgAngle}deg, ${cfg.bg1}, ${cfg.bg2}, ${cfg.bg3})`,
      }}
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: cfg.blob1 + "55" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: cfg.blob2 + "44" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: cfg.blob3 + "44" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Settings toggle - hidden when panel is open */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setPanelOpen(true)}
            className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm backdrop-blur-md hover:bg-white/15 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
            Customize
          </motion.button>
        )}
      </AnimatePresence>

      {/* Settings Panel - Fixed height with internal scrolling */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-72 z-40 backdrop-blur-2xl bg-black/60 border-l border-white/10 flex flex-col overflow-x-hidden"
          >
            {/* Fixed Header */}
            <div className="p-5 pb-0 flex-shrink-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-sm">
                  Theme Settings
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCfg({ ...DEFAULTS })}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area - Hidden scrollbar */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pb-5 scrollbar-hide">
              {/* BG Gradient */}
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
                {/* Live preview */}
                <div
                  className="h-8 rounded-lg mt-3 border border-white/10"
                  style={{
                    background: `linear-gradient(${cfg.bgAngle}deg, ${cfg.bg1}, ${cfg.bg2}, ${cfg.bg3})`,
                  }}
                />
              </Section>

              {/* Blob Colors */}
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
                <ColorRow
                  label="Blob 3"
                  id="blob3"
                  value={cfg.blob3}
                  onChange={set}
                />
              </Section>

              {/* Logo / Button Gradient */}
              <Section title="Accent Gradient">
                <ColorRow
                  label="Start"
                  id="logo1"
                  value={cfg.logo1}
                  onChange={set}
                />
                <ColorRow
                  label="End"
                  id="logo2"
                  value={cfg.logo2}
                  onChange={set}
                />
                <div
                  className="h-6 rounded-lg mt-2 border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.logo1}, ${cfg.logo2})`,
                  }}
                />
              </Section>

              {/* Font Colors */}
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
                  style={{
                    background: `linear-gradient(135deg, ${cfg.titleC1}, ${cfg.titleC2}, ${cfg.titleC3})`,
                  }}
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
                <ColorRow
                  label="Links"
                  id="linkC"
                  value={cfg.linkC}
                  onChange={set}
                />
              </Section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div
              className="absolute -inset-0.5 rounded-3xl opacity-20 blur-xl"
              style={{
                background: `linear-gradient(135deg, ${cfg.logo1}, ${cfg.logo2})`,
              }}
            />
            <div className="relative">
              {/* Logo */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.logo1}, ${cfg.logo2})`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${cfg.logo1}88`,
                      `0 0 40px ${cfg.logo2}88`,
                      `0 0 20px ${cfg.logo1}88`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <h1
                  className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${cfg.titleC1}, ${cfg.titleC2}, ${cfg.titleC3})`,
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  PARAM-AI
                </h1>
                <p className="text-sm" style={{ color: cfg.subtitleC }}>
                  Advanced Intelligence Platform
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: cfg.labelC }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: cfg.logo1 }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: cfg.labelC }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: cfg.logo2 }}
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm hover:opacity-80 transition-colors"
                    style={{ color: cfg.logo2 }}
                  >
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  className="w-full relative overflow-hidden rounded-xl py-3 font-semibold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${cfg.logo1}, ${cfg.logo2})`,
                    }}
                  />
                  <span className="relative z-10">Sign In</span>
                </motion.button>
              </form>

              {/* Sign up link directly after form */}
              <div
                className="mt-6 text-center text-sm"
                style={{ color: cfg.subtitleC }}
              >
                Don't have an account?{" "}
                <button
                  className="font-semibold hover:opacity-80 transition-colors"
                  style={{ color: cfg.linkC }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
