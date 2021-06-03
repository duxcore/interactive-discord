import { SlashCommand } from "../structures/SlashCommand";
import { ApplicationCommand } from "./types/command";

// false - Command has been changed
// true - command has not been changed.
export function testCommandUnchanged(command: SlashCommand, reference: ApplicationCommand): boolean{
  if (command.name !== reference.name) return false
  if (command.description !== reference.description) return false
  if (command.options.length !== reference.options?.length) return false
  for (let i = 0; i < command.options.length; i++) {
    const option = command.options[i]
    const refOption = reference.options[i]
    if (option.name !== refOption.name) return false
    if (option.type !== refOption.type) return false
    if (option.description !== refOption.description) return false
    if (option.required !== refOption.required) return false
    if (option.choices?.length !== refOption.choices?.length) return false
    if (!option.choices || !refOption.choices) continue
    for (let i = 0; i < option.choices.length; i++) {
      const choice = option.choices[i]
      const refChoice = refOption.choices[i]
      if (choice.name !== refChoice.name) return false
      if (choice.value !== refChoice.value) return false
    }
  }

  return true
}
