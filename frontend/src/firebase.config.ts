import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPckNYj26fvgz2Q94gRGnMtA47R2-nEGQ',
  authDomain: 'careersconcordiaplatform.firebaseapp.com',
  projectId: 'careersconcordiaplatform',
  storageBucket: 'careersconcordiaplatform.appspot.com',
  messagingSenderId: '1016738938092',
  appId: '1:1016738938092:web:f703259b89309bfa3ff9c9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}