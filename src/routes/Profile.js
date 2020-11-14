import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("datas")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
      console.log(tweets.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return <button onClick={onLogOutClick}>LogOut</button>;
};
export default Profile;
