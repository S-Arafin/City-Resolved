import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaCity, FaCode, FaHeart, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-base-200 text-base-content border-t border-base-300 overflow-hidden font-sans">
      
      {/* --- Ambient Background Glow (Theme Aware) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* --- Column 1: Brand Info --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content shadow-lg">
                  <FaCity size={20} />
               </div>
               <h1 className="text-2xl font-black tracking-tighter uppercase">
                City<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Resolved</span>
              </h1>
            </div>
            <p className="text-sm opacity-70 leading-relaxed font-medium max-w-xs">
              Empowering citizens to build better cities. Report issues, track resolutions, and bridge the gap between community and administration.
            </p>
          </div>

          {/* --- Column 2: Navigation --- */}
          <div>
            <h2 className="font-black mb-6 uppercase tracking-widest text-xs border-b border-base-content/10 pb-2 w-fit text-primary">
              Navigation
            </h2>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/issues", label: "Reported Issues" },
                { to: "/community-stats", label: "City Stats" },
                { to: "/auth/login", label: "Login / Join" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="opacity-70 hover:opacity-100 hover:text-primary hover:pl-2 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: The Developer --- */}
          <div>
            <h2 className="font-black mb-6 uppercase tracking-widest text-xs border-b border-base-content/10 pb-2 w-fit text-primary">
              The Developer
            </h2>
            
            <div className="p-4 rounded-2xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src="https://github.com/S-Arafin.png" alt="Sultanul Arafin" loading="lazy" />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm group-hover:text-primary transition-colors">Sultanul Arafin</p>
                        <p className="text-[10px] uppercase font-bold opacity-50 tracking-wider">Full-Stack Dev</p>
                    </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-base-200 justify-between">
                    <a href="https://www.facebook.com/profile.php?id=61577959433561" target="_blank" rel="noreferrer" className="btn btn-xs btn-circle btn-ghost hover:bg-base-200 hover:text-[#1877F2]">
                        <FaFacebook size={14} />
                    </a>
                    <a href="https://github.com/S-Arafin" target="_blank" rel="noreferrer" className="btn btn-xs btn-circle btn-ghost hover:bg-base-200 hover:text-base-content">
                        <FaGithub size={14} />
                    </a>
                    <a href="https://linkedin.com/in/sultanul-arafin" target="_blank" rel="noreferrer" className="btn btn-xs btn-circle btn-ghost hover:bg-base-200 hover:text-[#0A66C2]">
                        <FaLinkedinIn size={14} />
                    </a>
                    <a href="mailto:arafin23103@gmail.com" className="btn btn-xs btn-circle btn-ghost hover:bg-base-200 hover:text-red-500">
                        <FaEnvelope size={14} />
                    </a>
                </div>
            </div>
          </div>

          {/* --- Column 4: Contact --- */}
          <div>
            <h2 className="font-black mb-6 uppercase tracking-widest text-xs border-b border-base-content/10 pb-2 w-fit text-primary">
              Contact Us
            </h2>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-[-2px]">
                    <FaMapMarkerAlt size={14} />
                </div>
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                 <div className="p-2 bg-secondary/10 rounded-lg text-secondary mt-[-2px]">
                    <FaPhoneAlt size={14} />
                </div>
                <span>+8801979817736</span>
              </li>
              <li className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="p-2 bg-accent/10 rounded-lg text-accent mt-[-2px]">
                    <FaEnvelope size={14} />
                </div>
                <span className="break-all">arafin23103@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="relative z-10 border-t border-base-300 bg-base-300/30">
        <div className="container mx-auto px-6 py-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-center md:text-left">
            © {new Date().getFullYear()} City Resolved. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
             <div className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-default">
               <FaCode className="text-primary" /> 
               <span>MERN Stack</span>
             </div>
             <div className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-default">
               <FaHeart className="text-red-500" /> 
               <span>Built with Passion</span>
             </div>
          </div>

          <motion.button 
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-circle btn-primary text-primary-content border-none shadow-lg relative group overflow-hidden"
            aria-label="Back to Top"
          >
            <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <FaArrowUp size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;