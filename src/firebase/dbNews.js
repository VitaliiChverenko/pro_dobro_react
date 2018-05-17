import { db } from './firebase';

export const onceGetNews = () =>
  db.ref('news').once('value');

export const doCreateNews = (id, params) =>
  db.ref(`news/${id}`).set({
    ...params
  });

export const doDeleteNews = (id, callback) => {
  db.ref(`news/${id}`).remove()
  .then(callback)
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}