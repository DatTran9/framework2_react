import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./routes/login";
import Register from "./routes/register";
import Home from "./routes/home";
import Cart from "./routes/cart";
import Admin from "./routes/admin";
import { AuthProvider } from "./auth/authContext";
import { ProtectedRoute } from "./components/protectedRoute";

function App() {
  const routes = createBrowserRouter([
    //Public Routes
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    //User routes
    {
      path: "/cart",
      element: (
        <ProtectedRoute role="user">
          <Cart />
        </ProtectedRoute>
      ),
    },

    //Admin routes
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <Admin />
        </ProtectedRoute>
      ),
    },

    //Unknow router
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </div>
  );
}

export default App;
