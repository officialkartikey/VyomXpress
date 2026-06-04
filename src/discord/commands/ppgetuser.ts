import {
  ChatInputCommandInteraction,
} from "discord.js";

import db from "../../models";

const execute = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {

  try {

    const username =
      interaction.options.getString(
        "username",
        true
      );

    const user =
      await db.User.findOne({
        where: { username },
      });

    if (!user) {

      await interaction.reply({
        content:
          "❌ User not found.",
        ephemeral: true,
      });

      return;
    }

    await interaction.reply({
      content:
        `👤 User Details\n\n` +
        `ID: ${user.id}\n` +
        `Username: ${user.username}\n` +
        `Email: ${user.email}`,
    });

  } catch (error) {

    console.error(error);

    await interaction.reply({
      content:
        "❌ Something went wrong.",
      ephemeral: true,
    });
  }
};

export default {
  execute,
};