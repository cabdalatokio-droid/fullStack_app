import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { Toaster } from 'react-hot-toast'


const router=createBrowserRouter([
 {
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/register",
      element:<RegisterPage/>
    },
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"dashboard",
      element:<DashboardPage/>
    }
  ]
 }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster/>
   <RouterProvider router={router}/>
  </StrictMode>,
)
