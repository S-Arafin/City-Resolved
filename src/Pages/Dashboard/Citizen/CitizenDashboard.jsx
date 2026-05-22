import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CitizenDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], isLoading: isIssuesLoading } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues/${user.email}`);
      return res.data;
    },
  });

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // 4. Show Skeleton Loader if Auth is checking OR Data is fetching
  if (authLoading || isIssuesLoading)
    return (
      <div className="p-6 space-y-6">
        <div className="h-10 w-64 bg-base-300 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-base-300 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-base-300 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );

  const totalIssues = issues.length;
  // Safety check: ensure issues is an array before filtering
  const pendingIssues = Array.isArray(issues)
    ? issues.filter((issue) => issue.status === "pending").length
    : 0;
  const resolvedIssues = Array.isArray(issues)
    ? issues.filter((issue) => issue.status === "resolved").length
    : 0;
  const inProgressIssues = Array.isArray(issues)
    ? issues.filter((issue) => issue.status === "in-progress").length
    : 0;

  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
        Welcome, {user?.displayName}!
      </motion.h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Issues */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200"
        >
          <div className="stat-figure text-primary">
            <FaClipboardList className="text-3xl" />
          </div>
          <div className="stat-title">Total Reported</div>
          <div className="stat-value text-primary">{totalIssues}</div>
          <div className="stat-desc">Issues submitted by you</div>
        </motion.div>

        {/* Pending */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200"
        >
          <div className="stat-figure text-warning">
            <FaSpinner className="text-3xl" />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">{pendingIssues}</div>
          <div className="stat-desc">Waiting for staff</div>
        </motion.div>

        {/* In Progress */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200"
        >
          <div className="stat-figure text-info">
            {/* Using a spinner icon instead of Loader component here to avoid layout shifts */}
            <FaSpinner className="text-3xl animate-spin" />
          </div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-info">{inProgressIssues}</div>
          <div className="stat-desc">Currently being fixed</div>
        </motion.div>

        {/* Resolved */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200"
        >
          <div className="stat-figure text-success">
            <FaCheckCircle className="text-3xl" />
          </div>
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">{resolvedIssues}</div>
          <div className="stat-desc">Successfully fixed</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="card bg-base-100 shadow-xl border border-base-200 p-6"
        >
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          {issues.length === 0 ? (
            <p className="text-gray-500">No issues reported yet.</p>
          ) : (
            <ul className="steps steps-vertical">
              {issues.slice(0, 3).map((issue) => (
                <li
                  key={issue._id}
                  className={`step step-${
                    issue.status === "resolved" ? "success" : "primary"
                  }`}
                >
                  {issue.title}{" "}
                  <span className="text-xs ml-2 opacity-60">
                    ({new Date(issue.createdAt).toLocaleDateString()})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CitizenDashboard;