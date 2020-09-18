import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
        console.log(error);
    }
  };
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
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
};
export default Auth;
