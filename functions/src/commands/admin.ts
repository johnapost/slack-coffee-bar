import { firestore } from "firebase-admin";
import { Command } from "..";
import checkAdmin from "../utils/checkAdmin";
import { WebClient } from "@slack/client";
import { config } from "firebase-functions";

export default async (
  db: firestore.Firestore,
  { payload: { event, value } }: Command
) => {
  const authorized = await checkAdmin(db, event);

  if (authorized) {
    const web = new WebClient(config().slack.token);

    await web.chat.postMessage({
      channel: event.channel,
      callback_id: "adminMenu",
      fallback: "Use the Slack app to use the admin menu",
      text: "What do you want to do?",
      attachments: [
        {
          text: "Available admin commands:",
          actions: [
            {
              type: "button",
              text: "Open Coffeebar",
              name: "open",
              value: "true"
            },
            {
              type: "button",
              text: "Close Coffeebar",
              name: "open",
              value: "false"
            }
          ]
        }
      ]
    });
  }
};
