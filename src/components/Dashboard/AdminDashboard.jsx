import React, { useContext } from "react";
import { motion } from "framer-motion";
import Header from "../../other/Header";
import CreateTask from "../../other/CreateTask";
import AllTask from "../../other/AllTask";
import { AuthContext } from "../../context/AuthProvider";

const AdminDashboard = ({ changeUser }) => {
  const authData = useContext(AuthContext);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#09090b] via-[#0a0a0d] to-[#09090b] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-8"
        >
          <Header changeUser={changeUser} />
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]"
        >
          {/* Command Center Card - Spans full width on mobile, 2/3 on desktop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="lg:col-span-8"
          >
            <CreateTask />
          </motion.div>

          {/* Live Feed Card - Spans full width on mobile, 1/3 on desktop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              },
            }}
            className="lg:col-span-4"
          >
            <AllTask data={authData} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
