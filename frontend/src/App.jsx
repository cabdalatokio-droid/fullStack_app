import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/ui/Header'


function App() {
  
  return (
   <div>
    <Header/>
    <Outlet/>
   </div>
  )
}

export default App
