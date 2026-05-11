import AuthLayout from "@/features/authentication";
import LoginPage from "@/features/authentication/pages/LoginPage";
import RegisterPage from "@/features/authentication/pages/RegisterPage";
import DashboardLayout from "@/features/dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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
    path: "/",
    element: <DashboardLayout />,
  }
])

export default router;