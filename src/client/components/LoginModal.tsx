import { useState, useEffect } from 'react';

export default function LoginModal( props: { loginChange: () => void}) {


    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (e: React.FormEvent<HTMLInputElement>) => {
        setUser(e.currentTarget.value);
    }
    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    // console.log('Login Modal Username: ',user);
    // console.log('Login Modal Pass: ',password);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        //add login fetch here
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user,
                    password: password
                }), 
            });
            if(response.ok){    
                const data = await response.json()
                setUser('');
                setPassword('');
                props.loginChange();
                (document.querySelector("#loginModal") as HTMLDialogElement).close();
            } else{
                const data = await response.json();
                throw new Error(`${data}`);
            }
        } catch (err) {
            console.log(err);
        }
    }


    function handleCancel() {
        setUser('');
        setPassword('');
        (document.querySelector("#loginModal") as HTMLDialogElement).close();
    }

    return (
        <dialog className="modal" id="loginModal">
            <h1 className="text-center">Protract Login</h1>
            <form id="loginForm" className="flex flex-col border-0 border-purple-600" action="/signup" method="post">
                <fieldset className="border border-gray-400 rounded-sm my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Username</legend>
                    <input type="text" name="username" className=" focus:outline-none px-2 pb-2 bg-white" placeholder="" onChange={(e) => handleUserChange(e)} value={user}></input>
                </fieldset>
                <fieldset className="border border-gray-400 rounded-sm my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Password</legend>
                    <input type="password" name="password" className="focus:outline-none px-2 pb-2 bg-white" onChange={(e) => handlePasswordChange(e)} value={password}></input>
                </fieldset>
                <div className="flex flex-grow justify-between border-0 border-blue-600 my-2">
                    <button className="text-white bg-red-800 border-0 border-red-800 w-1/4 min-w-fit px-2 py-0 rounded" type="button" onClick={(e) => handleLogin(e)}>Login</button>
                    <button className="text-red-800 bg-white border-2 border-white w-1/4 min-w-fit p-2 rounded" type="button" onClick={() => handleCancel()}>Cancel</button>
                </div>
            </form>
        </dialog>
    )
}