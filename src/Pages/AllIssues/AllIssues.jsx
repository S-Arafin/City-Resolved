import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { FaSearch, FaMapMarkerAlt, FaThumbsUp, FaArrowUp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../../Components/Shared/Loader';

const AllIssues = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    // Filter States
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');

    // Fetch Issues
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['all-issues', search, status, category],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/issues`, {
                params: { search, status, category }
            });
            return res.data;
        }
    });

    // Upvote Mutation
    const upvoteMutation = useMutation({
        mutationFn: async (issueId) => {
            if (!user) {
                navigate('/auth/login');
                throw new Error("Please login");
            }
            const res = await axios.patch(`http://localhost:3000/issues/upvote/${issueId}`, {
                userEmail: user.email
            });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.message) {
                Swal.fire('Notice', data.message, 'warning');
            } else {
                queryClient.invalidateQueries(['all-issues']); // Refresh UI
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Upvoted!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setCategory('');
    };

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-primary">Reported Issues</h2>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {/* Search */}
                    <div className="join w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search issues..." 
                            className="input input-bordered join-item w-full md:w-64" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary join-item"><FaSearch /></button>
                    </div>

                    {/* Filters */}
                    <select 
                        className="select select-bordered" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <select 
                        className="select select-bordered"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Roads">Roads</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Water">Water</option>
                        <option value="Garbage">Garbage</option>
                    </select>

                    <button onClick={handleReset} className="btn btn-ghost">Reset</button>
                </div>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map(issue => (
                    <div key={issue._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
                        {/* Priority Badge */}
                        {issue.priority === 'high' && (
                             <div className="absolute top-4 right-4 z-10">
                                <span className="badge badge-error gap-1 animate-pulse">
                                    <FaArrowUp /> High Priority
                                </span>
                             </div>
                        )}

                        <figure className="h-48 overflow-hidden relative">
                            <img 
                                src={issue.photo || "https://via.placeholder.com/400x200?text=No+Image"} 
                                alt={issue.title} 
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-2 left-2 badge badge-neutral opacity-80">
                                {issue.category}
                            </div>
                        </figure>
                        
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start">
                                <h2 className="card-title text-lg font-bold truncate w-2/3">
                                    {issue.title}
                                </h2>
                                <span className={`badge ${
                                    issue.status === 'resolved' ? 'badge-success' : 
                                    issue.status === 'in-progress' ? 'badge-info' : 'badge-warning'
                                } capitalize`}>
                                    {issue.status}
                                </span>
                            </div>
                            
                            <p className="flex items-center gap-2 text-sm text-gray-500 my-2">
                                <FaMapMarkerAlt className="text-primary" /> {issue.location}
                            </p>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 h-10">
                                {issue.description}
                            </p>

                            <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                                <button 
                                    onClick={() => upvoteMutation.mutate(issue._id)}
                                    className="btn btn-sm btn-ghost hover:text-primary gap-2"
                                >
                                    <FaThumbsUp className={issue.upvotedBy?.includes(user?.email) ? "text-primary" : ""} /> 
                                    <span>{issue.upvotes}</span>
                                </button>
                                
                                <Link to={`/issues/${issue._id}`} className="btn btn-sm btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {issues.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-400">No issues found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default AllIssues;