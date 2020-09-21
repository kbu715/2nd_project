import Tweet from "components/Tweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
    dbService.collection("datas").onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    //child()는 collection() 이랑 비슷
    //npm install uuid : uuid는 기본적으로 어떤 특별한 식별자를 랜덤으로 제공

    // 1. 먼저 파일에 대한 레퍼런스를 만든다.
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    //2. 그런다음 파일 데이터를 레퍼런스로 보낸다. putstring 사용 : putString(url, type)
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);

    // await dbService.collection("datas").add({
    //   text: tweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid, //uid: user id
    // });
    // setTweet("");
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //FileReader api를 사용해 file 이름을 읽는다.
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="img" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map(tweet => (
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
