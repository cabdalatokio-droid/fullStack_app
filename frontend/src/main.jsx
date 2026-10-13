import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/DashboardPage'
import DashboardPage from './pages/DashboardPage'


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
   <RouterProvider router={router}/>
  </StrictMode>,
)
