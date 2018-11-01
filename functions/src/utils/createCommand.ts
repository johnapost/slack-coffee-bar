import { Event } from "..";

const commands = {
  // Opens the admin menu
  admin: {
    type: "ADMIN_MENU"
  },
  // Sets cofeebar status to open
  open: {
    type: "SET_OPEN",
    payload: {
      value: true
    }
  },
  // Sets cofeebar status to closed
  close: {
    type: "SET_OPEN",
    payload: {
      value: false
    }
  }
};

export default (event: Event) => {
  const command = commands[event.text];
  if (command) {
    return {
      ...command,
      payload: {
        ...command.payload,
        event
      }
    };
  }
  return null;
};
