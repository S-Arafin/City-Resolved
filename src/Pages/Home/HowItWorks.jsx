import React from "react";
import { Link } from "react-router";
import {
  FaCamera,
  FaUserTie,
  FaTools,
  FaCheckCircle,
  FaMobileAlt,
  FaCrown,
  FaBell,
  FaChartLine,
  FaMapMarkedAlt,
  FaUsers,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const steps = [
  { icon: <FaCamera />, title: "Report Issue", desc: "Submit issues with photo, location, and details." },
  { icon: <FaUserTie />, title: "Admin Review", desc: "Admins verify and assign issues." },
  { icon: <FaTools />, title: "Work Begins", desc: "Staff starts fixing the issue." },
  { icon: <FaCheckCircle />, title: "Resolved", desc: "Issue is fixed and verified." },

  { icon: <FaBell />, title: "Live Updates", desc: "Get real-time notifications." },
  { icon: <FaMapMarkedAlt />, title: "Location Tracking", desc: "Map-based issue tracking." },
  { icon: <FaUsers />, title: "Community Voting", desc: "Upvote important issues." },
  { icon: <FaClock />, title: "Fast Resolution", desc: "Priority handling for urgent cases." },

  { icon: <FaMobileAlt />, title: "Mobile Friendly", desc: "Report issues from anywhere." },
  { icon: <FaChartLine />, title: "Analytics", desc: "Admins track city performance." },
  { icon: <FaShieldAlt />, title: "Secure System", desc: "JWT & Firebase authentication." },
  { icon: <FaCrown />, title: "Premium Access", desc: "Unlimited reports & priority tags." },
];

const HowItWorks = ({ embedded = false }) => {
  return (
    <section className={`${embedded ? "py-20" : "min-h-screen"} bg-base-100`}>
      {!embedded && (
        <div className="hero bg-base-200 py-16">
          <div className="hero-content text-center max-w-3xl">
            <h1 className="text-5xl font-bold text-primary">How It Works</h1>
            <p className="mt-4 text-gray-500">
              From reporting to resolution — complete transparency at every step.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Platform <span className="text-primary">Workflow</span>
          </h2>
          <p className="text-gray-500 mt-2">
            12 core features powering CityResolved
          </p>
        </div>

        {/* ====== 4 x 3 GRID ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition"
            >
              <div className="card-body items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl mb-4">
                  {step.icon}
                </div>
                <h3 className="card-title">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {!embedded && (
          <div className="text-center mt-16">
            <Link
              to="/dashboard/report-issue"
              className="btn btn-primary btn-lg"
            >
              Report an Issue
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
