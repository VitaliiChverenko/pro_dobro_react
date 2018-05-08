import { db } from './firebase';

export const doCreateUser = (id, firstname, lastname, email) =>
  db.ref(`users/${id}`).set({
    firstname,
    lastname,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
