import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Shared/Loader";
import { FaClipboardList, FaCheckCircle, FaArchive } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["staff-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/staff-stats/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const data = [
    { name: "Assigned", count: stats.totalAssigned || 0 },
    { name: "Resolved", count: stats.totalResolved || 0 },
    { name: "Closed", count: stats.totalClosed || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Staff Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
          <div className="stat-figure text-primary">
            <FaClipboardList className="text-3xl" />
          </div>
          <div className="stat-title">Assigned Issues</div>
          <div className="stat-value text-primary">{stats.totalAssigned}</div>
          <div className="stat-desc">Total tasks assigned to you</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
          <div className="stat-figure text-success">
            <FaCheckCircle className="text-3xl" />
          </div>
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">{stats.totalResolved}</div>
          <div className="stat-desc">Issues fixed</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
          <div className="stat-figure text-secondary">
            <FaArchive className="text-3xl" />
          </div>
          <div className="stat-title">Closed</div>
          <div className="stat-value text-secondary">{stats.totalClosed}</div>
          <div className="stat-desc">Finalized issues</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
        <h3 className="text-xl font-bold mb-4">Work Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;