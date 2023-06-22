import { useState, useEffect } from 'react';

export default function SignUpModal( props: {loginChange: () => void} ) {
    
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    function handleUserChange(e: React.FormEvent<HTMLInputElement>) {
        setUser(e.currentTarget.value);
    }

    function handleEmailChange(e: React.FormEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function handlePasswordChange(e: React.FormEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    // console.log('user input updating: ',user);
    // console.log('email input updating: ',email);
    // console.log('password updating: ',password);

    async function handleSignUp(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                    email: email
                }),

            })
            if (response.ok) {
                const data = await response.json();
                setPassword('');
                setEmail('');
                setUser('');
                console.log(data);
                props.loginChange();
                (document.querySelector("#signUpModal") as HTMLDialogElement).close()
            } else {
                const data = await response.json();
                throw new Error(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleCancel() {
        setPassword('');
        setEmail('');
        setUser('');
        (document.querySelector("#signUpModal") as HTMLDialogElement).close()
    }

    return (
        <dialog className="modal" id="signUpModal">
            <h1 className="text-center">Protract Sign Up</h1>
            <form className="flex flex-col border-0 border-purple-600" action="/signup" method="post">
                <fieldset className="border border-gray-400 rounded-sm my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Username</legend>
                    <input type="text" name="username" className="focus:outline-none px-2 pb-2 bg-white" placeholder="" onChange={(e) => { handleUserChange(e) }} value={user}></input>
                </fieldset>
                <fieldset className="border border-gray-400 rounded-sm my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Email</legend>
                    <input type="email" name="email" className="focus:outline-none px-2 pb-2 bg-white" placeholder="" onChange={(e) => { handleEmailChange(e) }} value={email} ></input>
                </fieldset>
                <fieldset className="border border-gray-400 rounded-sm my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Password</legend>
                    <input type="password" name="password" className="focus:outline-none px-2 pb-2 bg-white" placeholder="" onChange={(e) => { handlePasswordChange(e) }} value={password}></input>
                </fieldset>
                <div className="flex flex-grow justify-between border-0 border-blue-600 my-2">
                    <button className="text-white bg-red-800 border-0 border-red-800 w-1/4 min-w-fit px-2 py-0 rounded" type="button" onClick={(e) => { handleSignUp(e) }}>Sign Up</button>
                    <button className="text-red-800 bg-white border-2 border-white w-1/4 min-w-fit p-2 rounded" type="button" onClick={() => handleCancel()}>Cancel</button>
                </div>
            </form>
        </dialog>
    )
}
