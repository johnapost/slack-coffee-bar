import { Response } from "express";
import { firestore } from "firebase-admin";
import { Event } from ".";

export default (db: firestore.Firestore, event: Event, res: Response) => async (
  open: Boolean
) => {
  try {
    const admins = await db.collection("/admins").get();

    let authorized = false;
    admins.forEach(admin => {
      if (admin.data().id === event.user) authorized = true;
    });

    if (!authorized) return;

    // https://api.slack.com/methods/chat.postMessage
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};
