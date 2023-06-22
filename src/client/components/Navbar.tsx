import { useEffect, useState } from 'react';
import logo from '../assets/logo3.png';
import github from '../assets/github-light.png';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

export default function Navbar(props: {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user, setUser } = props;

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        console.log('useEffect log', data);
        setUser(data);
      } catch (err) {
        console.log('error in fetching');
      }
    };
    isLoggedIn();
  }, []);

  return (
    <nav className="flex h-auto items-center justify-between border-b border-solid border-gray-200 bg-red-800 text-white">
      <div>
        <img className="ml-3 h-auto w-48" src={logo} alt="Homepage" />
      </div>
      <div className=" grid-cols-20 gap-10 ">
        <ul className="my-4 flex gap-4">
          <li>
            <p className="float-right mx-1 p-2 hover:text-gray-300">{user}</p>
          </li>
          <li>
            <a className="float-right mx-1 p-2 hover:text-gray-300" href="/">
              Tutorial
            </a>
          </li>
          <li>
            <a className="float-right mx-1 p-2 hover:text-gray-300" href="/">
              Projects
            </a>
          </li>
          <li>
            <button
              className="float-right mx-1 p-2 hover:text-gray-300"
              onClick={() => {
                (
                  document.querySelector('#loginModal') as HTMLDialogElement
                ).showModal();
              }}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="float-right mx-1 mr-8 rounded-md bg-white p-2 text-red-800 hover:bg-gray-200"
              // className='p-2 mx-1 mr-8 float-right text-red 700 rounded-md bg-white hover:bg-slate-200'
              onClick={() =>
                (
                  document.querySelector('#signUpModal') as HTMLDialogElement
                ).showModal()
              }
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
      {<SignUpModal />}
      {<LoginModal />}
      {/* <div className='group'> */}
      {/* <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div> */}
      {/* <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span> */}
      {/* </div> */}
    </nav>
  );
}
