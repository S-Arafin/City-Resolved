import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import {
  MapPin,
  Camera,
  Bell,
  BarChart2,
  Users,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Geo-Tagging",
    desc: "Pinpoint exact locations of waste or hazards.",
    icon: <MapPin size={40} className="text-primary" />,
    img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Visual Evidence",
    desc: "Upload photos to validate reports instantly.",
    icon: <Camera size={40} className="text-secondary" />,
    img: "https://images.unsplash.com/photo-1607783823089-f2facd2c0493?q=80&w=765&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Real-Time Alerts",
    desc: "Get notified when authorities resolve your report.",
    icon: <Bell size={40} className="text-accent" />,
    img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Data Analytics",
    desc: "View city-wide statistics on cleanup progress.",
    icon: <BarChart2 size={40} className="text-info" />,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Community Action",
    desc: "Organize local cleanup drives together.",
    icon: <Users size={40} className="text-success" />,
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Secure & Anonymous",
    desc: "Report issues safely without fear.",
    icon: <ShieldCheck size={40} className="text-warning" />,
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop",
  },
];

const Feature = () => {
  // Duplicate for infinite loop illusion if needed, though Swiper loop handles it
  const displayFeatures = [...features, ...features];

  return (
    <section className="py-24 bg-base-200 overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
          Platform <span className="text-primary">Features</span>
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Powerful tools designed to fulfill your responsibility as a citizen.
        </p>
      </div>

      <div className="relative w-full">
        {/* --- Refined Gradients for Smooth Fade (No hard blur lines) --- */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-base-200 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-base-200 to-transparent pointer-events-none" />

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          speed={800}
          initialSlide={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false, // Disabled default shadows for cleaner look
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full py-10 pb-16"
        >
          {displayFeatures.map((feature, index) => (
            <SwiperSlide key={`${feature.id}-${index}`} className="!w-[280px] md:!w-[340px]">
              <div className="card bg-base-100 shadow-2xl h-[420px] rounded-3xl overflow-hidden border border-base-content/5 group hover:border-primary/50 transition-colors duration-300">
                
                {/* Image Area */}
                <figure className="h-1/2 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent z-10" />
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>

                {/* Content Area */}
                <div className="card-body h-1/2 items-center text-center p-6 relative z-20">
                  <div className="-mt-12 mb-3 bg-base-100 p-4 rounded-2xl shadow-lg border border-base-200 transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: oklch(var(--bc));
          opacity: 0.2;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: oklch(var(--p));
          width: 24px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Feature;