import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  //< 이 방법은 구식이다 >

  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection("datas").get();
  //   dbTweets.forEach((document) => {
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  // };

  const getTweets = () => {
    //이 방식이 forEach 방법보다 덜 re-render 하게 함으로써 더빠르게 실행되도록 한다.
    //onsnapshot 은 기본적으로 데이터베이스에 무슨일이 있을 때, 알림을 받는다.
    dbService.collection("datas").orderBy("createdAt", "desc").onSnapshot(  (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);

    });
  }

  useEffect(() => {
    getTweets();
  }, []);


  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          /> //tweet을 만든사람과 user가 같으면 true
        ))}
      </div>
    </div>
  );
};
export default Home;
