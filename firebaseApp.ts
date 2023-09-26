import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENTER_ID,
  appId: process.env.NEXT_PUBLIC_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

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
