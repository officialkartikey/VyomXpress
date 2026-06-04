import {
  ChatInputCommandInteraction,
} from "discord.js";

import {
  adminSessions,
} from "../sessions";

const execute = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {

  await interaction.deferReply({
    ephemeral: true,
  });

  adminSessions.delete(
    interaction.user.id
  );

  await interaction.editReply(
    "✅ Logged out successfully."
  );
};

export default {
  execute,
};