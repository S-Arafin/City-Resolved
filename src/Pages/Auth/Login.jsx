import React, { useContext, useState, useRef } from "react"; 
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../Components/Shared/Loader";

const Login = () => {
  const { signIn, signInWithGoogle, resetPass } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login successful.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      };

      await axios.post('http://localhost:3000/users', userInfo);

      Swal.fire({
        icon: "success",
        title: "Google Login",
        text: `Welcome ${user.displayName}`,
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please write your email before resetting password.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
        });
        return;
    }

    resetPass(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Check your email for the password reset link.",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-primary">Login</h2>
            <p className="text-base-content/70">Access your city dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="citizen@example.com"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••"
                className="input input-bordered w-full focus:input-primary"
                required
              />
              <label className="label">
                <a 
                    onClick={handleForgetPassword} 
                    className="label-text-alt link link-hover text-primary cursor-pointer"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-lg"
              >
                {loading ? <Loader/> : "Login"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full hover:bg-base-200"
          >
            <FcGoogle className="text-xl mr-2" /> Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="link link-primary font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;