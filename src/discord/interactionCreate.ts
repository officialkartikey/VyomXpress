import {
  ChatInputCommandInteraction,
} from "discord.js";

import client from "./bot";

import createUser from "./commands/ppcreateuser";
import createService from "./commands/ppcreateservice";
import getUser from "./commands/ppgetuser";
import changePassword from "./commands/ppchangepassword";
import login from "./commands/pplogin";
import logout from "./commands/pplogout";

client.on(
  "interactionCreate",
  async (
    interaction
  ): Promise<void> => {

    if (
      !interaction.isChatInputCommand()
    ) {
      return;
    }

    try {

      switch (
        interaction.commandName
      ) {

        case "ppcreateuser":
          await createUser.execute(
            interaction
          );
          break;

        case "ppcreateservice":
          await createService.execute(
            interaction
          );
          break;

        case "ppgetuser":
          await getUser.execute(
            interaction
          );
          break;

        case "ppchangepassword":
          await changePassword.execute(
            interaction
          );
          break;

        case "pplogin":
          await login.execute(
            interaction
          );
          break;

        case "pplogout":
          await logout.execute(
            interaction
          );
          break;

        default:

          await interaction.reply({
            content:
              "Unknown command.",
            ephemeral: true,
          });
      }

    } catch (error) {

      console.error(
        `[Discord Command Error] ${interaction.commandName}`,
        error
      );

      if (
        interaction.replied ||
        interaction.deferred
      ) {

        await interaction.followUp({
          content:
            "❌ Something went wrong.",
          ephemeral: true,
        });

      } else {

        await interaction.reply({
          content:
            "❌ Something went wrong.",
          ephemeral: true,
        });
      }
    }
  }
);