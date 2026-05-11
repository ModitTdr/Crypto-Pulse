import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <main>
      <div>DashboardLayout</div>
      <Outlet />
    </main>
  )
}

export default DashboardLayout;