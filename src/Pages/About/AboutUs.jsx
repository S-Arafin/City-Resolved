import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCity, FaHandshake, FaChartLine, FaCheckDouble } from 'react-icons/fa';

// --- CUSTOM SKELETON COMPONENT ---
const AboutSkeleton = () => {
  return (
    <div className="min-h-screen font-sans bg-base-100 pb-20 pt-24 px-6 animate-pulse">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="h-4 w-32 bg-base-300 rounded-full"></div>
            <div className="h-16 w-3/4 bg-base-300 rounded-xl"></div>
            <div className="h-16 w-1/2 bg-base-300 rounded-xl"></div>
            <div className="h-24 w-full max-w-md bg-base-300 rounded-xl mt-4"></div>
            
            <div className="flex gap-8 mt-8 border-l-4 border-base-300 pl-6">
               <div className="h-16 w-24 bg-base-300 rounded-lg"></div>
               <div className="h-16 w-24 bg-base-300 rounded-lg"></div>
               <div className="h-16 w-24 bg-base-300 rounded-lg"></div>
            </div>
          </div>
          <div className="hidden lg:block h-96 w-full bg-base-300 rounded-[3rem]"></div>
        </div>

        {/* Mission Grid Skeleton */}
        <div className="mb-20">
            <div className="h-10 w-64 bg-base-300 rounded-full mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 h-72 bg-base-300 rounded-[2rem]"></div>
                <div className="h-72 bg-base-300 rounded-[2rem]"></div>
                <div className="h-72 bg-base-300 rounded-[2rem]"></div>
                <div className="md:col-span-2 h-72 bg-base-300 rounded-[2rem]"></div>
            </div>
        </div>

        {/* Developer Profile Skeleton */}
        <div className="max-w-4xl mx-auto h-80 bg-base-300 rounded-[2rem]"></div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time (e.g. waiting for images/assets)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds load time
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const stats = [
    { label: "Issues Resolved", value: "500+", color: "text-primary" },
    { label: "Active Citizens", value: "2.4k", color: "text-secondary" },
    { label: "Cities Covered", value: "15", color: "text-accent" },
  ];

  if (isLoading) {
    return <AboutSkeleton />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-primary/30 text-base-content pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="relative z-10"
            >
                <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6 opacity-80">
                    <span className="h-px w-8 bg-primary"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About The Platform</span>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-none mb-6">
                    Building Better <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Cities Together.</span>
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-lg opacity-70 leading-relaxed max-w-lg mb-8">
                    <span className="font-bold text-base-content">City Resolved</span> is the digital infrastructure for modern citizenship. We replace red tape with transparency, turning frustration into action. Report issues, track progress, and watch your city transform.
                </motion.p>

                {/* Stats Row */}
                <motion.div variants={fadeInUp} className="flex gap-8 md:gap-12 border-l-4 border-base-300 pl-6">
                    {stats.map((stat, idx) => (
                        <div key={idx}>
                            <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-50">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Right Visual (Abstract City) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative hidden lg:block"
            >
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="space-y-4 mt-12">
                        <div className="h-40 bg-gradient-to-br from-base-100 to-base-200 rounded-3xl shadow-xl border border-white/10 w-full" />
                        <div className="h-64 bg-primary/10 rounded-3xl shadow-xl border border-primary/20 w-full flex items-center justify-center">
                            <FaCity className="text-6xl text-primary opacity-20" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-64 bg-secondary/10 rounded-3xl shadow-xl border border-secondary/20 w-full flex items-center justify-center">
                            <FaChartLine className="text-6xl text-secondary opacity-20" />
                        </div>
                        <div className="h-40 bg-gradient-to-br from-base-100 to-base-200 rounded-3xl shadow-xl border border-white/10 w-full" />
                    </div>
                </div>
                {/* Decorative BG Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
            </motion.div>
        </div>
      </section>


      {/* --- MISSION GRID (Bento Style) --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-black mb-4">Why City Resolved?</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 p-8 md:p-12 rounded-[2rem] bg-base-100 border border-base-200 shadow-xl relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <FaCheckDouble size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Radical Transparency</h3>
                        <p className="opacity-70 leading-relaxed max-w-md">No more "ticket closed" without explanation. Every report is tracked on a public ledger. You see exactly when an issue is received, reviewed, and resolved.</p>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-10 translate-y-10">
                        <FaCheckDouble size={200} />
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 md:p-12 rounded-[2rem] bg-base-200 border border-base-300 shadow-xl"
                >
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                        <FaHandshake size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Community First</h3>
                    <p className="opacity-70 text-sm">Empowering neighborhoods to prioritize what matters most to them, not just the politicians.</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-primary to-accent text-white shadow-xl"
                >
                    <h3 className="text-xl font-bold mb-3">Real-Time Data</h3>
                    <p className="opacity-90 text-sm mb-6">Using geolocation and live updates to create a responsive city grid.</p>
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-white animate-pulse" />
                    </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 p-8 md:p-12 rounded-[2rem] bg-base-100 border border-base-200 shadow-xl relative overflow-hidden"
                >
                   <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-3">Bridging the Gap</h3>
                            <p className="opacity-70">We act as the official communication layer between residents and municipal authorities, ensuring no voice goes unheard.</p>
                        </div>
                        
                   </div>
                </motion.div>
            </div>
        </div>
      </section>


      {/* --- DEVELOPER PROFILE (Minimalist Tech Card) --- */}
      <section className="py-20 px-6 relative">
         <div className="max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-base-100/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-1 shadow-2xl overflow-hidden"
            >
                {/* Top decorative bar */}
                <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                    
                    {/* Image Column */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full" />
                        <img 
                            src="https://github.com/S-Arafin.png" 
                            alt="Developer" 
                            className="w-40 h-40 rounded-2xl object-cover shadow-lg border-2 border-base-content/10 relative z-10 rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                        <div className="absolute -bottom-4 -right-4 z-20 bg-base-100 py-1 px-3 rounded-full text-xs font-bold border border-base-300 shadow-sm flex items-center gap-2">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                             Online
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="text-center md:text-left flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Architect & Developer</h4>
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Sultanul Arafin</h2>
                        <p className="opacity-70 mb-8 leading-relaxed">
                            Full-Stack Developer passionate about <span className="text-base-content font-bold border-b-2 border-primary/30">Civic Tech</span>. I built City Resolved to prove that technology can do more than just entertain—it can fix the potholes in our streets and the gaps in our community.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                             <a href="https://github.com/S-Arafin" target="_blank" rel="noreferrer" className="btn btn-outline hover:bg-base-content hover:text-base-100 gap-2 rounded-xl transition-all">
                                <FaGithub size={18} /> GitHub
                             </a>
                             <a href="https://linkedin.com/in/sultanul-arafin" target="_blank" rel="noreferrer" className="btn btn-outline hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white gap-2 rounded-xl transition-all">
                                <FaLinkedin size={18} /> LinkedIn
                             </a>
                             <a href="mailto:arafin23103@gmail.com" className="btn btn-primary text-secondary gap-2 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                <FaEnvelope size={18} /> Contact Me
                             </a>
                        </div>
                    </div>

                </div>
            </motion.div>
         </div>
      </section>

    </div>
  );
};

export default AboutUs;