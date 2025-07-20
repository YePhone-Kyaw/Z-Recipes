import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RecipeForm from './pages/RecipeForm'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path : '/',
        element : <Home />
      },
      {
        path : '/about',
        element : <About />
      },
      {
        path : '/contact',
        element : <Contact />
      },
      {
        path : '/recipes/create',
        element : <RecipeForm />
      },
      {
        path : '/recipes/edit/:id',
        element : <RecipeForm />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
