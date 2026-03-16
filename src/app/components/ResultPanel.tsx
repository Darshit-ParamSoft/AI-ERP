import { motion } from 'motion/react';
import { Download, BarChart3, Code2, Trash2, X } from 'lucide-react';

interface ResultPanelProps {
  onClose: () => void;
}

export default function ResultPanel({ onClose }: ResultPanelProps) {
  const sampleData = [
    { id: 1, metric: 'Total Users', value: '12,458', change: '+12.5%', status: 'positive' },
    { id: 2, metric: 'Revenue', value: '$48,392', change: '+8.2%', status: 'positive' },
    { id: 3, metric: 'Active Sessions', value: '3,247', change: '-2.3%', status: 'negative' },
    { id: 4, metric: 'Conversion Rate', value: '4.8%', change: '+1.2%', status: 'positive' },
    { id: 5, metric: 'Avg. Response Time', value: '1.2s', change: '-0.3s', status: 'positive' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Analysis Results
            </h3>
            <p className="text-sm text-gray-400">Generated on {new Date().toLocaleString()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 p-6 border-b border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">View Chart</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 transition-all"
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Show SQL</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-red-500/50 transition-all ml-auto"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium">Clear</span>
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Metric
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Change
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold text-lg">
                      {row.value}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      row.status === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {row.change}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === 'positive' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {row.status === 'positive' ? '↑ Increasing' : '↓ Decreasing'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-6 bg-white/5">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Total Records</p>
              <p className="text-lg font-semibold text-white">{sampleData.length}</p>
            </div>
            <div className="text-center border-l border-r border-white/10">
              <p className="text-xs text-gray-400 mb-1">Avg. Growth</p>
              <p className="text-lg font-semibold text-green-400">+7.8%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Processing Time</p>
              <p className="text-lg font-semibold text-cyan-400">2.3s</p>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="p-6 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Key Insights
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>User growth is trending positively with a 12.5% increase</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Revenue metrics show steady improvement across all segments</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-yellow-400 mt-0.5">!</span>
              <span>Active sessions showing slight decline, recommend investigation</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
