import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import RecipeForm from "../pages/RecipeForm";
import SignUpForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import Landing from "../pages/Landing";
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
          element: !user ? <Landing /> : <Navigate to={'/home'} />
        },
        {
          path: "/home",
          element: user ? <Home /> : <Navigate to={'/'} />,
        },
        {
          path: "/about",
          element: user ? <About /> : <Navigate to={'/'} />,
        },
        {
          path: "/favourites",
          element: user ? <Favourites /> : <Navigate to={'/'} />,
        },
        {
          path: "/profile",
          element: user ? <Profile /> : <Navigate to={'/'} />,
        },
        {
          path: "/recipes/create",
          element: user ? <RecipeForm /> : <Navigate to={'/'} />,
        },
        {
          path: "/recipes/edit/:id",
          element: user ? <RecipeForm /> : <Navigate to={'/'} />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={'/home'} />,
        },
        {
          path: "/login",
          element: !user ? <LoginForm /> : <Navigate to={'/home'} />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />

  )
}

export default Index;
