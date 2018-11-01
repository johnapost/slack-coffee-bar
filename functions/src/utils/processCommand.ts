import { Command } from "..";
import { firestore } from "firebase-admin";
import open from "../commands/open";

export default async (db: firestore.Firestore, command: Command) => {
  console.log(`${JSON.stringify(command)} processing!`);

  if (command.type === "SET_OPEN") {
    await open(db, command);
  }
};
