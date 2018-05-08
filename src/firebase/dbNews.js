import { db } from './firebase';

export const onceGetNews = () =>
  db.ref('news').once('value');
