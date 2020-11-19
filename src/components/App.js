import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //어플리케이션이 시작되면 바로 로그아웃 되버림. (firebase가 초기화되고 모든걸 로드할때까지 기다려줄 시간이 없다.)
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);  //authService.currentUser이 처음에 null 값이다

  // 그래서 이렇게
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged : //사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다
      //유저 상태의 변화가 있을 때 알아차린다. 무슨 뜻이냐, 유저가 로그아웃 할 때, 로그인할때, 계정을 생성할 때도, firebase가 초기화될 때도 발생
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //이 function은 리턴값으로 우리한테 진짜 user.updateProfile을 준다.
        });
      } else {
        setUserObj(null);
        // setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // user를 새로고침하는 역할
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
      <footer className="footer">&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
