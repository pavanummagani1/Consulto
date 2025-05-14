// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAdquqkSraxBMC5N5ODZfqAXMQ8VMhGkmw",
  authDomain: "consulto-c69ee.firebaseapp.com",
  projectId: "consulto-c69ee",
  storageBucket: "consulto-c69ee.appspot.com",
  messagingSenderId: "633646113892",
  appId: "1:633646113892:web:f7a44f3416f6cec9db2b71"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
