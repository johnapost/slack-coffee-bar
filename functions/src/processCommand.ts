import { Command } from ".";

export default (command: Command) => {
  console.log(`${JSON.stringify(command)} processed!`);
};
