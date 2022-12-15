// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6mpCx0XtuZZ6jv3cEU6RGcJru7AAb3Fo",
  authDomain: "flexmoney-716bf.firebaseapp.com",
  projectId: "flexmoney-716bf",
  storageBucket: "flexmoney-716bf.appspot.com",
  messagingSenderId: "515721594173",
  appId: "1:515721594173:web:36c607e25574b786d7b154"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
// We have not exported firestore directly to avoid the creation of any new collection by any component.
export const database = {
    users: firestore.collection('users')
}

export const storage = firebase.storage();