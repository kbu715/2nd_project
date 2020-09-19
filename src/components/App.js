import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //즉시 일어나서 바로 로그아웃 되버림. (firebase가 초기화되고 모든걸 로드할때까지 기다려줄 시간이 없다.)
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); 


  // 그래서 이렇게
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing....'}
      <footer>&copy;  {new Date().getFullYear()} BANGRUI</footer>
    </>
  );
}

export default App;
