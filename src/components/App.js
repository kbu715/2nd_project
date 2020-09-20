import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //즉시 일어나서 바로 로그아웃 되버림. (firebase가 초기화되고 모든걸 로드할때까지 기다려줄 시간이 없다.)
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); 


  // 그래서 이렇게
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{ // onAuthStateChanged : 로그인/로그아웃 할때 일어남, 또 어플리케이션 초기화될때 발생
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing....'}
      <footer>&copy;  {new Date().getFullYear()} BANGRUI</footer>
    </>
  );
}

export default App;
