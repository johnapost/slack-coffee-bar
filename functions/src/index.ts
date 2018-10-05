import { https, config } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import open from "./open";

initializeApp(config().firebase);
const db = firestore();

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

  const event = <Event>body.event;
  const setOpen = open(db, event, res);

  if (event.text === "open") return setOpen(true);
});
