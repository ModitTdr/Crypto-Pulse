import AuthLayout from "@/features/authentication";
import LoginPage from "@/features/authentication/pages/LoginPage";
import RegisterPage from "@/features/authentication/pages/RegisterPage";
import DashboardLayout from "@/features/dashboard";
import { createBrowserRouter } from "react-router";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    element:
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
    ]
  },
  {
    path: "/dashboard",
    element:
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>,
    children: [],
  }
])

export default router;