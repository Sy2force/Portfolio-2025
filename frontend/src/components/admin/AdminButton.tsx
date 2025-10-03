import { motion } from 'framer-motion';
import { FaEdit, FaPlus, FaCog } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';

interface AdminButtonProps {
  type: 'edit' | 'add' | 'settings';
  onClick?: () => void;
  href?: string;
  className?: string;
  tooltip?: string;
}

const AdminButton = ({ type, onClick, href, className = '', tooltip }: AdminButtonProps) => {
  const { isAdmin } = useAdmin();

  // Don't render if not admin
  if (!isAdmin) return null;

  const icons = {
    edit: FaEdit,
    add: FaPlus,
    settings: FaCog,
  };

  const colors = {
    edit: 'from-blue-500 to-cyan-500',
    add: 'from-green-500 to-emerald-500',
    settings: 'from-purple-500 to-pink-500',
  };

  const Icon = icons[type];
  const color = colors[type];

  const ButtonContent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        relative p-3 rounded-full bg-gradient-to-r ${color} 
        shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-neon-blue/30 
        transition-all cursor-pointer group ${className}
      `}
      onClick={onClick}
      title={tooltip}
    >
      <Icon className="text-white text-lg" />
      
      {/* Tooltip */}
      {tooltip && (
        <span className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 
          bg-black/90 text-white text-xs rounded-lg whitespace-nowrap 
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
        ">
          {tooltip}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} className="fixed z-40">
        <ButtonContent />
      </Link>
    );
  }

  return <div className="fixed z-40"><ButtonContent /></div>;
};

export default AdminButton;
