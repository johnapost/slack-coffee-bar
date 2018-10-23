import { Command } from "..";
import { firestore } from "firebase-admin";
import open from "../commands/open";

export default async (db: firestore.Firestore, command: Command) => {
  if (command.type === "SET_OPEN") {
    open(db, command);
  }

  console.log(`${JSON.stringify(command)} processed!`);
};
