import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// 이렇게 한 이유는 임폴트를 할때마다 initializeApp하는건 비효율적이라서

// 초기화가 되었으면 초기화된 값을 가져오고, 아니라면 다시 초기화해서 가져오도록 설정
try {
  // 앱 이름이 제공되면 해당 이름에 해당하는 앱이 반환됩니다
  // 검색 중인 앱이 아직 초기화되지 않은 경우 '예외'가 발생합니다. (공홈 getApp설명)
  app = getApp('app');
} catch (e) {
  // 예외가 발생하면 이리로옴, 그러면 초기화가 진행됨
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;
