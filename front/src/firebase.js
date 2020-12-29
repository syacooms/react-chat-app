import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyC2QJ74unXDRz-mBWnZAzgqULfgBM__UHk',
  authDomain: 'react-chat-app-61e15.firebaseapp.com',
  projectId: 'react-chat-app-61e15',
  storageBucket: 'react-chat-app-61e15.appspot.com',
  messagingSenderId: '470433029159',
  appId: '1:470433029159:web:642d0d6adfc8e454188202',
  measurementId: 'G-YLW7LFH18K',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
