import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
      const { target: { name, value } } = event;

      if(name === 'email') {
          setEmail(value);
      } else if(name === 'password') {
          setPassword(value);
      }
  };

//   persistence type

// 'local' : 브라우저를 닫더라도 사용자 정보는 기억될 것이다. 

// 'session' : 브라우저가 열려있는 동안에는 사용자 정보를 기억하는 것을 의미

// 'none' : 유저를 기억하지 않는다.


  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if(newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        )
      } else {
        //log in
        data = await authService.signInWithEmailAndPassword(
          email,
          password
        )
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleNewAccount = () => {
    setNewAccount(prev => !prev)
  }

  const onSocialLogin = async (event) => {
    const { target : { name } } = event;
    let provider;

    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name==='github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      {error}
      <span onClick={toggleNewAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialLogin} name='google'>Continue with Google</button>
        <button onClick={onSocialLogin} name='github'>Continue with Github</button>
      </div>
    </div>
  )
};
export default Auth;
