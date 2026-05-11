import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main>
      <div>Auth Layout</div>
      <Outlet />
    </main>
  )
}

export default AuthLayout;