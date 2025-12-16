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
    desc: "Pinpoint exact locations of waste or hazards on an interactive city map.",
    icon: <MapPin size={48} className="text-primary" />,
    img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Visual Evidence",
    desc: "Upload photos directly from your phone to validate reports instantly.",
    icon: <Camera size={48} className="text-secondary" />,
    img: "https://images.unsplash.com/photo-1607783823089-f2facd2c0493?q=80&w=765&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Real-Time Alerts",
    desc: "Get notified when authorities acknowledge or resolve your report.",
    icon: <Bell size={48} className="text-accent" />,
    img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Data Analytics",
    desc: "View city-wide statistics on waste management and cleanup progress.",
    icon: <BarChart2 size={48} className="text-info" />,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Community Action",
    desc: "Organize or join local cleanup drives with fellow citizens.",
    icon: <Users size={48} className="text-success" />,
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Secure & Anonymous",
    desc: "Report issues safely without fear, with optional anonymity.",
    icon: <ShieldCheck size={48} className="text-warning" />,
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop",
  },
];

const Feature = () => {
  return (
    <section className="py-20 bg-base-200 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-base-content">
          Platform Features
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Powerful tools designed to fulfill your responsibility as a citizen.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={1}
        loop={true}
        loopedSlides={features.length}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full py-10"
      >
        {features.map((feature) => (
          <SwiperSlide key={feature.id} className="!w-[300px] md:!w-[350px]">
            <div className="card bg-base-100 shadow-xl h-[450px] border border-base-300 relative group overflow-hidden">
              <figure className="h-full w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </figure>

              <div className="card-body absolute bottom-0 z-20 w-full text-center items-center p-6 text-white">
                <div className="mb-4 bg-base-100/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-lg transform transition-transform duration-300 group-hover:-translate-y-2">
                  {feature.icon}
                </div>
                <h3 className="card-title text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-200 opacity-90">
                  {feature.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: oklch(var(--p));
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: oklch(var(--p));
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Feature;