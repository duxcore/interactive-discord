import { SlashCommand } from "../structures/SlashCommand";
import { ApplicationCommand, ApplicationCommandOption } from "./types/command";

// false - Command has been changed
// true - command has not been changed.
export function testCommandUnchanged(command: SlashCommand, reference: ApplicationCommand): boolean {

  const referenceOpts: ApplicationCommandOption[] = (reference.options ?? []);
  const tests = [
    (command.name == reference.name),
    (command.description == reference.description),
    (command.defaultPermission == reference.default_permission),
    (!command.options.map((option, i) => !Object.keys(option).map(key => option[key] === referenceOpts[i]?.[key]).includes(false)).includes(false)),
    (command.options.length == referenceOpts.length),
  ]

  if (tests.includes(false)) return false;
  else return true;
}
