import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser(); //react.js에 있는 user정보를 새로고침 해준다.
    }
  };
  // const getMyTweets = async () => {
  //   const tweets = await dbService
  //     .collection("datas")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //     console.log(tweets.docs.map(doc => doc.data()));
  // };

  // useEffect(() => {
  //   getMyTweets();
  // }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }} />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">Log Out</span>
    </div>
  );
};
export default Profile;
