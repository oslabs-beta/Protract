import { useEffect, useState } from 'react';
import logo from '../assets/logo3.png';
import LoginModal from './Modals/LoginModal';
import SignUpModal from './Modals/SignUpModal';
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
    //Case for if user is logged in but signs up for another account or logs directly into another account
    //setLoginState((prevloginState) => !prevloginState);
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.log('login error');
      }
    };
    isLoggedIn();
    setLoginDisplay('Logout');
    setSignUpDisplay(false);
    setLoginState(true);
  }

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        //no user session being found which gives a long character string
        if (data.length < 20) {
          setUser(data);
          setLoginDisplay('Logout');
          setSignUpDisplay(false);
          setLoginState(true);
        }
      } catch (err) {
        console.log('login error');
      }
    };
    isLoggedIn();
  }, []);

  function logModal() {
    if (loginState === false) {
      (document.querySelector('#loginModal') as HTMLDialogElement).showModal();
    } else {
      const logoutFunc = async () => {
        try {
          const response = await fetch('/logout', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response) {
            const data = await response.json();
          } else {
            throw new Error('Logout user has failed');
          }
        } catch (error) {
          console.error('Error logging out');
        }
      };
      logoutFunc();
      setLoginDisplay('Login');
      setSignUpDisplay(true);
      setLoginState(false);
    }
  }

  return (
    <nav className="flex h-auto items-center justify-between border-b border-solid border-gray-200 bg-red-600 text-white">
      <div>
        <img className="ml-3 h-auto w-48" src={logo} alt="Homepage" />
      </div>
      <div className=" grid-cols-20 gap-10 ">
        <ul className="my-4 flex gap-4">
          <li>
            <a className="float-right mx-1 p-2 hover:text-gray-300" target="_blank" href="https://github.com/oslabs-beta/Protract/tree/dev#getting-started">
              Tutorial
            </a>
          </li>
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
                className="float-right mx-1 mr-8 rounded-md bg-white p-2 text-red-600 hover:bg-gray-300"
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
    </nav>
  );
}
