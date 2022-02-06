import { initializeApp } from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCuCubs4iD9KDO-GQPcsYMdTJ-EGT2RRsU",
  authDomain: "mern-whatsapp-65636.firebaseapp.com",
  projectId: "mern-whatsapp-65636",
  storageBucket: "mern-whatsapp-65636.appspot.com",
  messagingSenderId: "491068272882",
  appId: "1:491068272882:web:cc6641615e0e47f9af606b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth();
const provider = new GoogleAuthProvider();
export {app,auth,provider}
