import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Clock, Calendar, Heart } from 'lucide-react';

const Header = (props) => {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // User data logic (maintaining compatibility)
  useEffect(() => {
    if (props.data) {
      setUsername(props.data.firstName);
      setUserRole('Employee');
    } 
    else if (props.adminData) {
      setUsername(props.adminData.firstName);
      setUserRole('Admin');
    }
    else {
      const loggedInUserStr = localStorage.getItem('loggedInUser');
      if (loggedInUserStr) {
        try {
          const loggedInUser = JSON.parse(loggedInUserStr);
          if (loggedInUser && loggedInUser.data) {
            setUsername(loggedInUser.data.firstName);
            setUserRole(loggedInUser.role === 'admin' ? 'Admin' : 'Employee');
          } else {
            const adminData = JSON.parse(localStorage.getItem('admin'));
            if (adminData && adminData.length > 0) {
              setUsername(adminData[0].firstName);
              setUserRole('Admin');
            }
          }
        } catch (error) {
          console.error('Error parsing loggedInUser:', error);
        }
      } else {
        const adminData = JSON.parse(localStorage.getItem('admin'));
        if (adminData && adminData.length > 0) {
          setUsername(adminData[0].firstName);
          setUserRole('Admin');
        }
      }
    }
  }, [props.data, props.adminData]);

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '');
    if (props.changeUser) {
      props.changeUser(null);
    }
    navigate('/login');
  };

  // Format time and date
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const avatarInitial = username ? username.charAt(0).toUpperCase() : 'U';

  return (
    <motion.div
      className="relative flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:p-5 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Glassmorphism background overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-50" />
      
      {/* Left Section: Avatar & User Info */}
      <motion.div 
        className="flex items-center gap-3 sm:gap-4 md:gap-5"
        variants={itemVariants}
      >
        {/* Dynamic Avatar with Rotating Gradient Border */}
        <motion.div
          className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14 md:h-16 md:w-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* Rotating gradient border */}
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,#10b981_0deg,#3b82f6_90deg,#8b5cf6_180deg,#ec4899_270deg,#10b981_360deg)] p-[2px] animate-spin [animation-duration:3s]">
            <div className="h-full w-full rounded-full bg-[#1c1c1c]" />
          </div>
          
          {/* Avatar content with glow effect */}
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm shadow-lg ring-2 ring-white/10">
            <span className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl md:text-3xl">
              {avatarInitial}
            </span>
          </div>
          
          {/* Pulsing glow indicator */}
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 ring-2 ring-[#1c1c1c] sm:h-3.5 sm:w-3.5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* User Info Section */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {/* Welcome Back Text */}
          <motion.h1
            className="text-[10px] font-medium tracking-[0.15em] text-white/60 uppercase sm:text-xs"
            variants={itemVariants}
            style={{ letterSpacing: '0.15em' }}
          >
            Welcome Back
          </motion.h1>

          {/* Username & Status Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <motion.h2
              className="text-xl font-bold leading-none text-white drop-shadow-sm sm:text-2xl md:text-3xl"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {username || 'User'}
            </motion.h2>

            {/* Live Session Pill with Heartbeat */}
            <motion.div
              className="group relative flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent px-2.5 py-1 backdrop-blur-sm sm:px-3 sm:py-1.5"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing heart icon */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400 sm:h-3 sm:w-3" />
              </motion.div>
              
              <span className="text-[10px] font-semibold text-emerald-300 sm:text-xs">
                Live Session
              </span>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Section: Time Widget & Logout */}
      <motion.div
        className="flex items-center gap-3 sm:gap-4"
        variants={itemVariants}
      >
        {/* Real-time Clock/Date Widget */}
        <motion.div
          className="hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm sm:flex md:gap-3 md:px-4 md:py-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Clock className="h-3.5 w-3.5 text-white/70 md:h-4 md:w-4" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white md:text-sm">
              {formatTime(currentTime)}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-2.5 w-2.5 text-white/50 md:h-3 md:w-3" />
              <span className="text-[10px] text-white/60 md:text-xs">
                {formatDate(currentTime)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Glass-Action Logout Button */}
        <motion.button
          onClick={logOutUser}
          onMouseEnter={() => setIsHoveringLogout(true)}
          onMouseLeave={() => setIsHoveringLogout(false)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/90 hover:text-white active:scale-95 sm:px-5 sm:py-3 md:px-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* Background gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-crimson-600/0 via-crimson-600/0 to-crimson-600/0"
            animate={{
              background: isHoveringLogout
                ? 'linear-gradient(to right, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9))'
                : 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Text with slide effect */}
          <motion.span
            className="relative z-10 flex items-center gap-2"
            animate={{
              x: isHoveringLogout ? 0 : 0,
            }}
          >
            <span>Log Out</span>
            <motion.div
              animate={{
                x: isHoveringLogout ? 4 : -4,
                opacity: isHoveringLogout ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <LogOut className="h-4 w-4" />
            </motion.div>
          </motion.span>
          
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              translateX: isHoveringLogout ? ['-100%', '200%'] : '-100%',
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
