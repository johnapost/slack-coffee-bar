import { firestore } from "firebase-admin";
import { WebClient } from "@slack/client";
import { Event } from ".";
import { token } from "./secret";

type Member = {
  id: string;
  profile: {
    email: string;
  };
};

export default async (
  db: firestore.Firestore,
  event: Event
): Promise<boolean> => {
  // Use token to make http request to Slack
  const web = new WebClient(token);
  const { members } = (await web.users.list()) as any;

  // Identify email from the user
  const user = (members as Member[]).find(member => member.id === event.user);

  // Check db for admin email
  const admins = await db
    .collection("/admins")
    .where("email", "==", user.profile.email)
    .get();

  return !admins.empty;
};
