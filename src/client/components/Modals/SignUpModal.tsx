import { useState, useEffect } from 'react';
import React from 'react';

export default function SignUpModal(props: { loginChange: () => void }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleUserChange(e: React.FormEvent<HTMLInputElement>) {
    setUser(e.currentTarget.value);
  }

  function handleEmailChange(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }


  async function handleSignUp(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: password,
          email: email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setPassword('');
        setEmail('');
        setUser('');
        props.loginChange();
        (document.querySelector('#signUpModal') as HTMLDialogElement).close();
      } else {
        const data = await response.json();
        throw new Error(data);
      }
    } catch (err) {
      console.log('Failed to sign up');
    }
  }

  function handleCancel() {
    setPassword('');
    setEmail('');
    setUser('');
    (document.querySelector('#signUpModal') as HTMLDialogElement).close();
  }

  return (
    <dialog className="modal" id="signUpModal">
      <h1 className="text-center">Protract Sign Up</h1>
      <form
        className="flex flex-col border-0 border-purple-600"
        action="/signup"
        method="post"
      >
        <fieldset className="my-1 rounded-sm border border-gray-400 bg-white hover:border-gray-600 focus:border-red-500">
          <legend className="ml-2 bg-transparent px-1 text-xs">Username</legend>
          <input
            type="text"
            name="username"
            className="bg-white px-2 pb-2 focus:outline-none"
            placeholder=""
            onChange={(e) => {
              handleUserChange(e);
            }}
            value={user}
          ></input>
        </fieldset>
        <fieldset className="my-1 rounded-sm border border-gray-400 bg-white hover:border-gray-600 focus:border-red-600">
          <legend className="ml-2 bg-transparent px-1 text-xs">Email</legend>
          <input
            type="email"
            name="email"
            className="bg-white px-2 pb-2 focus:outline-none"
            placeholder=""
            onChange={(e) => {
              handleEmailChange(e);
            }}
            value={email}
          ></input>
        </fieldset>
        <fieldset className="my-1 rounded-sm border border-gray-400 bg-white hover:border-gray-600 focus:border-red-600">
          <legend className="ml-2 bg-transparent px-1 text-xs">Password</legend>
          <input
            type="password"
            name="password"
            className="bg-white px-2 pb-2 focus:outline-none"
            placeholder=""
            onChange={(e) => {
              handlePasswordChange(e);
            }}
            value={password}
          ></input>
        </fieldset>
        <div className="my-2 flex flex-grow justify-between border-0 border-blue-600">
          <button
            className="w-1/4 min-w-fit rounded border-0 border-red-600 bg-red-600 px-2 py-0 text-white"
            type="button"
            onClick={(e) => {
              handleSignUp(e);
            }}
          >
            Sign Up
          </button>
          <button
            className="w-1/4 min-w-fit rounded border-2 border-white bg-white p-2 text-red-600"
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
