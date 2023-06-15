import logo from '../assets/logo.png'
import github from '../assets/github-light.png'

export default function Navbar() {
  return (
    <nav className='border-solid border-2 bg-red-400'>
      
<div className=' flex justify-end items-end gap-10 grid-cols-20 '>
      <ul className='my-4 flex gap-4'>
        <li>
        <a className = 'font-semibold border p-2 mx-3  rounded-lg float-right shadow-xl bg-cyan-500 hover:bg-cyan-600' href='https://example.com'>Tutorial</a>
        </li>
        <li >
          <a className = 'font-semibold border p-2 mx-3 rounded-lg float-right shadow-xl bg-cyan-500 hover:bg-cyan-600'href='/'>Projects</a>
        </li>
        <li >
          <a className = 'font-semibold border p-2 mr-8  rounded-lg shadow-xl float-right bg-cyan-500 hover:bg-cyan-600'href='/'>Sign Up / Login</a>
        </li>
      </ul>
      </div>
      
      <span className='outline-4'><img className = 'flex justify-center content-center h-20 border ml-16' src= {logo} alt=""/></span>
      <div className='group'>
      <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div>
      <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span>
      </div>
       

        {/* //original
      // <nav className='border-solid border-2 bg-red-400 '>
      // <div className = 'flex'>
      //   <img className = 'h-12' src= {logo} alt=""/>
      //   <img className = 'h-12 float-right' src = {github} alt="" />

      // </div>

      // <div className = ' border p-2 rounded-lg float-right mb-3'>
         
      //  <div className='dropdown relative'>
      //   <button className="link" >Projects</button>
      //   <div className='dropdown-menu absolute'>
      //     <a href='#'>New Project</a><br />
      //     <a href='#'>Load Project</a><br />
      //     <a href='#'>Save Project</a><br />
      //   </div>
      // </div>  
       
      // </div>

      // <div>
      //   <button>Signup/Login</button>
      // </div>  */}


{/* <nav className='border-solid border-2 bg-red-400'>
     <img className = 'h-12' src= {logo} alt=""/>
     <a href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a>

      <ul className='flex justify-around items-center'>
        <li >
        <a className = 'font-semibold border p-2 rounded-r-lg bg-cyan-500 hover:bg-cyan-600' href='https://example.com'>Tutorial</a>
        </li>
        <li>
          <a className = 'font-semibold border p-2 rounded-r-lg bg-cyan-500 hover:bg-cyan-600'href='/'>Projects</a>
        </li>
        <li>
          <a className = 'font-semibold border p-2 rounded-r-lg bg-cyan-500 hover:bg-cyan-600'href='/'>Sign Up / Login</a>
        </li>
      </ul>  */}
      

      
    </nav>
  );
}
