import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCog } from 'react-icons/hi';

const AdminButtonSimple = () => {
  return (
    <Link to="/admin">
      <motion.div
        className="fixed bottom-6 right-6 z-50 group"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-neon-blue to-neon-purple p-4 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <HiCog className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-dark-secondary/90 backdrop-blur-sm rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          <span className="text-sm font-medium text-white flex items-center gap-2">
            🔧 Espace Admin
          </span>
          <div className="absolute top-full right-4 w-2 h-2 bg-dark-secondary/90 rotate-45 -mt-1 border-r border-b border-white/10" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default AdminButtonSimple;
