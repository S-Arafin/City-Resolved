import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserCircle, FaEnvelope, FaCrown, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../../Components/Shared/Loader";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: [user?.email, 'profile'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto my-6 md:my-10 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-200">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary to-secondary relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 md:-bottom-16">
                <div className="avatar">
                    <div className="w-24 md:w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} alt="Profile" />
                    </div>
                </div>
            </div>
        </div>
        
        <div className="pt-16 pb-6 px-4 md:pt-20 md:pb-8 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold flex flex-col md:flex-row items-center gap-2">
                        {user?.displayName}
                        {dbUser?.isVerified && (
                             <div className="badge badge-warning gap-1 p-3">
                                <FaCrown /> Premium
                             </div>
                        )}
                    </h1>
                    <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 mt-2">
                        <FaEnvelope /> {user?.email}
                    </p>
                    <div className="mt-2">
                         <span className="badge badge-ghost uppercase font-bold tracking-widest">
                            {dbUser?.role}
                         </span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-end">
                     {dbUser?.role === 'citizen' && !dbUser?.isVerified && (
                        <div className="card bg-base-200 p-4 border border-base-300 w-full max-w-sm md:w-72">
                            <h3 className="font-bold text-lg mb-2 text-center md:text-left">Upgrade to Premium</h3>
                            <p className="text-xs mb-4 text-center md:text-left">Post unlimited issues and get priority support.</p>
                            <Link 
                                to="/dashboard/payment" 
                                state={{ price: 1000, type: 'subscription' }}
                                className="btn btn-primary btn-sm w-full"
                            >
                                <FaCrown /> Subscribe (1000tk)
                            </Link>
                        </div>
                     )}

                     <button className="btn btn-outline btn-sm w-full md:w-auto">
                        Edit Profile
                     </button>
                </div>
            </div>

            {dbUser?.isBlocked && (
                <div className="alert alert-error mt-6">
                    <FaShieldAlt />
                    <div>
                        <h3 className="font-bold">Account Blocked</h3>
                        <div className="text-xs">
                            Your account has been restricted by the admin. You cannot post new issues.
                            Please contact the authorities for more information.
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;