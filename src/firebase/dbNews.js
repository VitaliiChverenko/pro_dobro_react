import { db } from './firebase';

export const onceGetNews = () =>
  db.ref('news').once('value');

export const doCreateNews = (id, params) =>
  db.ref(`news/${id}`).set({
    ...params
  });
