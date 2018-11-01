import { WebClient } from "@slack/client";
import { firestore } from "firebase-admin";
import { Command } from "..";
import checkAdmin from "../utils/checkAdmin";
import { config } from "firebase-functions";

export default async (
  db: firestore.Firestore,
  { payload: { event, value } }: Command
) => {
  const authorized = await checkAdmin(db, event);

  if (authorized) {
    const web = new WebClient(config().slack.token);

    try {
      await db
        .collection("status")
        .doc("statusDoc")
        .set({ open: value }, { merge: true });

      if (value) {
        await web.chat.postMessage({
          channel: event.channel,
          text: `Opening Coffeebar. Let the drinks flow!`
        });
      } else {
        await web.chat.postMessage({
          channel: event.channel,
          text: `Closing Coffeebar. Ta ta for now!`
        });
      }
    } catch (error) {
      console.error("Error setting open status", error);
    }
  }
};
