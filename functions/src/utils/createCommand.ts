import { Event } from "..";

const commands = {
  open: {
    type: "SET_OPEN",
    payload: {
      value: true
    }
  },
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
