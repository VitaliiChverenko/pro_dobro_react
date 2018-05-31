import { db, storage } from './firebase';

export const onceGetNews = () =>
  db.ref('news').once('value');

export const doCreateNews = params => 
  db.ref('news').push().set({
    ...params
  });
  
export const doEditNews = (key, params) => 
  db.ref(`news/${key}`).update({...params});

export const doDeleteNews = (key, item) => 
  db.ref(`news/${key}`)
    .remove()
    .then(doDeleteNewsImg(item.image))

export const doDeleteNewsImg = (image) => 
  storage.ref().child(`images/${image}`).delete()
