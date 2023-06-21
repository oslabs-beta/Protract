import { useEffect, useState } from 'react';
import logo from '../assets/logo3.png'
import github from '../assets/github-light.png'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal';

export default function Navbar() {

  const [user, setUser] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState('Login');

function loginChange(){
  //think about case where user is logged in but signs up for another account of logs into another account dont want it to flip every time
  // setLoginState((prevloginState) => !prevloginState);
  const isLoggedIn = async () => {
    try{
      const response = await fetch('/loggedIn')
      const data = await response.json()
      console.log('useEffect log HERE:',data)
      setUser(data);
    } catch(err) {
      console.log('error in fetching');
    }
  }
  isLoggedIn()
  console.log('loginState was previously:',loginState);
  setLoginDisplay('Logout')
  setLoginState(true);
}
console.log('loginState currently:',loginState);

  useEffect(() => {
    const isLoggedIn = async () => {
      try{
        const response = await fetch('/loggedIn')
        const data = await response.json()
        console.log('useEffect log HERE:',data)
        if(data.length < 10){
          setUser(data);
          setLoginDisplay('Logout');
          setLoginState(true);
        }
        
      } catch(err) {
        console.log('error in fetching');
      }
    }
    isLoggedIn()
  },[])

  function logModal(){
    if(loginState === false){
      (document.querySelector("#loginModal") as HTMLDialogElement).showModal()
    } else {
      async () => {
        try {
            const response = await fetch('/logout', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              }
            });
      
            if (response) {
              const data = await response.json();
              console.log('LOGOUT data info: ',data) 
            } else {
              throw new Error('Logout user has failed');
            }
          } catch (error) {
            console.error(error);
          }
      };
    }
  }

  return (
    <nav className='flex h-auto justify-between items-center border-solid border-b border-gray-200 bg-red-800 text-white'>
      <div>
        <img className='h-auto w-48 ml-3' src={logo} alt="Homepage" />
      </div>
      <div className=' gap-10 grid-cols-20 '>
        <ul className='my-4 gap-4 flex'>
        <li>
            <p className='p-2 mx-1 float-right hover:text-gray-300'>{user}</p>
          </li>
          <li>
            <a className='p-2 mx-1 float-right hover:text-gray-300' href='/'>Tutorial</a>
          </li>
          <li >
            <a className='p-2 mx-1 float-right hover:text-gray-300' href='/'>Projects</a>
          </li>
          <li >
            <button className='p-2 mx-1 float-right hover:text-gray-300' 
            onClick={() => {logModal()}}
            >{loginDisplay}</button>
          </li>
          <li >
            <button 
            className='p-2 mx-1 mr-8 float-right text-red-800 rounded-md bg-white hover:bg-gray-200'
            // className='p-2 mx-1 mr-8 float-right text-red 700 rounded-md bg-white hover:bg-slate-200'
            onClick={() => (document.querySelector("#signUpModal") as HTMLDialogElement).showModal()}
            >Sign Up</button>
          </li>
        </ul>
      </div>
      {<SignUpModal loginChange={loginChange}/>}
      {<LoginModal loginChange={loginChange}/>}
      {/* <div className='group'> */}
      {/* <div className="float-right font-semibold border rounded-l p-2 hidden group-hover:block">Click on the <br />image to see  <br />our GitHub page.</div> */}
      {/* <span className='float-right mb-3 mr-3'><a  href='https://github.com/oslabs-beta/Protract'><img className = 'font-semibold h-12' src = {github} alt="" /></a></span> */}
      {/* </div> */}
    </nav>
  );
}
