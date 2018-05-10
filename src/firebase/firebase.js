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
  apiKey: "AIzaSyCDabEcMJoECANFztMAFR1QHP5F2RtP734",
  authDomain: "my-project-1524491292303.firebaseapp.com",
  databaseURL: "https://my-project-1524491292303.firebaseio.com",
  projectId: "my-project-1524491292303",
  storageBucket: "my-project-1524491292303.appspot.com",
  messagingSenderId: "1071962609750"
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
