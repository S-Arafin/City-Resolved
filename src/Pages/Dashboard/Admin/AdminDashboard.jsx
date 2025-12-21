import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader";
import { FaUsers, FaClipboardList, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AuthContext } from "../../../Context/AuthContext";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('http://localhost:3000/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    const data = [
        { name: 'Pending', value: stats.pendingIssues || 0 },
        { name: 'Resolved', value: stats.resolvedIssues || 0 },
    ];
    
    const COLORS = ['#FFBB28', '#00C49F'];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-secondary">{stats.totalUsers}</div>
                </div>

                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                    <div className="stat-figure text-primary">
                        <FaClipboardList className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Issues</div>
                    <div className="stat-value text-primary">{stats.totalIssues}</div>
                </div>

                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                    <div className="stat-figure text-success">
                        <FaMoneyBillWave className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-success">{stats.revenue} Tk</div>
                </div>
                
                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                     <div className="stat-figure text-warning">
                        <FaSpinner className="text-3xl" />
                    </div>
                    <div className="stat-title">Pending Issues</div>
                    <div className="stat-value text-warning">{stats.pendingIssues}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-bold mb-4">Issue Status Distribution</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                 <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-bold mb-4">System Health</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                            <span>Server Status</span>
                            <span className="badge badge-success">Online</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                            <span>Database Connection</span>
                            <span className="badge badge-success">Connected</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                            <span>Admin Access</span>
                            <span className="badge badge-primary">Authorized</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;