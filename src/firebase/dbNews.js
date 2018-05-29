import { db, storage } from './firebase';

export const onceGetNews = () =>
  db.ref('news').once('value');

export const doCreateNews = (id, params) =>
  db.ref(`news/${id}`).set({
    ...params
  });

export const doDeleteNews = (item, callback) => {
  db.ref(`news/${item.createdAt}`)
    .remove()
    .then(doDeleteNewsImg(item.image, callback))
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
  console.log(item)
}

export const doDeleteNewsImg = (image, callback) => {
  storage.ref().child(`images/${image}`)
    .delete()
    .then(callback)
    .catch(function(error) {
      console.log('error', error)
      callback()
    })
    
}