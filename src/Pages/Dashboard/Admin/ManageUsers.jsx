import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUsers, FaBan, FaCheckCircle, FaCrown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", "citizen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=citizen");
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, isBlocked }) => {
      const res = await axiosSecure.patch(
        `/users/status/${id}`,
        { isBlocked }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });

  const handleStatusChange = (user) => {
    const action = user.isBlocked ? "Unblock" : "Block";
    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: user.isBlocked
        ? "They will be able to log in and report issues."
        : "They will not be able to report issues.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? "#36d399" : "#d33",
      confirmButtonText: `Yes, ${action} them!`,
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id: user._id, isBlocked: !user.isBlocked });
      }
    });
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // --- SKELETON LOADER ---
  if (isLoading)
    return (
      <div className="p-6 space-y-6">
        <div className="h-10 w-64 bg-base-300 rounded animate-pulse mb-6"></div>
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-200">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index} className="animate-pulse border-b border-base-200">
                  <th><div className="h-4 w-4 bg-base-300 rounded"></div></th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-base-300 rounded-xl"></div>
                      <div className="h-4 w-32 bg-base-300 rounded"></div>
                    </div>
                  </td>
                  <td><div className="h-4 w-48 bg-base-300 rounded"></div></td>
                  <td><div className="h-6 w-20 bg-base-300 rounded-full"></div></td>
                  <td><div className="h-4 w-16 bg-base-300 rounded"></div></td>
                  <td><div className="h-8 w-16 bg-base-300 rounded"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={rowVariants}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        <FaUsers /> Manage Citizens ({users.length})
      </motion.h2>

      <motion.div
        variants={rowVariants}
        className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-200"
      >
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  variants={rowVariants}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-base-50 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={user.photo || "https://i.pravatar.cc/150"}
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.isVerified ? (
                      <div className="badge badge-warning gap-1">
                        <FaCrown /> Premium
                      </div>
                    ) : (
                      <div className="badge badge-ghost">Free</div>
                    )}
                  </td>
                  <td>
                    {user.isBlocked ? (
                      <span className="text-error font-bold flex items-center gap-1">
                        <FaBan /> Blocked
                      </span>
                    ) : (
                      <span className="text-success font-bold flex items-center gap-1">
                        <FaCheckCircle /> Active
                      </span>
                    )}
                  </td>
                  <td>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(user)}
                      className={`btn btn-xs ${
                        user.isBlocked ? "btn-success" : "btn-error"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ManageUsers;