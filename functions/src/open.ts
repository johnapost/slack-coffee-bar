import { Response } from "express";
import { WebClient } from "@slack/client";
import { firestore } from "firebase-admin";
import { Event } from ".";
import checkAdmin from "./checkAdmin";
import { token } from "./secret";

export default (db: firestore.Firestore, event: Event, res: Response) => async (
  open: Boolean
) => {
  const authorized = await checkAdmin(db, event);

  if (!authorized) {
    console.error("unauthorized");
  } else {
    console.log("authorized");

    // Post commands to DB queue

    // const web = new WebClient(token);
    // await web.chat.postMessage({
    //   channel: event.channel,
    //   text: "Opening Coffeebar. Let the drinks flow!"
    // });
  }

  res.status(200).send();
};
