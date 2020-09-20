import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
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

  useEffect(() => {
    // getTweets();


    //이 방식이 forEach 방법보다 덜 re-render 하게 한다.
    //onsnapshot 은 기본적으로 데이터베이스에 무슨일이  있을 때, 알림을 받는다.
    dbService.collection("datas").onSnapshot((snapshot)=>{
      const tweetArray = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });

  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("datas").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, //uid: user id
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          plsaceholder="What's on your mind?"
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} /> //tweet을 만든사람과 user가 같으면 true
        ))}
      </div>
    </div>
  );
};
export default Home;
