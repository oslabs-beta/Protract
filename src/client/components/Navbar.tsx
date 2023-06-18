import logo from '../assets/logo2.png'
import github from '../assets/github-light.png'
import { useState } from 'react'
// import LoginModal from './LoginModal'


export default function Navbar() {

  const [modalOpen, setModalOpen] = useState(false);
  
  function openModal(){
    setModalOpen(true);
  }

  return (
    <nav className='flex justify-between items-center border-solid border-2 bg-white'>
      <div>
        <img className='h-auto w-48 ml-3' src={logo} alt="Homepage" />
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
            <button data-open-modal className='p-2 mx-1 mr-8 float-right text-white rounded-md bg-red-700 hover:bg-red-600'
              onClick={() => document.querySelector("[data-modal]").showModal()}
            >Sign Up / Login</button>
          </li>
        </ul>
      </div>
      <dialog data-modal className="modal">
            <h1>Protract Login</h1>
            <form className="">
                <div>
                    <input className="" placeholder="Username"></input>
                </div>
                <div>
                    <input className="" placeholder="Password"></input>
                </div>
            </form>
            <button data-close-modal onClick={() => document.querySelector("[data-modal]").close()}>Close Modal</button>
        </dialog>
      {/* {modalOpen && <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>} */}
      {/* <div className='group'> */}
      {/* <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div> */}
      {/* <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span> */}
      {/* </div> */}
    </nav>
  );
}
