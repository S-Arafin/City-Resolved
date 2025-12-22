import React from "react";
import { Link } from "react-router";
import {
  FaCamera,
  FaUserTie,
  FaTools,
  FaCheckCircle,
  FaMobileAlt,
  FaCrown,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              How It Works
            </h1>
            <p className="py-4 text-lg text-gray-600">
              Our platform connects citizens directly with city officials to
              solve infrastructure problems faster and more transparently. Here
              is the journey of an issue from report to resolution.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 text-center p-6">
            <div className="w-16 h-16 bg-primary  rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              <FaCamera />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Report Issue</h3>
            <p className="text-gray-500 text-sm">
              Citizens snap a photo, add location details, and submit a report
              via the dashboard. Premium users get priority handling.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 text-center p-6">
            <div className="w-16 h-16 bg-secondary  rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              <FaUserTie />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Admin Review</h3>
            <p className="text-gray-500 text-sm">
              Admins verify the report. If valid, they assign it to the
              specialized staff member responsible for that zone or category.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 text-center p-6">
            <div className="w-16 h-16 bg-accent  rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              <FaTools />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Work Begins</h3>
            <p className="text-gray-500 text-sm">
              Field staff receive the task, travel to the location, and start
              repairs. Status updates to "In Progress" or "Working".
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 text-center p-6">
            <div className="w-16 h-16 bg-success  rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-bold mb-2">4. Resolved!</h3>
            <p className="text-gray-500 text-sm">
              Once fixed, staff marks it "Resolved". The citizen gets a
              notification, and the city becomes a little bit better.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-neutral text-neutral-content py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who Does What?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <FaMobileAlt className="text-5xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">The Citizen</h3>
              <ul className="text-sm space-y-2 opacity-80">
                <li>• Reports infrastructure issues</li>
                <li>• Tracks issue status in real-time</li>
                <li>• Upvotes important community problems</li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaUserTie className="text-5xl mb-4 text-secondary" />
              <h3 className="text-xl font-bold mb-2">The Admin</h3>
              <ul className="text-sm space-y-2 opacity-80">
                <li>• Oversees the entire dashboard</li>
                <li>• Assigns staff to specific tasks</li>
                <li>• Manages users and payments</li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaTools className="text-5xl mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">The Field Staff</h3>
              <ul className="text-sm space-y-2 opacity-80">
                <li>• Receives assigned tasks</li>
                <li>• Updates work status (Working/Resolved)</li>
                <li>• Verifies the fix on-site</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="bg-warning/20 p-8 rounded-2xl border border-warning">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4 text-gray-800">
              <FaCrown className="text-yellow-600" /> Premium Benefits
            </h3>
            <p className="text-gray-700 mb-4">
              Want your reports to be seen first? Upgrade to a Premium account
              to unlock special features.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Unlimited Issue Reporting (Free limit: 3)</li>
              <li>Priority Support from Admins</li>
              <li>"High Priority" tag on your submitted issues</li>
            </ul>
            <Link to="/auth/register" className="btn btn-warning w-full">
              Become a Premium Member
            </Link>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Join thousands of other citizens who are actively helping to
            maintain and improve our city's infrastructure. It takes less than 2
            minutes to file your first report.
          </p>
          <Link to="/dashboard/report-issue" className="btn btn-primary btn-lg">
            Report an Issue Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
