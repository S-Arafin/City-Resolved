import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Upload, CheckCircle } from "lucide-react"; // Icons for form
import { FaCity, FaShieldAlt, FaBolt, FaArrowRight, FaUsers, FaHandHoldingHeart } from "react-icons/fa"; // Icons for branding
import Swal from "sweetalert2";
import axios from "axios";
import { imageUpload } from "../../Components/Elements/ImageUpload"; // Ensure path is correct
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  // --- 1. HANDLERS ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadProgress(1);

    try {
      const url = await imageUpload(file, (progress) => {
        setUploadProgress(progress);
      });
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      setUploadProgress(0);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "warning");
      return;
    }

    if (!imageUrl) {
      Swal.fire("Error", "Please wait for image upload to complete", "warning");
      return;
    }

    setLoading(true);

    try {
      // 1. Create User in Firebase
      await createUser(email, password);

      // 2. Update Firebase Profile
      await updateUser(name, imageUrl);

      // 3. Save to Database
      const userInfo = {
        name: name,
        email: email,
        photo: imageUrl,
      };

      await axios.post(
        "https://city-resolved-backend.vercel.app/users",
        userInfo
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to City Resolved!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.error?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // --- 2. ANIMATION VARIANTS ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-200">
      
      {/* --- LEFT SIDE: BRANDING & INFO --- */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12 text-primary-content lg:min-h-screen">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-lg space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                        <FaCity className="text-4xl" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">City Resolved</h1>
                </div>
                <h2 className="text-5xl font-bold leading-tight mb-6">
                    Join the <br /> <span className="text-secondary">Community Today.</span>
                </h2>
                <p className="text-lg opacity-80 leading-relaxed">
                    Become a changemaker. Your voice matters in shaping the future of our city. Sign up to report issues and see them resolved.
                </p>
            </motion.div>

            {/* Features List (Slightly different from Login to fit Register context) */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid gap-6 mt-8"
            >
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <FaUsers className="text-2xl text-accent" />
                    <div>
                        <h4 className="font-bold">Community Driven</h4>
                        <p className="text-sm opacity-70">Connect with neighbors and local leaders.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <FaHandHoldingHeart className="text-2xl text-yellow-300" />
                    <div>
                        <h4 className="font-bold">Impactful Actions</h4>
                        <p className="text-sm opacity-70">Directly contribute to a cleaner, safer city.</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      {/* Sticky layout logic applied here */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200"
        >
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-base-content mb-2">Create Account</h2>
              <p className="text-base-content/60">Fill in your details to get started.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full focus:input-primary bg-base-200/50 focus:bg-base-100 transition-all"
                  required
                />
              </div>

              {/* Profile Photo Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Profile Photo</span>
                </label>
                <div className="relative border-2 border-dashed border-base-300 rounded-lg p-4 hover:border-primary transition-colors text-center cursor-pointer h-32 flex flex-col justify-center items-center bg-base-200/30">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required={!imageUrl}
                  />

                  {uploadProgress > 0 && uploadProgress < 100 ? (
                    <div className="w-full px-4">
                      <progress
                        className="progress progress-primary w-full"
                        value={uploadProgress}
                        max="100"
                      ></progress>
                      <p className="text-xs text-center mt-1 font-semibold">
                        {uploadProgress}% Uploading...
                      </p>
                    </div>
                  ) : imageUrl ? (
                    <div className="flex flex-col items-center text-success animate-in zoom-in duration-300">
                      <CheckCircle size={32} className="mb-2" />
                      <span className="text-sm font-bold">
                        Image Uploaded Successfully
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-base-content/60">
                      <Upload size={24} className="mb-2" />
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs opacity-60">(Max 2MB)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="citizen@example.com"
                  className="input input-bordered w-full focus:input-primary bg-base-200/50 focus:bg-base-100 transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:input-primary bg-base-200/50 focus:bg-base-100 transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={loading || (uploadProgress > 0 && uploadProgress < 100)}
                  className="btn btn-primary w-full h-12 text-lg shadow-lg shadow-primary/30"
                >
                  {loading ? <Loader /> : (
                      <span className="flex items-center gap-2">
                          Sign Up <FaArrowRight size={14} />
                      </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="link link-primary font-bold hover:text-primary-focus transition-colors">
                    Login here
                    </Link>
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;