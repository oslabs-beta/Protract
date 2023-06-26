import React, { useEffect } from 'react';

export default function TestingComp() {
  const handleClick = async () => {
    try {
      const response = await fetch('/proj/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Rocket',
          password: '1234',
        }),
      });

      if (response) {
        const data = await response.json();
        console.log(data, 'and response received on the client side');
      } else {
        throw new Error('Signup user has failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Spiderman',
          password: '1234',
        }),
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Login user has failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Logout user has failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await fetch('/loggedIn');
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log('error in fetching');
      }
    };
    isLoggedIn();
  }, []);

  return (
    <>
      <button onClick={() => handleClick()}>New Project</button>
      <button>Save Project</button>
      <button>Load Project</button>
      <button onClick={() => handleSignUp()}>Sign Up</button>
      <button onClick={() => handleLogin()}>Log in</button>
      <button onClick={() => handleLogout()}>Log Out</button>
    </>
  );
}
