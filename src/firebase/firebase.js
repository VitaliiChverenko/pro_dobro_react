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
  apiKey: "AIzaSyBKM6zN8cz2VMgEiNnVCKuyWlwvXB2jdxY",
  authDomain: "prodobro-react-maryan.firebaseapp.com",
  databaseURL: "https://prodobro-react-maryan.firebaseio.com",
  projectId: "prodobro-react-maryan",
  storageBucket: "prodobro-react-maryan.appspot.com",
  messagingSenderId: "570301909299"
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
