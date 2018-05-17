import { db } from './firebase';

export const doCreateCampaigns = (id, title, description, current_amount, needed_amount, image, createdBy) =>
  db.ref(`campaigns/${id}`).set({
    id,
    title,
    description,
    current_amount,
    needed_amount,
    image,
    createdBy
  });

export const onceGetCampaigns = () =>
  db.ref('campaigns').once('value');
