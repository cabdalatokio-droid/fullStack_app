import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full bg-gray-800 flex itmes-center justify-between text-white'>
      <h1>Logo</h1>
      <nav>
        <ul className=' flex space-x-4'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="register">Register</Link></li>
          <li><Link to="login">Login</Link></li>
          
        </ul>
      </nav>
    </header>
  )
}

export default Header