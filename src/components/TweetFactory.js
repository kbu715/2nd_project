import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";

const NweetFactory = ({ userObj }) => {

  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") { //첨부파일이 있는경우!!!
      //child()는 collection() 이랑 비슷
      //npm install uuid : uuid는 기본적으로 어떤 특별한 식별자를 랜덤으로 제공

      // 1. 먼저 파일에 대한 레퍼런스를 만든다.
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      //2. 그런다음 파일 데이터를 레퍼런스로 보낸다. putstring 사용 : putString(url, type)
      const response = await attachmentRef.putString(attachment, "data_url");

      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, //uid: user id
      attachmentUrl,
    };
    await dbService.collection("datas").add(tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //FileReader api를 사용해 file 이름을 읽는다.
    const reader = new FileReader(); //FileReader mdn 참고
    reader.onloadend = (finishedEvent) => {
      //Event Listener이다. 파일로딩이 끝나면 finishedEvent를 갖게 된다.
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 그다음에 readAsDataURL 을 실행한다.
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="thumbnail" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;