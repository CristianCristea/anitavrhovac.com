import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
// const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { firebase, database as default };
