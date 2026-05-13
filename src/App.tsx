import { RouterProvider } from "react-router";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;