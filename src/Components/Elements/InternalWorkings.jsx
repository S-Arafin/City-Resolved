import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, CheckCircle } from 'lucide-react';
import { FaCamera } from 'react-icons/fa6';

const steps = [
  {
    id: 1,
    title: "Snap & Upload",
    description: "Spot a problem? Take a photo directly through our app. Our AI automatically detects the type of waste or hazard.",
    icon: <FaCamera className="w-8 h-8 text-white" />,
    bg: "bg-info",
  },
  {
    id: 2,
    title: "Geo-Verification",
    description: "We tag the exact GPS coordinates. No need to explain addresses—the map pin tells authorities exactly where to go.",
    icon: <MapPin className="w-8 h-8 text-white" />,
    bg: "bg-secondary",
  },
  {
    id: 3,
    title: "Authority Alert",
    description: "The report is instantly routed to the correct local department or community cleanup group for immediate action.",
    icon: <Users className="w-8 h-8 text-white" />,
    bg: "bg-accent",
  },
  {
    id: 4,
    title: "Resolution",
    description: "Once cleaned, a 'Resolved' photo is uploaded. You get a notification, and the city gets a little bit greener.",
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    bg: "bg-success",
  },
];

const InternalWorkings = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-base-content"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-base-content/70"
          >
            Turning a complaint into a solution is easier than you think. 
            We bridge the gap between citizens and solutions in four simple steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
    
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-base-300 -z-10 transform -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center bg-base-100 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2">
                
                <div className={`relative w-24 h-24 mb-6 rounded-full flex items-center justify-center shadow-lg ${step.bg} ring-8 ring-base-100`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-base-content text-base-100 rounded-full flex items-center justify-center font-bold text-sm border-4 border-base-100">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-base-content/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalWorkings;