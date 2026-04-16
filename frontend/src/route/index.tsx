import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import RecipeForm from "../pages/RecipeForm";
import SignUpForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Favourites from "../pages/Favourites";
import Profile from "../pages/Profile";


function Index() {

  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={'/login'} />,
        },
        {
          path: "/about",
          element: user ? <About /> : <Navigate to={'/login'} />,
        },
        {
          path: "/favourites",
          element: user ? <Favourites /> : <Navigate to={'/login'} />,
        },
        {
          path: "/profile",
          element: user ? <Profile /> : <Navigate to={'/login'} />,
        },
        {
          path: "/recipes/create",
          element: user ? <RecipeForm /> : <Navigate to={'/login'} />,
        },
        {
          path: "/recipes/edit/:id",
          element: user ? <RecipeForm /> : <Navigate to={'/login'} />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={'/'} />,
        },
        {
          path: "/login",
          element: !user ? <LoginForm /> : <Navigate to={'/'} />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />

  )
}

export default Index;
