import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyAKvsH-vzQr8BH6nN4wI4AcWbIDoNbBxB4",
  authDomain: "prodobro-react.firebaseapp.com",
  databaseURL: "https://prodobro-react.firebaseio.com",
  projectId: "prodobro-react",
  storageBucket: "prodobro-react.appspot.com",
  messagingSenderId: "114514007886"
};

const devConfig = {
  apiKey: "AIzaSyAcgJ9lC3i3R5gItMe2vMH7faN-P9sDIZM",
  authDomain: "pro-dobro-react.firebaseapp.com",
  databaseURL: "https://pro-dobro-react.firebaseio.com",
  projectId: "pro-dobro-react",
  storageBucket: "pro-dobro-react.appspot.com",
  messagingSenderId: "729664132823"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
