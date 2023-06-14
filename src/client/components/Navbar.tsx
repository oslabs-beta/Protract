import logo from '../assets/logo.png'
import github from '../assets/github-light.png'

export default function Navbar() {
  return (
    <nav className='border-solid border-2 bg-red-400'>
      <div className = 'flex'>
        <img className = 'h-12' src= {logo} alt=""/>
        <img className = 'h-12' src = {github} alt="" />
      </div>

      <div className = ''>
        <button>New Project</button>
        <button>Load Project</button>
        <button>Save Project</button>
      </div>

      <div>
        <button>Signup/Login</button>
      </div>

      
    </nav>
  );
}
