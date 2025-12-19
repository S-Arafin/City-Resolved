import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { FaBars, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import useRole from "../../Hooks/useRole";
import Logo from "./Logo";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [role] = useRole();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "luxury");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "luxury" ? "retro" : "luxury");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getDashboardRoute = () => {
    if (role === 'admin') return "/dashboard/admin-home";
    if (role === 'staff') return "/dashboard/staff-home";
    return "/dashboard/citizen-home";
  };

  const links = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-issues" 
          className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
        >
          All Issues
        </NavLink>
      </li>
      
      <li>
        <NavLink 
          to="/how-it-works" 
          className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
        >
          How It Works
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink 
            to={getDashboardRoute()}
            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className={`sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-200`}>
      <div className="navbar container mx-auto">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars className="h-5 w-5" />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-extrabold text-primary tracking-tighter hover:bg-transparent px-0">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium text-base">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "retro"} />
            <FaSun className="swap-on fill-current w-5 h-5 text-warning" />
            <FaMoon className="swap-off fill-current w-5 h-5 text-info" />
          </label>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Image Direct Link */}
              <Link 
                to="/dashboard/profile" 
                className="btn btn-ghost btn-circle avatar border border-primary/20 ring ring-primary ring-offset-base-100 ring-offset-2"
                title="View Profile"
              >
                <div className="w-10 rounded-full">
                  <img 
                    alt="User Profile" 
                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>

              <button 
                onClick={handleLogout} 
                className="btn btn-error btn-sm btn-circle text-white tooltip tooltip-bottom"
                data-tip="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Link to="/auth/login" className="btn btn-ghost btn-sm font-bold">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary btn-sm shadow-lg shadow-primary/30">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;