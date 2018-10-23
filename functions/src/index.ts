import {
  https,
  config,
  firestore as firestoreFunctions
} from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import processCommand from "./utils/processCommand";
import createCommand from "./utils/createCommand";

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

export type Command = {
  type: string;
  payload: {
    value: string | Object;
    event: Event;
  };
};

export const events = https.onRequest(async (req, res) => {
  console.log(req.method, req.body);
  const event = req.body.event as Event;

  // Check for possible command
  const command = createCommand(event);
  if (command) {
    // Post command to DB queue
    await db
      .collection("commandQueue")
      .doc(req.body.event_id)
      .set(command);
  }
  return res.sendStatus(200);
});

export const handleCommandQueue = firestoreFunctions
  .document("commandQueue/{id}")
  .onWrite(async (snap, context) => {
    // Firebase functions don't guarantee a single execution
    // We check that the command really exists and we can process it
    const commandDoc = await db
      .collection("commandQueue")
      .doc(context.params.id);
    const commandSnap = await commandDoc.get();
    if (commandSnap.exists) {
      const command = commandSnap.data() as Command;
      await commandDoc.delete();
      await processCommand(db, command);
    }
  });
