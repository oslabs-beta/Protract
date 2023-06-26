import { useEffect, useState } from 'react';
import logo from '../assets/logo3.png';
import github from '../assets/github-light.png';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import React from 'react';

export default function Navbar(props: {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user, setUser } = props;

  const [loginState, setLoginState] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState('Login');
  const [signUpDisplay, setSignUpDisplay] = useState(true);

  function loginChange() {
    //think about case where user is logged in but signs up for another account of logs into another account dont want it to flip every time
    // setLoginState((prevloginState) => !prevloginState);
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        console.log('useEffect log HERE:', data);
        setUser(data);
      } catch (err) {
        console.log('error in fetching');
      }
    };
    isLoggedIn();
    console.log('loginState was previously:', loginState);
    setLoginDisplay('Logout');
    setSignUpDisplay(false);
    setLoginState(true);
  }
  // console.log('loginState currently:', loginState);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        // console.log('useEffect log HERE:', data)

        //NEED to fix this conditional statement because it is only checking if getting the long text about
        //no user session being found which is a bunch of letters
        if (data.length < 20) {
          setUser(data);
          setLoginDisplay('Logout');
          setSignUpDisplay(false);
          setLoginState(true);
        }
      } catch (err) {
        console.log('error in fetching');
      }
    };
    isLoggedIn();
  }, []);

  function logModal() {
    if (loginState === false) {
      (document.querySelector('#loginModal') as HTMLDialogElement).showModal();
    } else {
      console.log('logout button hit!');
      const logoutFunc = async () => {
        try {
          console.log('logout button hit!2');
          const response = await fetch('/logout', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response) {
            const data = await response.json();
            console.log('LOGOUT data info: ', data);
          } else {
            throw new Error('Logout user has failed');
          }
        } catch (error) {
          console.error(error);
        }
      };
      logoutFunc();
      setLoginDisplay('Login');
      setSignUpDisplay(true);
      setLoginState(false);
    }
  }

  return (
    <nav className="flex h-auto items-center justify-between border-b border-solid border-gray-200 bg-red-800 text-white">
      <div>
        <img className="ml-3 h-auto w-48" src={logo} alt="Homepage" />
      </div>
      <div className=" grid-cols-20 gap-10 ">
        <ul className="my-4 flex gap-4">
          <li>
            <a className="float-right mx-1 p-2 hover:text-gray-300" href="/">
              Tutorial
            </a>
          </li>
          {/* <li >
            <a className='p-2 mx-1 float-right hover:text-gray-300' href='/'>Projects</a>
          </li> */}
          <li>
            <button
              className="float-right mx-1 p-2 hover:text-gray-300"
              onClick={() => {
                logModal();
              }}
            >
              {loginDisplay}
            </button>
          </li>
          {signUpDisplay && (
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
          )}
          {loginState && (
            <li>
              <p className="float-right mx-1 mr-8 p-2 capitalize underline underline-offset-2">
                Welcome, {user}!
              </p>
            </li>
          )}
        </ul>
      </div>
      {<SignUpModal loginChange={loginChange} />}
      {<LoginModal loginChange={loginChange} />}
      {/* <div className='group'> */}
      {/* <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div> */}
      {/* <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span> */}
      {/* </div> */}
    </nav>
  );
}
