import { useUser } from '@/hooks/useUser'
import { Link } from 'react-router-dom'

const Header = () => {
  const{user,logOut}=useUser();
  return (
    <header className='w-full bg-gray-800 flex itmes-center justify-between text-white'>
      <h1>Logo</h1>
      <nav>
        <ul className=' flex space-x-4'>
               {user ? 
               <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
          <button onClick={()=>logOut()}>LogOut</button>
             </>
          :
          <>
          <li><Link to="register">Register</Link></li>
          <li><Link to="login">Login</Link></li>
           </>
           }
          
        </ul>
      </nav>
    </header>
  )
}

export default Header