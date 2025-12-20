import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

import Home from "../Pages/Home/Home/Home";
import AllIssues from "../Pages/AllIssues/AllIssues";
import HowItWorks from "../Pages/Home/HowItWorks";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import IssueDetails from "../Pages/IssueDetails/IssueDetails";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

import PrivateRoute from "../Provider/PrivateRoute";
import AdminRoute from "../Provider/AdminRoute";

import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageStaff from "../Pages/Dashboard/Admin/ManageStaff";
import AdminAllIssues from "../Pages/Dashboard/Admin/AdminAllIssues";
import Payments from "../Pages/Dashboard/Admin/Payments";

import StaffDashboard from "../Pages/Dashboard/Staff/StaffDashboard";
import AssignedIssues from "../Pages/Dashboard/Staff/AssignedIssues";

import CitizenDashboard from "../Pages/Dashboard/Citizen/CitizenDashboard";
import MyIssues from "../Pages/Dashboard/Citizen/MyIssues";
import ReportIssue from "../Pages/Dashboard/Citizen/ReportIssue";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Profile from "../Pages/Dashboard/Shared/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-issues",
        element: <AllIssues />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "issues/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff />
          </AdminRoute>
        ),
      },
      {
        path: "all-issues",
        element: (
          <AdminRoute>
            <AdminAllIssues />
          </AdminRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <AdminRoute>
            <Payments />
          </AdminRoute>
        ),
      },
      {
        path: "staff-home",
        element: <StaffDashboard />,
      },
      {
        path: "assigned-issues",
        element: <AssignedIssues />,
      },
      {
        path: "citizen-home",
        element: <CitizenDashboard />,
      },
      {
        path: "my-issues",
        element: <MyIssues />,
      },
      {
        path: "report-issue",
        element: <ReportIssue />,
      },
    ],
  },
]);
