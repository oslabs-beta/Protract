import logo from '../assets/logo2.png'
import github from '../assets/github-light.png'

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center border-solid border-2 bg-white'>
      <div>
      <img className='h-auto w-48 m-3' src={logo} alt="Homepage" />
      </div>
      <div className=' gap-10 grid-cols-20 '>
        <ul className='my-4 gap-4 flex'>
          <li>
            <a className='p-2 mx-1 float-right hover:text-red-900' href='/'>Tutorial</a>
          </li>
          <li >
            <a className='p-2 mx-1 float-right hover:text-red-900' href='/'>Projects</a>
          </li>
          <li >
            <a className='p-2 mx-1 mr-8 float-right text-white rounded-md bg-red-700 hover:bg-red-600' href='/'>Sign Up / Login</a>
          </li>
        </ul>
      </div>
      {/* <div className='group'> */}
        {/* <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div> */}
        {/* <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span> */}
      {/* </div> */}
    </nav>
  );
}
