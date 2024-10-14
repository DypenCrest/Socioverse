import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layoutPage/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/auth/AuthPage";
import { useAuthStore } from "./store/authStore";
import { auth } from "./firebase/firebase";
import ProfileEditPage from "./pages/ProfileEditPage";
import UsersListPage from "./pages/UsersListPage";

function App() {
  const authUser = useAuthStore((state) => state.isLoggedIn);
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: authUser ? <HomePage /> : <Navigate to="/auth" />,
        },
        {
          path: "auth",
          element: authUser ? <Navigate to="/" /> : <AuthPage />,
        },
        {
          path: "/:username",
          element: authUser ? <ProfilePage /> : <Navigate to="/auth" />,
        },
        {
          path: "/editprofile",
          element: authUser ? <ProfileEditPage /> : <Navigate to="/auth" />,
        },
        {
          path: "/users",
          element: authUser ? <UsersListPage /> : <Navigate to="/auth" />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
