import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAO7sxHOAt1ex1KZ1538SOrR0mAbfpv4FY",
  authDomain: "nextjs-72f45.firebaseapp.com",
  projectId: "nextjs-72f45",
  storageBucket: "nextjs-72f45.appspot.com",
  messagingSenderId: "846397645097",
  appId: "1:846397645097:web:cc87d9e78137ca323d9738"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db};