import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; //firebase 데이터 베이스 사용 준비
import "firebase/storage";
// Your web app's Firebase configuration

// 리액트에서는 환경변수를 정의할 때 REACT_APP_ 을 반드시 앞에 써줘야한다.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
