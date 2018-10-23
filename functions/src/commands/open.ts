import { WebClient } from "@slack/client";
import { firestore } from "firebase-admin";
import { Command } from "..";
import checkAdmin from "../utils/checkAdmin";
import { config } from "firebase-functions";

export default (
  db: firestore.Firestore,
  { payload: { event } }: Command
) => async (open: Boolean) => {
  const authorized = await checkAdmin(db, event);

  if (!authorized) {
    console.error("unauthorized");
  } else {
    console.log("authorized");

    const web = new WebClient(config().slack.token);
    await web.chat.postMessage({
      channel: event.channel,
      text: `Opening Coffeebar. Let the drinks flow! (${open})`
    });
  }
};
