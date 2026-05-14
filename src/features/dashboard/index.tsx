import Navbar from "@/components/organism/Navbar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <main>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </main>
  )
}

export default DashboardLayout;