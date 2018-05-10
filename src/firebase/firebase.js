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
  apiKey:
  authDomain: "prodobro-333b7.firebaseapp.com",
  databaseURL: "https://prodobro-333b7.firebaseio.com",
  projectId: "prodobro-333b7",
  storageBucket: "prodobro-333b7.appspot.com",
  messagingSenderId: "338658986177"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
export {
  db,
  auth,
};
