import { Command } from "..";
import { firestore } from "firebase-admin";
import open from "../commands/open";
import admin from "../commands/admin";

export default async (db: firestore.Firestore, command: Command) => {
  console.log(`${JSON.stringify(command)} processing!`);

  switch (command.type) {
    case "SET_OPEN":
      await open(db, command);
    case "ADMIN_MENU":
      await admin(db, command);
  }
};
