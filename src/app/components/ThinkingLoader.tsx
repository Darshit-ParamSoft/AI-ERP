import { motion } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThinkingLoader() {
  const [currentText, setCurrentText] = useState(0);
  
  const thinkingTexts = [
    'Analyzing your request...',
    'Processing data...',
    'Generating response...',
    'Fetching insights...',
    'Almost there...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % thinkingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 justify-start"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      <div className="max-w-2xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          {/* Animated Circle */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="w-20 h-20 rounded-full border-4 border-purple-500/30"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  borderTopColor: 'rgb(168, 85, 247)',
                  borderRightColor: 'rgb(6, 182, 212)',
                }}
              />
              
              {/* Inner sparkle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </motion.div>
            </div>
          </div>

          {/* Animated Text */}
          <motion.p
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white text-center font-medium"
          >
            {thinkingTexts[currentText]}
          </motion.p>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: '50%',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
