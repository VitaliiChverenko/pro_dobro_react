import { db, auth } from './firebase';

export const doCreateUser = (id, firstname, lastname, email, phone) =>
  db.ref(`users/${id}`).set({
    firstname,
    lastname,
    email,
    phone
  });

export const doChangeUser = (userInfo) => {
  if (auth.currentUser) {
    return db.ref(`users/${auth.currentUser.uid}`).set(userInfo);
  }
}
export const doGetUser = uid =>
  db.ref(`users/${uid}`).once('value')

export const onceGetUsers = () =>
  db.ref('users').once('value');
