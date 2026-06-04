import {
  ChatInputCommandInteraction,
} from "discord.js";

import db from "../../models";

const execute = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {

  try {

    const name =
      interaction.options.getString(
        "name",
        true
      );

    const description =
      interaction.options.getString(
        "description",
        true
      );

    const price =
      interaction.options.getNumber(
        "price",
        true
      );

    const service =
      await db.Service.create({
        name,
        description,
        price,
      });

    await interaction.reply({
      content:
        `✅ Service created: ${service.name}`,
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