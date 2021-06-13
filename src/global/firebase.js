import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDylOeQ4yP6Ood7Dyo-Kh43IbhkZLTaIoQ',
  authDomain: 'vue-wave-ea020.firebaseapp.com',
  projectId: 'vue-wave-ea020',
  storageBucket: 'vue-wave-ea020.appspot.com',
  messagingSenderId: '8654169103',
  appId: '1:8654169103:web:93beb4f1ac0eec0b6cef7a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const usersCollection = db.collection('users');
export const songsCollection = db.collection('songs');
export const commentsCollection = db.collection('comments');
