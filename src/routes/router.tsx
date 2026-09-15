import AuthLayout from "@/features/authentication";
import LoginPage from "@/features/authentication/pages/LoginPage";
import RegisterPage from "@/features/authentication/pages/RegisterPage";
import DashboardLayout from "@/features/dashboard";
import { createBrowserRouter } from "react-router";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./PrivateRoute";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Portfolio from "@/features/dashboard/pages/Portfolio";
import Coins from "@/features/dashboard/pages/Coins";

const router = createBrowserRouter([
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "coins",
        element: <Coins />,
      },
    ],
  },
]);

export default router;
