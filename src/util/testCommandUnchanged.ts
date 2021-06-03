import { SlashCommand } from "../structures/SlashCommand";
import { ApplicationCommand } from "./types/command";

// false - Command has been changed
// true - command has not been changed.
export function testCommandUnchanged(command: SlashCommand, reference: ApplicationCommand): boolean{
  // ... Testing logic here

  return false; // if the logic cannot determine anything, always assume it has been changed, it will simply patch the command just in case.
}