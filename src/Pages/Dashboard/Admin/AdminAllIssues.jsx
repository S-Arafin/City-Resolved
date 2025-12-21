import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaClipboardList,
  FaUserPlus,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";
import Loader from "../../../Components/Shared/Loader";

const AdminAllIssues = () => {
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["all-issues-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ["staff-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=staff");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ issueId, staff }) => {
      return axiosSecure.patch(`/issues/${issueId}/assign`, {
        staffId: staff._id,
        staffName: staff.name,
        staffEmail: staff.email,
        staffPhoto: staff.photo,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-issues-admin"]);
      document.getElementById("assign_modal").close();
      Swal.fire(
        "Assigned!",
        "Staff has been assigned successfully.",
        "success"
      );
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/issues/${id}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-issues-admin"]);
      Swal.fire("Rejected", "Issue has been rejected.", "info");
    },
  });

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const staffId = e.target.staff.value;
    const selectedStaff = staffList.find((s) => s._id === staffId);

    if (selectedIssue && selectedStaff) {
      assignMutation.mutate({
        issueId: selectedIssue._id,
        staff: selectedStaff,
      });
    }
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this issue?",
      text: "It will be marked as invalid.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    document.getElementById("assign_modal").showModal();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaClipboardList /> All Reported Issues
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-200">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Issue</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={issue.photo} alt="Issue" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{issue.title}</div>
                      <div className="text-sm opacity-50">{issue.category}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      issue.status === "resolved"
                        ? "badge-success"
                        : issue.status === "rejected"
                        ? "badge-error"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : "badge-warning"
                    } capitalize`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  {issue.priority === "high" ? (
                    <div className="badge badge-error gap-1 text-white">
                      <FaArrowUp size={10} /> High
                    </div>
                  ) : (
                    <div className="badge badge-ghost">Normal</div>
                  )}
                </td>
                <td>
                  {issue.assignedStaff ? (
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <img src={issue.assignedStaff.photo} alt="Staff" />
                        </div>
                      </div>
                      <span className="font-semibold text-sm">
                        {issue.assignedStaff.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      Not assigned
                    </span>
                  )}
                </td>
                <th>
                  <div className="flex gap-2">
                    {!issue.assignedStaff &&
                      issue.status !== "rejected" &&
                      issue.status !== "resolved" && (
                        <button
                          onClick={() => openAssignModal(issue)}
                          className="btn btn-xs btn-primary gap-1"
                        >
                          <FaUserPlus /> Assign
                        </button>
                      )}

                    {issue.status === "pending" && (
                      <button
                        onClick={() => handleReject(issue._id)}
                        className="btn btn-xs btn-error btn-outline"
                      >
                        Reject
                      </button>
                    )}

                    {issue.assignedStaff && (
                      <span className="text-success text-xs flex items-center gap-1">
                        <FaCheckCircle /> Assigned
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="assign_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Staff Member</h3>
          <p className="py-2">
            Select a staff member to handle:{" "}
            <span className="font-bold">{selectedIssue?.title}</span>
          </p>

          <form onSubmit={handleAssignSubmit}>
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Available Staff</span>
              </label>
              <select name="staff" className="select select-bordered" required>
                <option disabled selected value="">
                  Select Staff...
                </option>
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} ({staff.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("assign_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Assignment
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminAllIssues;