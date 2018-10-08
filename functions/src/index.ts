import { https, config } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import open from "./open";

initializeApp(config().firebase);
const db = firestore();
db.settings({ timestampsInSnapshots: true });

export type Event = {
  type: string;
  channel: string;
  user: string;
  text: string;
  ts: string;
  event_ts: string;
  channel_type: string;
};

export const events = https.onRequest(async ({ body }, res) => {
  console.log(body);

  const { event } = body;
  const setOpen = open(db, event, res);

  try {
    if (event.text === "open") return setOpen(true);
  } catch (err) {
    console.error(err);
    res.status(200).send();
  }
});
