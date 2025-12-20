import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Shared/Loader";
import {
  FaTasks,
  FaArrowUp,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const AssignedIssues = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/issues/assigned/${user.email}`
      );
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      return axios.patch(`http://localhost:3000/issues/status/${id}`, {
        status: newStatus,
        userEmail: user.email,
        userName: user.displayName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-issues"]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });

  const handleStatusChange = (id, e) => {
    const newStatus = e.target.value;
    if (newStatus) {
      statusMutation.mutate({ id, newStatus });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaTasks /> My Assigned Tasks
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-200">
        <table className="table">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>Issue Details</th>
              <th>Priority</th>
              <th>Current Status</th>
              <th>Update Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className={issue.priority === "high" ? "bg-orange-50" : ""}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={issue.photo} alt="Issue" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{issue.title}</div>
                      <div className="text-sm opacity-50 flex items-center gap-1">
                        <FaMapMarkerAlt /> {issue.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {issue.priority === "high" ? (
                    <div className="badge badge-error text-white gap-1 font-bold animate-pulse">
                      <FaArrowUp /> High
                    </div>
                  ) : (
                    <div className="badge badge-ghost">Normal</div>
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      issue.status === "resolved"
                        ? "badge-success"
                        : issue.status === "closed"
                        ? "badge-neutral"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : "badge-warning"
                    } capitalize font-semibold`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm w-full max-w-xs focus:select-primary"
                    defaultValue={issue.status}
                    onChange={(e) => handleStatusChange(issue._id, e)}
                    disabled={issue.status === "closed"}
                  >
                    <option disabled>Change Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <th>
                  <Link
                    to={`/issues/${issue._id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    View Details
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {issues.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <FaCheckCircle className="text-4xl mx-auto mb-2 text-success opacity-50" />
            <p>No pending tasks! Great job.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedIssues;
