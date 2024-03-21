import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzjdxLvhDyf6QoRXezNOgT2Ngv5nv_faI",
  authDomain: "wisewallet-936df.firebaseapp.com",
  databaseURL: "https://wisewallet-936df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wisewallet-936df",
  storageBucket: "wisewallet-936df.appspot.com",
  messagingSenderId: "790531231270",
  appId: "1:790531231270:web:2fefa620fb2a0e8b4560e7",
  measurementId: "G-24ECY391EE"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase(firebaseApp);
  const auth = getAuth(firebaseApp);
  
  export { firebaseApp, auth,db };
