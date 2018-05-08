import { db } from './firebase';

export const doCreateCampaigns = (id, title, description, current_amount, needed_amount, image) =>
  db.ref(`campaigns/${id}`).set({
    title,
    description,
    current_amount,
    needed_amount,
    image
  });

export const onceGetCampaigns = () =>
  db.ref('campaigns').once('value');
