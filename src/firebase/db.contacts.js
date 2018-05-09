import { db } from './firebase';

export const doChangeContacts = (contacts) =>
  db.ref("contacts").set({...contacts});

export const onceGetContacts = () =>
  db.ref('contacts').once('value');